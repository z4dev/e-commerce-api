const fs = require('fs');
//eslint-disable-next-line
const colors = require('colors');
const dotenv = require('dotenv')

dotenv.config({ path: "./config.env" });


const Product = require('../../models/product.model');
const dbConnection = require('../../config/database');

dbConnection();


const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

const insertProducts = async()=>{
    try{
        await Product.create(products);
        console.log('Data imported successfully'.green.inverse);
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}

const deleteProducts = async()=>{
    try{
        await Product.deleteMany();
        console.log('Data deleted successfully'.red.inverse);
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}

if(process.argv[2] === '-i'){
    insertProducts();
}
else if(process.argv[2] === '-d'){
    deleteProducts();
}