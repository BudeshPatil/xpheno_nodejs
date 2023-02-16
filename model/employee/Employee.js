const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
ObjectId       = Schema.ObjectId; 
const AutoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');

const dataSchema = new mongoose.Schema({ 
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    designation: { type: String, required: true },
    status: { type: String, required: true },
    created_at: {type: Date,required: true,default: Date.now,},
    updated_at: {type: Date,required: true,default: Date.now,},
    sequence_number: { type: Number, required: true }
});  

module.exports = mongoose.model("employee", dataSchema);