# dvsa-driving-test-cancellation-finder
Find cancellation slots for UK (excl. NI) DVSA driving tests

## Setup

1. Dig out the Raspberry Pi from the cupboard now that you've finally found a use for it (congratulations!)
2. Setup Ubuntu Server or whatever you fancy. As long as it's got Node 18! Or, you can use docker. Whatevs.
3. Clone the repository
4. `docker build -t jack828/dvsa-driving-test-cancellation-finder:latest .`
5. Setup a cronjob to run + configure the tool:

```
$ sudo vi /etc/crontab
```

You'll need to provide three important bits of information:

NTFY_TOPIC - For push notifications, set this <https://ntfy.sh>
LICENCE_NUMBER - Your driving license number
TEST_REF_NUMBER - Your test booking reference number

Example crontab entry for once per hour checking between 6:00AM - 11:40PM (the times the service is online):

```
// TODO
```

## Author

Jack Burgess <https://jackburgess.dev>

## License

MIT

## Disclaimer

DVSA is an entity operated by the UK Government and it does not endorse or sanction the use of this tool to query for test slots. Abuse may get your IP blocked and you'll have to go to London and apologise to [_insert whoever is running the country_] and that'll be well embarrassing for you. It's not my fault if anything happens to you as a result of this tool.
