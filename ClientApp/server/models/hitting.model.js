const { client, pool } = require('../config/db.config')

function allHitting(request, response) {
    if (request.body.posfilter === "all") {
        const season = request.body.season
        const search = [request.body.minpa]
        pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 ORDER BY woba DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
    else if (request.body.posfilter === "ALLOF") {
        const season = request.body.season
        const search = [request.body.minpa]
        pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 AND h.primary_position LIKE '_F' ORDER BY woba DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
    else {
        const season = request.body.season
        const search = [request.body.minpa, request.body.posfilter]
                pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 AND h.primary_position = $2 ORDER BY woba DESC`, search)

            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
}
function teamHitting(request, response) {
    if (request.body.posfilter === "all") {
        const season = request.body.season
        const search = [request.body.minpa, request.params.id]
        pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 AND h.team_id = $2 ORDER BY woba DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err}` }) })
    }
    else if (request.body.posfilter === "ALLOF") {
        const season = request.body.season
        const search = [request.body.minpa, request.params.id]
        pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 AND h.team_id = $2 AND h.primary_position LIKE '_F' ORDER BY woba DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
    else {
        const season = request.body.season
        const search = [request.body.minpa, request.params.id, request.body.posfilter]
        pool.query(`SELECT h.hr,h.player,h.rbi,h.tb,h.slg,h.avg,h.bb,h.hbp,h.g,h.d,h.so,h.tpa,h.h,h.cs,h.obp,h.t,h.season,h.r,h.sb,h.player_id,h.ab,h.ibb,h.team_id,h.woba,h.s,h.ops,t.name,t.name_abbrev,t.league FROM "${season}hitting" AS h INNER JOIN teams AS t ON h.team_id = t.team_id WHERE tpa > $1 AND h.team_id = $2 AND h.primary_position = $3 ORDER BY woba DESC`, search)
            .then(res => {
                if (res.rows.length === 0 || res.rows.length === undefined) {
                    return response.send({ success: false, msg: "Database error: Connection interrupted or data missing." })
                }
                return response.send({ success: true, msg: "", data: res.rows })
            })
            .catch(err => { return response.send({ success: false, msg: `Database Error: Code ${err.code}` }) })
    }
}

// doesnt calculate woba constants
function advStats(request, response) {
    const season = request.body.season
    pool.query(`SELECT * FROM "${season}hitting"`).then(res => {
        // let data = res.rows
        // let errors = []
        // data.forEach(obj => {
        //     let ubb = obj['bb'] - obj['ibb']
        //     let single = obj['h'] - obj['hr'] - obj['t'] - obj['d']
        //     let woba = (((0.693 * ubb) + (0.723 * obj['hbp']) + (0.877 * single) + (1.232 * obj['d'])
        //      + (1.552 * obj['t']) + (1.98 * obj['hr'])) / ((obj['ab'] + obj['bb'] - obj['ibb'] + obj['sf'] + obj['hbp'])))
        //     let slg = obj['tb'] / obj['ab']
        //     let obp = ((obj['h']+obj['bb']+obj['hbp']) / (obj['ab'] + obj['bb'] + obj['hbp'] + obj['sf']))
        //     let ops = slg + obp
        //     console.log(ubb, single, woba, slg, obp, ops, obj['player'], obj['player_id'])
        //     if (isNaN(woba)) {woba = 0}
        //     if (isNaN(ops)) {ops = 0}
        //     let insert = [woba, single, ops, obj['id']]
        //     pool.query(`UPDATE "${season}hitting" SET woba = $1, s = $2, ops = $3 WHERE id = $4`, insert).catch(err=>{console.log(obj['player'], woba, err);errors.push(obj['player'])})
        // })
        return response.send({msg: "Complete", errors: errors})
    })
}

module.exports.allHitting = allHitting
module.exports.teamHitting = teamHitting
module.exports.advStats = advStats