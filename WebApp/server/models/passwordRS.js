const mongoose  = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

//model to store password resets
const Schema = mongoose.Schema;     //to create schema

let passwordRSSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expire_at: {
            type: Date,
            default: Date.now(),
            expires: 1800,
        },
    },
    {
        collection: 'passwordrs'     //name the collection
    }
)

passwordRSSchema.index({ "expire_at": 1 }, { expireAfterSeconds: 1800 });

passwordRSSchema.plugin(uniqueValidator, {message: 'Email already exist'})        //add the plugin to user schema

//to export
module.exports = mongoose.model('passwordRS',passwordRSSchema) 