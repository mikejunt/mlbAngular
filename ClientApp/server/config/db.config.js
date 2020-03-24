const { Pool, Client } = require('pg')


const environment = (process.env.ENVIRONMENT === "production")

const client = new Client({connectionString: process.env.DATABASE_URL,
                           ssl: environment});

const pool = new Pool({connectionString: process.env.DATABASE_URL,
                       ssl: environment});

pool.connect((err,client,done) => {
    if (err) {
        console.log("Pool encountered connection error:", err)
    }
})

client.connect(err => {
    if (err) {
        console.log("Client encountered error on connect:", err)
    }
})

pool.on('error', (err,client) => console.log("Pool error:", err))

module.exports.client = client
module.exports.pool = pool