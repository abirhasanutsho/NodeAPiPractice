const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    "productName": {

        required: true,
        type: String
    },

    "productPrice": {

        required: true,
        type: String
    },

    "productDescription": {

        required: true,
        type: String
    },

});

module.exports = mongoose.model("node_js",dataSchema);