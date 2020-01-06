/**
 * Created by Stas on 12/25/2019.
 */
const https = require('https');
const calcAmount = require('../calculation/amountPerLabel');
const constants = require('../utils/constants');

module.exports = (stream, usersInfo) => {
    return new Promise((resolve,reject) => {
        https.get(constants.METADATA_URL, (res) => {

            let body= '';

            res.on('data', function (chunk) {
                body = body + chunk;
            });

            res.on('end',function(){
                const tracks = JSON.parse(body);
                let calc = calcAmount(tracks, stream, usersInfo);
                resolve(calc)
            });

        })
    });
};