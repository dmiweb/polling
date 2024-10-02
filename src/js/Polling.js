import handlerLongText from "./handlerLongText";
import converterTimestamp from "./converterTimestamp";
import { switchMap, interval, map, catchError, EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export default class Polling {
  constructor() {
    this.url = 'https://polling-backend-lac.vercel.app/messages/unread';
  }

  static markupMessage(id, email, title, date) {
    return `
      <div id="${id}" class="message">
        <div class="message-email">${email}</div>
        <div class="message-title">${title}</div>
        <div class="message-date">${date}</div>
      </div>
    `;
  }

  renderMessage() {
    const messagesContainer = document.querySelector('.incoming-messages');
    const stream$ = this.requestMessage();

    stream$.subscribe(({ response }) => {
      const { messages } = response;

      messages.forEach(message => {
        const id = message.id;
        const email = message.from;
        const title = handlerLongText(message.subject);
        const date = converterTimestamp(message.received);

        messagesContainer.insertAdjacentHTML("afterBegin", Polling.markupMessage(id, email, title, date));
      });
    })
  }

  requestMessage() {
    const stream$ = interval(3000)
      .pipe(
        switchMap(() => {
          return ajax(this.url)
            .pipe(
              map(response => response),
              catchError(() => EMPTY)
            )
        })
      );

    return stream$;
  }

  init() {
    this.renderMessage();
  }
}