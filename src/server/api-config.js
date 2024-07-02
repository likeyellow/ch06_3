let backendHost

const hostname = window && window.location && window.location.hostname

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080'
} else {
  backendHost = 'https://api.<나의 도메인>'
}

export const API_BASE_URL = `${backendHost}`
