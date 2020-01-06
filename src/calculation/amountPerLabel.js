/**
 * Created by Stas on 12/23/2019.
 */
module.exports = (tracks, stream, usersInfo) => {
    let pricePerLabel = {};
    const tracksStream = stream['trackStream'];
    tracks.map((trackInfo) => {
        let label = trackInfo['label 1'];
        let trackId = trackInfo['track_id'];

        const streamInfoList = tracksStream[trackId];
        if (streamInfoList){
            let pricePerTrackID = 0;
            for (let streamInfo of streamInfoList){
                pricePerTrackID += calcPayment(streamInfo, usersInfo)
            }

            if (pricePerLabel[label]){
                let labelTotalPrice = pricePerLabel[label];
                labelTotalPrice += pricePerTrackID;
                pricePerLabel[label] = labelTotalPrice;
            }else{
                pricePerLabel[label] = pricePerTrackID;
            }
        }


    });
    return pricePerLabel;
};

const calcPayment = (streamInfo, usersInfo) => {
    const userId = streamInfo['user_id'];
    //const secondsPlayed = streamInfo['seconds'];
    const userInfo = usersInfo[userId];
    const fee = userInfo['fee'];
    const origin = userInfo['origin'];

    const dottedFee = fee.replace(',', '.');
    const numericFee = Number(dottedFee);
    let price = 0;
    if (origin === 'app_store'){
        price = numericFee * 0.7;
    }else if (origin === 'web'){
        price = numericFee * 0.5;
    }

    return price;
};