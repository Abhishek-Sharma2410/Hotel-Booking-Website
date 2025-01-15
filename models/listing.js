let mongoose = require("mongoose");

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://images.squarespace-cdn.com/content/v1/59523d5c4c8b031b6d9dcb5b/1645865436351-NF1WX4AHJUE43OZ3GJCY/_S6A1420-Edit-Edit.jpg?format=2500w",
        set: (v) => (v === "" ? undefined : v),
    },
    price: {
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    }
});

let Listing = new mongoose.model("Listing", listingSchema);

module.exports = Listing;