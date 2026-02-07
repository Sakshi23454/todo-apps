// main func run honyadhi next func runs - middleware
const logger = (req, res, next) => {
    console.log("request received")
    // next fuunc runs
    next()
}

module.exports = logger