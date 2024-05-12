const express = require("express");

const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

const ApiError = require("./utils/apiError");

const dbConnection = require("./config/database");

const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subcategory.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");

const error = require("./middleware/errorHandler");

//parse json data
app.use(express.json());

//connecting to database
dbConnection();

// mounting routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subCategoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/products", productRoutes);


//static files

app.use(express.static("uploads"));

app.all("*", (req, res, next) => {
  next(new ApiError(`route not found ${req.originalUrl}`, 404)); // creating custom error
}); // this is a middleware that will be executed when the route is not found

app.use(error.globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
