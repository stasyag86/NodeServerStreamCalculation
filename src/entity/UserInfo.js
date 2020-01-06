/**
 * Created by Stas on 12/22/2019.
 */

function UserInfo(user_id) {
    this.user_id = user_id;
}

UserInfo.prototype.setProduct_type = function (product_type) {
    this.product_type = product_type;
};

UserInfo.prototype.setFee = function (fee) {
    this.fee = fee;
};

UserInfo.prototype.setOrigin = function (origin) {
    this.origin = origin;
};

module.exports = UserInfo;