// CORS Domain
const corsDomain = 'http://localhost:5173'; 

// Define the base API URL.
const baseUrl = 'http://localhost:9093';

// Define individual API endpoints.
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const logoutUrl = `${baseUrl}/logout`;

// const setDeviceStatusUrl = `${baseUrl}/device/status`;
// const setDeviceTagsUrl = `${baseUrl}/device/tags`;
// const deviceStatusUrl = `${baseUrl}/report/statusCollect`;
// const changeDeviceStatusUrl = `${baseUrl}/device/status`;
// const alarmLogUrl = `${baseUrl}/alarm/log`;
// const getStatisticsUrl = `${baseUrl}/report/statistic`;
// const getAlarmTrendUrl = `${baseUrl}/report/trend`
// const getTop10AlarmUrl = `${baseUrl}/report/top10Alarm`
// const getLast24HourMessagesUrl = `${baseUrl}/report/24HourMessages`
// const getQuotaNumUrl = `${baseUrl}/report/quotaNumber`

// Export the URLs for use in other parts of your Vue project
export {
  baseUrl,
  loginUrl,
  signupUrl,
  logoutUrl,
  // deviceUrl,
  // deviceStatusUrl,
  // changeDeviceStatusUrl,
  // corsDomain,
  // quotaUrl,
  // alarmLogUrl,
  // alarmUrl,
  // setDeviceStatusUrl,
  // setDeviceTagsUrl,
  // getStatisticsUrl,
  // getAlarmTrendUrl,
  // getTop10AlarmUrl,
  // getLast24HourMessagesUrl,
  // getQuotaNumUrl
};