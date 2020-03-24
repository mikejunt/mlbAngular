export class Equations {
    ipAsNumber(IP: string) {
        let finalIP: number = parseFloat(IP);
        finalIP = (Math.trunc(finalIP) + (((finalIP * 10) % 10) / 3));
    }

    calcFIP(Pitcher: Object) {
        let pitcherFIP = (((13 * Pitcher["hr"]) + (3 * (Pitcher["bb"] + Pitcher["hb"])) - (2 * Pitcher["so"])) / Pitcher["ipn"] + this.leagueFIPconstant);
        Pitcher["fip"] = pitcherFIP;
        return Pitcher
    }



    leagueFIPconstant

    allpitchers: Object[]

    sumStat(pitchers: Object[]) {
        let leaguehr = pitchers.reduce(pitcher => leaguehr = leaguehr + parseFloat(pitcher["hr"]));
        let leaguebb = pitchers.reduce(pitcher => leaguebb = leaguebb + parseFloat(pitcher["bb"]));
        let leaguehb = pitchers.reduce(pitcher => leaguehb = leaguehb + parseFloat(pitcher["hb"]));
        let leagueso = pitchers.reduce(pitcher => leagueso = leagueso + parseFloat(pitcher["so"]));
        let leagueip = pitchers.reduce(pitcher => leagueip = leagueip + parseFloat(pitcher["ipn"]));
        this.leagueFIPconstant = (((13 * leaguehr + (3 * leaguebb + leaguehb)) - (2 * leagueso)) / leagueip);
    }   

makeOPS(hitters: Object[]) {
    let OPS = (parseFloat(hitters["obp"]) + (parseFloat(hitters["slg"])));
    hitters["ops"] = OPS.toFixed(3)
}

    


}