const app = require("./app")
const db = require("./database")

const server = app.listen(app.get("port"));
console.log("Server on port", app.get('port'));

module.exports = {app, server}