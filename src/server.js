const app = require("./app");
const config= require('./config/config')

app.listen(config.port, () => console.log('Example app is listening on port 3000.'));