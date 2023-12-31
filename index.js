import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import store from "store2";

const app = express();
const port = 3000;
var pendingTasksList = [];
var completedTasksList = [];
var date = new Date().toLocaleDateString('pt-PT');

//Line 12 sets the view engine to ejs
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));

//Serve landing page
app.get("/", (req,res) => {
    res.render(`work.ejs`,{taskList : pendingTasksList, numberOfItems : pendingTasksList.length, finishedTaskList : completedTasksList, completedNumberOfItems : completedTasksList.length}); 
});

app.get("/daily",(req,res) => {
    res.render("daily.ejs", {day: date});
});

// Basic Function to add tasks
app.post("/addTask", (req,res) => {
    //Local storage stores data as key value pairs 
    //In line 26 we create an object with the key pendingTasks and store a stringified array of objects in it (NOTE:- Simplified explanation because here I do not how I add objects)
    store.local.set("pendingTasks",JSON.stringify([...JSON.parse(store.local.get("pendingTasks") || "[]"),req.body]));
    // Uncomment line 30 to see local storage stores data
    // console.log(store.local.getAll());
    pendingTasksList = Array.from(JSON.parse(store.local.get("pendingTasks")));
    res.redirect("/");
});

// Basic Function to remove tasks
app.post("/removeTask",(req,res) => {
    pendingTasksList = Array.from(JSON.parse(store.local.get("pendingTasks")));
    completedTasksList = Array.from(JSON.parse(store.local.get("completedTasks")));
    pendingTasksList.forEach((element,index) => {
        if (element.task === req.body.task){
            pendingTasksList.splice(index,1);
        }       
    });
    completedTasksList.forEach((element,index) => {
        if (element.task === req.body.task){
            completedTasksList.splice(index,1);
        }       
    });
    store.local.set("pendingTasks",JSON.stringify(pendingTasksList));
    store.local.set("completedTasks",JSON.stringify(completedTasksList));
    pendingTasksList = Array.from(JSON.parse(store.local.get("pendingTasks")));
    completedTasksList = Array.from(JSON.parse(store.local.get("completedTasks")));
    res.redirect("/");
});

// Toggle tasks between complete and incomplete
app.post("/toggleList", (req,res) => {
    if (req.body.check === "false") {
        pendingTasksList = Array.from(JSON.parse(store.local.get("pendingTasks")));
        pendingTasksList.forEach((element,index) => {
            if(element.task === req.body.task){
                store.local.set("completedTasks",JSON.stringify([...JSON.parse(store.local.get("completedTasks") || "[]"),pendingTasksList[index]]));
                pendingTasksList.splice(index,1);
                store.local.set("pendingTasks",JSON.stringify(pendingTasksList));
            }
        })
    } else {
        completedTasksList = Array.from(JSON.parse(store.local.get("completedTasks")));
        completedTasksList.forEach((element,index) => {
            if(element.task === req.body.task){
                store.local.set("pendingTasks",JSON.stringify([...JSON.parse(store.local.get("pendingTasks")),completedTasksList[index]]));
                completedTasksList.splice(index,1);
                store.local.set("completedTasks",JSON.stringify(completedTasksList));
            }
        })
    }
    pendingTasksList = Array.from(JSON.parse(store.local.get("pendingTasks")));
    completedTasksList = Array.from(JSON.parse(store.local.get("completedTasks")));
    res.redirect("/");
})

app.listen (port, () => {
    console.log(`Listening on port ${port}`);
});

