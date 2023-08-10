// 区分开发环境和生产环境
let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.com:5000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

export { BASE_URL }
export const TIME_OUT = 5000
