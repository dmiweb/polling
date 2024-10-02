const handlerLongText = (text) => {
  if (text.length > 15) {
    return text.slice(0, 15) + "...";
  }

  return text;
};

export default handlerLongText;
