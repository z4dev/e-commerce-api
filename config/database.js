const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env'});
const dbConnection = async()=>{
const DB = process.env.DB_URI;
await mongoose.connect(DB).then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.log('No connection');
});

}

module.exports = dbConnection;