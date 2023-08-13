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
var count = 0;
var tasks = Object.keys(store.local.getAll(tasks)).length ? store.local.getAll(tasks) : {};

//Specifying the location of static files and setting view engine to ejs
app.use(express.static("public"));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));


//Serve landing page
app.get("/", (req,res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        res.send({message : "Error Something went wrong"});
    }
});

// Basic Function to add tasks
app.post("/addTask", (req,res) => {
    count++;    
    tasks = store.local.set(`task${count}`,req.body);
    res.render(`index.ejs`,tasks);
});

// Testing Function
app.get("/getTask",(req,res)=> {
    res.send(store.local.get(`task${count}`));
    console.log((store.local.getAll(tasks))[`task${count}`].task);
    console.log((store.local.getAll(tasks))[`task${count}`].priority);
    console.log(Object.keys(store.local.getAll(tasks)).length);
    console.log(store.local.getAll(tasks));
});

// Basic Function to remove tasks
app.post("/removeTask",(req,res) => {
    store.local.remove(`task${count}`);
    count--;
    res.render("index.ejs");
});

app.listen (port, () => {
    console.log(`Listening on port ${port}`);
});

