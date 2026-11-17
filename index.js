const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

main()
.then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err))


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/messages');
};

app.get("/", (req, res) => {
    res.send("working");
});

app.get("/chats", async(req, res) => {
    let chats =  await Chat.find();
    res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let{from, to, msg} = req.body;
    const chat1 = new Chat({from:from, to:to, msg:msg, created_at: new Date()});
    chat1.save()
    .then(res => {
        console.log("new chat created");
    })
    .catch(err => {
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

app.patch("/chats/:id", async (req, res) => {
    let {id} = req.params;
    console.log(id);
    let {msg} = req.body;
    let newchat = await Chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true, new:true});
    console.log(newchat);
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.listen("8080", () => {
    console.log("app is listening at port: 8080");
});
