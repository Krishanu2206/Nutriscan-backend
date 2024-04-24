const bcrypt = require('bcrypt');
const saltRounds = 10;

//HASH FUNCTION
const hashfunction = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hashpassword) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(hashpassword);
            }
        });
    });
};


//COMPARE / DECRYPT
const decryptfunction = (password, hashpassword) => {
    return bcrypt.compare(password, hashpassword);
}


module.exports = {hashfunction, decryptfunction};