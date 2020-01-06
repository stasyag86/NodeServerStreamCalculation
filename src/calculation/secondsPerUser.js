/**
 * Created by Stas on 12/25/2019.
 */
module.exports = (userId, stream) => {
    let res = {};
    const usersStream = stream['userStreams'];
    const allUserStream = usersStream[userId];
    let totalSeconds = 0;
    if (allUserStream){
        allUserStream.map((row) => {
            const seconds = row['seconds'];
            totalSeconds += Number(seconds);
        });

    }
    res['User'] = userId;
    res['Total Streamed'] = totalSeconds;
    return res;


};