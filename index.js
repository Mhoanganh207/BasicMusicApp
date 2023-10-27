
const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const route = require("./Routes/index");
const db = require("./Config/database");
const http = require("http");
const fetch = require("node-fetch");

db.connect().then(r => {
    console.log("Connected to database");
}).catch(e => {
    console.log("Error connecting to database");
});


let app = express();

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "resources")));
app.use(express.json());


app.get("/test", async (req, res) => {
    let response = await fetch('http://localhost:8080/category');

    let data = await response.json();

    res.json(data[0]);

});



route(app);

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
