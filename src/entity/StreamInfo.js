/**
 * Created by Stas on 12/22/2019.
 */

function StreamInfo(user_id) {
    this.user_id = user_id;
}

StreamInfo.prototype.setDate = function (date) {
    this.date = date;
};

StreamInfo.prototype.setRegion = function (region) {
    this.region = region;
};

StreamInfo.prototype.setTrack_id = function (track_id) {
    this.track_id = track_id;
};

StreamInfo.prototype.setSeconds = function (seconds) {
    this.seconds = seconds;
};

module.exports = StreamInfo;
