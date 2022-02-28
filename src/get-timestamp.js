const moment = require('moment');
module.exports = function GetTimestamp() {
  return moment.utc().format('YYYY-MM-DD HH:mm:ss');
}
