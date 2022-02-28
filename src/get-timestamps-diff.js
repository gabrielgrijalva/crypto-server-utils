const moment = require('moment');
module.exports = function GetTimestampsDiff(timestamps) {
  const timestamp1 = moment.utc(timestamps[0]);
  const timestamp2 = moment.utc(timestamps[1]);
  return moment.utc(timestamp1).diff(timestamp2, 'seconds').toString();
}
