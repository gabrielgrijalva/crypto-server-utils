const moment = require('moment');
module.exports = function CheckMaintenance(maintenance) {
  // Parse maintenance information
  const timestamp = moment.utc();
  const maintenanceInfo = maintenance.split(',');
  const maintenanceDate = maintenanceInfo[0].split(' ')[0].split('-');
  const maintenanceTime = maintenanceInfo[0].split(' ')[1].split(':')
  const maintenanceSubtract = maintenanceInfo[1].split(':');
  const maintenanceAddition = maintenanceInfo[2].split(':');
  // Store and structure maintenance information
  const maintYear = maintenanceDate[0] === 'XXXX' ? timestamp.year() : +maintenanceDate[0];
  const maintMonth = maintenanceDate[1] === 'XX' ? timestamp.month() : +maintenanceDate[1] - 1;
  const maintDay = maintenanceDate[2] === 'XX' ? timestamp.date() : +maintenanceDate[2];
  const maintHour = +maintenanceTime[0];
  const maintMinute = +maintenanceTime[1];
  const maintSecond = +maintenanceTime[2];
  const maintSubHour = +maintenanceSubtract[0];
  const maintSubMinute = +maintenanceSubtract[1];
  const maintSubSecond = +maintenanceSubtract[2];
  const maintAddHour = +maintenanceAddition[0];
  const maintAddMinute = +maintenanceAddition[1];
  const maintAddSecond = +maintenanceAddition[2];
  // Create moment objects
  const maintenanceMoment = moment.utc().year(maintYear).month(maintMonth).date(maintDay)
    .hour(maintHour).minute(maintMinute).second(maintSecond).millisecond(0);
  const maintenanceStart = maintenanceMoment.clone().subtract(maintSubHour, 'hours')
    .subtract(maintSubMinute, 'minutes').subtract(maintSubSecond, 'seconds');
  const maintenanceFinish = maintenanceMoment.clone().add(maintAddHour, 'hours')
    .add(maintAddMinute, 'minutes').add(maintAddSecond, 'seconds');
  // Check for maintenance
  return timestamp.unix() >= maintenanceStart.unix()
    && timestamp.unix() <= maintenanceFinish.unix() ? 'true' : 'false';
}
