let express = require("express");
let app = express();
let PORT = 8080;
let path = require("path");
let mongoose = require("mongoose");
let MONGO_URL = "mongodb://127.0.0.1:27017/hotelbooking";
let Listing = require("./models/listing.js");
let methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

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

app.get("/listing/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/editform.ejs", {listing});
}); 

app.get("/listing/:id", async (req, res)=>{
    let {id} = req.params;
    let indilisiting = await Listing.findById(id);
    res.render("listings/individualLisitng.ejs", {indilisiting});
});

app.put("/listing/:id", async (req, res)=>{
    let {id} = req.params;
    let {title, description, image, price, location, country} = req.body;
    await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: image,
        price: price,
        location: location,
        country: country
    });
    console.log("Updated Successfully");
    res.redirect(`/listing/${id}`);
});

app.delete("/listing/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedProperty = await Listing.findByIdAndDelete(id);
    console.log(deletedProperty);
    res.redirect("/listing");
})

app.listen(PORT, ()=>{
    console.log(`Server is listening to port : ${PORT}`);
});