const { Double } = require("mongodb");
const mongoose  = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

let deviceSchema = new Schema(
    {
        password: {
            type: String,
            required: true
        },
        serial_number: {
            type: Number,
            unique: true,
            required: true
        },
        photos: { //this will hold the link to uploaded photos
            type: String,
            required: true
        },
        location: { //this will hold the location of device
            longitude:{
                type: SchemaTypes.Double,
                required: false
            },
            latitude: {
                type: SchemaTypes.Double,
                required: false
            }
        }
    },
    {
        collection: 'device'     //collection name is device
    }
)

deviceSchema.plugin(uniqueValidator, {message: 'cannot have two device with same serial'}) // the serial number must be a unique value      

//to export
module.exports = mongoose.model('Device',deviceSchema)      

/*
Example from Docs

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

When you call mongoose.model() on a schema, Mongoose compiles a model for you.

The first argument is the singular name of the collection your model is for. 
Mongoose automatically looks for the plural, lowercased version of your model name.
Thus, for the example above, the model Tank is for the tanks collection in the database.

*/