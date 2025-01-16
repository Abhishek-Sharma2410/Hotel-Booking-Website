let express = require("express");
let app = express();
let PORT = 8080;
let path = require("path");
let mongoose = require("mongoose");
let MONGO_URL = "mongodb://127.0.0.1:27017/hotelbooking";
let Listing = require("./models/listing.js");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let connection = async ()=>{
    await mongoose.connect(MONGO_URL);
}

connection().then(()=>{
    console.log("Database Connected");
}).catch(err =>{
    console.log(err);
});

app.get("/listing", async (req, res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
});

app.get("/listing/new", (req, res)=>{
    res.render("listings/newListing.ejs");
});

app.post("/listing", async (req, res)=>{
    let {title, description, image, price, location, country} = req.body;
    let newListing = new Listing({
        title: title,
        description: description,
        image: image,
        price: price,
        location: location,
        country: country
    });
    await newListing.save();
    console.log("New Listing Saved");
    res.redirect("/listing");
});

app.get("/listing/:id", async (req, res)=>{
    let {id} = req.params;
    let indilisiting = await Listing.findById(id);
    res.render("listings/individualLisitng.ejs", {indilisiting});
});

app.get("/listing/:id/edit", (req, res)=>{
    let {id} = req.params;
    console.log(id);
    res.send("Every thing working great") 
}); 

app.listen(PORT, ()=>{
    console.log(`Server is listening to port : ${PORT}`);
});