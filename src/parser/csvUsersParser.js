/**
 * Created by Stas on 12/21/2019.
 */
const csv = require('csv-parser');
const fs = require('fs');
var UserInfo = require('../entity/UserInfo');
const filePath = './data/users.csv';

module.exports = () => {

    let usersInfo = {};
    return new Promise((resolve,reject) => {
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                const userId = row['user_id'];
                let userInfo = createUserInfo(row);
                usersInfo[userId] = userInfo;
                //console.log(row);
            })
            .on('end', () => {
                resolve(usersInfo);
            });
    });

};

const createUserInfo = (row) => {
    const userId = row['user_id'];
    let userInfo = new UserInfo(userId);
    userInfo.setProduct_type(row['product_type']);
    userInfo.setFee(row['fee']);
    userInfo.setOrigin(row['origin']);
    return userInfo;
};

