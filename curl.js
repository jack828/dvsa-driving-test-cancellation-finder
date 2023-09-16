const cookieStr = ''

const domain = 'driverpracticaltest.dvsa.gov.uk'

const fetch = require('node-fetch')
const makeFetchCookie = require('fetch-cookie')
const { toughCookie } = makeFetchCookie
const jar = new toughCookie.CookieJar()

const cookies = toughCookie.Cookie.parse(cookieStr)
console.log(cookies)
// cookies.
jar.setCookieSync(cookies, domain)
const fetchc = makeFetchCookie(fetch)
;(async () => {
  const res = await fetchc(`https://${domain}/login`, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      referer: 'https://www.gov.uk/',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
    }
  })

  res
  console.log(await res.text())
})()
