const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

const dbConnection = require('./config/database');

const categoryRoutes = require('./routes/category.routes');

//parse json data
app.use(express.json()); 

//connecting to database
dbConnection();

// routes 

app.use('/api/v1/category', categoryRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})