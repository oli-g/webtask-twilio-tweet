'use strict';

const { parse } = require('querystring');

var Twitter = require('twitter');

module.exports = (ctx, req, res) => {
    const { headers, method } = req;
    let body = [];

    req.on('error', (err) => {
        console.error('Error: %s', err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        let data = parse(Buffer.concat(body).toString());
        let content = data['Body'];
        let phone = data['From'];
        console.log('Headers: %s', JSON.stringify(headers));
        console.log('Body: %s', JSON.stringify(data));
        console.log('Query: %s', JSON.stringify(ctx.query));

        if (isBlank(content) || isBlank(phone)) {
            res.writeHead(400, {'Content-Type': 'application/xml'});
            res.end('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
            return;
        }

        var client = new Twitter({
            consumer_key: ctx.secrets.twitter_consumer_key,
            consumer_secret: ctx.secrets.twitter_consumer_secret,
            access_token_key: ctx.secrets.twitter_access_token_key,
            access_token_secret: ctx.secrets.twitter_access_token_secret
        });
        client.post('statuses/update', {status: content}, (err, tweet, response) => {
            if (err) {
                console.error('Error: %s', err);
                res.writeHead(500, {'Content-Type': 'application/xml'});
                res.end('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
                return;
            }

            let link = `https://twitter.com/${tweet['user']['screen_name']}/status/${tweet['id_str']}`
            console.log('Tweet: %s', JSON.stringify(tweet));
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.end(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Tweet posted correctly: ${link}</Message></Response>`);
            return;
        });
    });
};

function isBlank(str) {
    return str === null || str === undefined || str.length === 0;
}
