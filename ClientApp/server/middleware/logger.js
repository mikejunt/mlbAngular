function log(req,res,next) {
    console.log("Activity @",req.path,"from",req.ip);
    next()
}

module.exports = log