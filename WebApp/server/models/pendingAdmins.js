const mongoose  = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

//model to store password resets
const Schema = mongoose.Schema;     //to create schema

let pendingAdminSchema = new Schema(
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
            expires: 86400,
        },
    },
    {
        collection: 'pendingadmins'     //name the collection
    }
)

pendingAdminSchema.index({ "expire_at": 1 }, { expireAfterSeconds: 86400 });

pendingAdminSchema.plugin(uniqueValidator, {message: 'Email already exist'})        //add the plugin to user schema

//to export
module.exports = mongoose.model('pendingadmins',pendingAdminSchema) 