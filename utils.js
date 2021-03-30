module.exports = {
  setIntervalImmediately: function(func, interval) {
    func();
    return setInterval(func, interval);
  }
}