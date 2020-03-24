const { client, pool } = require('../config/db.config')

function allTeams(response) {
    pool.query('SELECT mlb_org_id, name_display_full, name_display_brief FROM teams ORDER BY name_display_brief ASC')
    .then(res => {
        if (res.rows.length === 0 || res.rows.length === undefined) {
            return response.send({success: false, msg: "Database error: Connection interrupted or data missing."})
        }
        return response.send({success: true, msg: "", data: res.rows})
    })
    .catch(err=> {return response.send({success: false, msg: `Database Error: Code ${err.code}`})})
}

function teamDetails(request, response) {
    let team = [request.params.id]
    pool.query('SELECT * FROM teams WHERE mlb_org_id = $1', team).then(res => {
        if (res.rows.length === 0 || res.rows.length === undefined) {
            return response.send({success: false, msg: "Connection interrupted or data does not exist."})
        }
        return response.send({success: true, msg: "", data: res.rows[0]})
    }
    )
}

module.exports.allTeams = allTeams
module.exports.teamDetails = teamDetails