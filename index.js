import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import store from "store2";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//Used to get absolute filepath
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//Specifying the location of static files and setting view engine to ejs
app.use(express.static("public"));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));

app.get("/", (req,res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        res.send({message : "Error Something went wrong"});
    }
});

app.post("/addTask", (req,res) => {
    res.send(req.body);
});

app.listen (port, () => {
    console.log(`Listening on port ${port}`);
});

