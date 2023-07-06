import Request from '../../request/index.js'

const EventReport = (key, value) => {
  Request.Post('event-report', { key, value }, { hideLoading: true, originalResponse: true }).catch(e => {
    console.log('EventReportFailed:', e.message)
  })
}
export default EventReport
