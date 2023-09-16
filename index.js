const puppeteer = require('puppeteer')
const { format } = require('date-fns')

const WIRE_PUSHER_ID = process.env.WIRE_PUSHER_ID
const LICENCE_NUMBER = process.env.LICENCE_NUMBER
const TEST_REF_NUMBER = process.env.TEST_REF_NUMBER

const getDate = (id) => new Date(Number(id.substring(id.indexOf('-') + 1)))

;(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  try {
    const page = await browser.newPage()
    await page.goto('https://www.gov.uk/change-driving-test')

    await page.waitForSelector('.govuk-button--start')
    const startButton = await page.$('.govuk-button--start')
    await startButton.click()

    await page.waitForSelector('#driving-licence-number')
    const licenceField = await page.$('#driving-licence-number')
    await licenceField.type(LICENCE_NUMBER)
    const testRefField = await page.$('#application-reference-number')
    await testRefField.type(TEST_REF_NUMBER)

    const loginButton = await page.$('#booking-login')
    await loginButton.click()

    await page.waitForSelector('#date-time-change')
    const changeDateButton = await page.$('#date-time-change')
    await changeDateButton.click()

    const earliestDateRadioButton = await page.$('#test-choice-earliest')
    await earliestDateRadioButton.click()

    const continueButton = await page.$('#driving-licence-submit')
    await continueButton.click()

    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    const $slots = await page.$$('.SlotPicker-slots:not(:checked)')
    const $currentSlot = await page.$$('.SlotPicker-slots:is(:checked)')
    const currentSlot = getDate($currentSlot.id)
    const availableSlots = $slots.map(($slot) => getDate($slot.id))

    const earlierSlots = availableSlots.filter((slot) => slot < currentSlot)

    const msg = `Earlier slots available - ${earlierSlots
      .map((slot) => format(slot, "EEE do MMM '@' p"))
      .join(', ')}`
    await fetch(
      `https://wirepusher.com/send?id=${WIRE_PUSHER_ID}&title=DVSA Test&message=${msg}"`
    )
    await browser.close()
  } catch (error) {
    await browser.close()
  }
})()
