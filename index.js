import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.static("public"));
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

