const mongoose  = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

//user data model
const Schema = mongoose.Schema;     //to create schema

let confirmationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
        //Add the letter confirmation here
    },
    {
        collection: 'confirmation'     //name the collection
    }
)

confirmationSchema.plugin(uniqueValidator, {message: 'Email already exist'})        //add the plugin to user schema

//to export
module.exports = mongoose.model('Confirmation',confirmationSchema)      

/*
Example from Docs

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

When you call mongoose.model() on a schema, Mongoose compiles a model for you.

The first argument is the singular name of the collection your model is for. 
Mongoose automatically looks for the plural, lowercased version of your model name.
Thus, for the example above, the model Tank is for the tanks collection in the database.

*/