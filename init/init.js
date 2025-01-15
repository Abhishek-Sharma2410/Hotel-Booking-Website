let mongoose = require("mongoose");
let initData = require("./sampleData.js");
let Listing = require("../models/listing.js");

let connection = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/hotelbooking");
}

connection().then(()=>{
    console.log("Database connected");
}).catch(err =>{console.log(err)});

const init = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("DataBase Has Been Initialized");
}

init();