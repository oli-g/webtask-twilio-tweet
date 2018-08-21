# webtask-twilio-tweet

Post a new tweet by sending an SMS to a Twilio phone number, using https://webtask.io/ from Auth0 to handle webhooks.

## Introduction

[Webtask.io](https://webtask.io) from [Auth0](https://auth0.com) allows you to expose HTTP endpoints without worrying about where to host your code. Webtasks are well suited to run custom code on webhook events from [Twilio](https://www.twilio.com/), whenever a message is received by a phone number.

## Requirements

* Node.js
* Serverless
* Twilio account
* Twitter account

## Usage

1. Clone this repository
2. Setup a Twilio account with a phone number that supports receiving and sending SMS messages
3. Setup a Twitter account
4. Install `serverless` with `npm install -g serverless`
4. Deploy to [Webtask.io](https://webtask.io):
    * Install dependencies with `cd webtask-twilio-tweet && npm install`
    * Set up Webtask credentials with `sls config credentials --provider webtasks`
    * Set up Twitter credentials with `cp secrets.yml.example secrets.yml`, providing your own credentials
    * Deploy function with `sls deploy`
5. Update incoming SMS webhook URL on Twilio with the *webtask* endpoint URL returned by previous `sls deploy` command

## Resources

* https://webtask.io/docs/101
* https://auth0.com/blog/serverless-framework-and-auth0-webtasks-hop-on-the-bullet-train/
* https://serverless.com/framework/docs/providers/webtasks/
* https://serverless.com/blog/serverless-webtasks/
* https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-
* https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python
* https://support.twilio.com/hc/en-us/articles/223134127-Receive-SMS-and-MMS-Messages-without-Responding
* https://support.twilio.com/hc/en-us/articles/223136047-Configuring-Phone-Numbers-to-Receive-SMS-Messages
* https://www.npmjs.com/package/twitter
