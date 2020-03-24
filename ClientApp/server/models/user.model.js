const { client, pool } = require('../config/db.config')
const bcrypt = require('bcrypt')


function signUp(response, request) {
    let user = [request.username]
    pool.query("SELECT * FROM users WHERE users.username = $1", user)
        .then(res => {
            if (res.rows.length === 1) {
                return response.send({ success: false, msg: "Username already in use." })
            }
            bcrypt.hash(request.password, 10, (err, result) => {
                if (err) {
                    return response.send({ success: false, msg: "bcrypt failed to hash." }
                    )
                }
                user.push(result); user.push(request.favteam);
                pool.query("INSERT INTO users VALUES (DEFAULT, $1,$2,$3)", user, (err, result, field) => {
                    if (err) { return console.log("Error on query", err.stack) }
                    return response.send({ success: true, msg: "New User Created" })
                })
            })
        })
        .catch(err => console.log(err))
}

function logIn(response, request) {
    let user = [request.username];
    pool.query("SELECT * FROM users WHERE users.username = $1", user)
        .then(res => {
            if (res.rows.length != 1) {
                return response.send({ success: false, msg: "Username or password invalid." })
            }
            bcrypt.compare(request.password, res.rows[0].password, (err, result) => {
                if (err) {
                    return response.send({ success: false, msg: "Error @ bcrypt compare" }
                    )
                }
                if (!result) {
                    return response.send({ success: false, msg: "Username or password invalid." })
                }
                return response.send({ success: true, msg: "", favteam: res.rows[0].favteam })
            })
        })
        .catch(err=>console.log(err))
}


module.exports.signup = signUp
module.exports.login = logIn