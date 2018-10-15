
/**
 * Setting the process environment(global parameters)
 */

var config = require("./config.json");
Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
});