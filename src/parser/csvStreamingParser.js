/**
 * Created by Stas on 12/21/2019.
 */
const csv = require('csv-parser');
const fs = require('fs');
var StreamInfo = require('../entity/StreamInfo');
const filePath = './data/streaming.csv';

module.exports = () => {

    let stream = {};
    let userStreams = {};
    let trackStream = {};

    return new Promise((resolve,reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                mapStreamPerUser(row, userStreams);
                mapStreamPerTrackId(row, trackStream);
            })
            .on('end', () => {
                stream['userStreams'] = userStreams;
                stream['trackStream'] = trackStream;
                resolve(stream);
            });
    });

};

const mapStreamPerTrackId = (row, trackStream) => {
    let streams = [];
    const trackId = row['track id'];
    if (trackStream[trackId]){
        streams = trackStream[trackId];
    }
    let streamInfo = createStreamInfo(row);
    streams.push(streamInfo);
    trackStream[trackId] = streams;
};

const mapStreamPerUser = (row, userStreams) => {
    let streams = [];
    const userId = row['user_id'];
    if (userStreams[userId]){
        streams = userStreams[userId];
    }
    let streamInfo = createStreamInfo(row);
    streams.push(streamInfo);
    userStreams[userId] = streams;
};

const createStreamInfo = (row) => {
    const userId = row['user_id'];
    let streamInfo = new StreamInfo(userId);
    streamInfo.setDate(row['date']);
    streamInfo.setRegion(row['region']);
    streamInfo.setTrack_id(row['track id']);
    streamInfo.setSeconds(row['seconds']);
    return streamInfo;
};

