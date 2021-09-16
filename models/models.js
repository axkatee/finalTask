const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    shopName: String,
    createDate: String,
    price: Number,
    itogo: Number
})

const TESTMODULE = mongoose.model("TESTMODULE", Schema);
module.exports = TESTMODULE;