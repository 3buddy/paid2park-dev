const dotenv = require('dotenv').config();
const express = require("express");
const app = express();

var http = require('http');
var server = http.createServer(app);

const NODE_ENV = process.env.NODE_ENV;
const socketPath = dotenv.socketPath;

const PORT = process.env.PORT || 49156;
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const listEndpoints = require('express-list-endpoints')
const sqlConnection = require("./connection/sqlConnection");


app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
// app.use(multer.array());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../dist/Paid2Park')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/public/views/'));

sqlConnection();

const router = require("./routes");

app.use("/api/v1/admin", router.admin);
app.use("/api/v1/claim", router.claim);
app.use("/api/v1/role", router.role);
app.use("/api/v1/user", router.user);
app.use("/api/v1/customer", router.customer);

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: '../dist/Paid2Park'});
});

server.listen(PORT, () => {
  //console.log(listEndpoints(app));
  //console.log(dotenv);
  //console.log(process.env.mysql_host);
  console.log(`Server listening to PORT: ${PORT}`)
})
