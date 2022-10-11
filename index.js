const express = require("express");
const db = require("./app/models");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// db.sequelize.sync();

// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

app.use(function(req, res, next){
    var data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end', function(){
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        next();
    })
 })

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TCP Interview application." });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});