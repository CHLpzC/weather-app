
/**
 * Setting the process environment(global parameters)
 */

var config = require("./config.json");
console.log(config);
Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
});