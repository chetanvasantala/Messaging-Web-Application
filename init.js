const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err))


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/messages');
};

let allchats = [
    {
        from: "ramesh",
        to: "suresh",
        msg: "Hey bro, how are you?",
        created_at: new Date(),
    },
    {
        from: "suresh",
        to: "ramesh",
        msg: "I am good, what about you?",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "ananya",
        msg: "Are you coming to college today?",
        created_at: new Date(),
    },
    {
        from: "ananya",
        to: "priya",
        msg: "Yes, I will be there by 10 AM.",
        created_at: new Date(),
    },
    {
        from: "rahul",
        to: "amit",
        msg: "Did you complete the assignment?",
        created_at: new Date(),
    },
    {
        from: "amit",
        to: "rahul",
        msg: "Not yet, I will finish it tonight.",
        created_at: new Date(),
    },
    {
        from: "kiran",
        to: "vikram",
        msg: "Let's play cricket this evening.",
        created_at: new Date(),
    },
    {
        from: "vikram",
        to: "kiran",
        msg: "Sure bro, count me in!",
        created_at: new Date(),
    },
    {
        from: "meena",
        to: "divya",
        msg: "Happy birthday! Have a wonderful day.",
        created_at: new Date(),
    },
    {
        from: "arjun",
        to: "rohit",
        msg: "Can you share the project files?",
        created_at: new Date(),
    }
];

Chat.insertMany(allchats)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
});