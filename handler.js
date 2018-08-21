'use strict';

// var Twitter = require('twitter');
const { parse } = require('querystring');

module.exports = (ctx, req, res) => {
    const { headers, method, url } = req;
    let body = [];

    req.on('error', (err) => {
        console.error('Error: %s', err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        let data = parse(Buffer.concat(body).toString());
        console.log('Headers: %s', JSON.stringify(headers));
        console.log('Query: %s', JSON.stringify(ctx.query));
        console.log('Body: %s', JSON.stringify(data));

        let sms = data['Body'];
        let phone = data['From'];

        if (isBlank(sms) || isBlank(phone)) {
            res.writeHead(400, {'Content-Type': 'application/xml'});
            res.end('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
            return;
        }

        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Tweet posted correctly: ${sms}</Message></Response>`);
        return;
    });
};

function isBlank(str) {
    return str === null || str === undefined || str.length === 0;
}
