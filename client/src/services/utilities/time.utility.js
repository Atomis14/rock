const formatTime = (rawTime) => {
  time = time / 1000;
  const hours = ('0' + Math.floor(time / (60 * 60))).slice(-2);
  const minutes = ('0' + Math.floor(time / 60 - hours * 60)).slice(-2);
  const seconds = ('0' + Math.floor(time - minutes * 60)).slice(-2);
  return {
    hours,
    minutes,
    seconds
  };
};

const formatDate = (rawDate) => {

};

export default {
  formatTime,
  formatDate
};