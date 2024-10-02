const converterTimestamp = (timestamp) => {
  const receivedDate = new Date(timestamp);
  const date = receivedDate.toLocaleDateString();
  const time = receivedDate.toLocaleTimeString();
  const currentDate = time.slice(0, 5) + " " + date;

  return currentDate;
};

export default converterTimestamp;
