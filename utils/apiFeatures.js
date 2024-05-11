class ApiFeatures {

    constructor(MongoDBQuery,queryStr){
        this.queryStr = queryStr;
        this.MongoDBQuery = MongoDBQuery;
    }

    filter(){
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);
    const queryStr = JSON.stringify(queryObj);
    console.log(queryStr);
    const queryStrWithDollar = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.MongoDBQuery = this.MongoDBQuery.find(JSON.parse(queryStrWithDollar));

    return this;
    //
    }

    sort(){
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.MongoDBQuery.sort(sortBy);
          } else {
            this.MongoDBQuery.sort("-createdAt");
          }
          return this;
    }

    limitFields(){
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(",").join(" ");
            this.MongoDBQuery.select(fields);
          } else {
            this.MongoDBQuery.select("-__v");
          }
          return this;
    }

    search(){
        if (this.queryStr.keyword) {
            this.MongoDBQuery.find({
              $or: [
                { title: { $regex: this.queryStr.keyword, $options: "i" } },
                { description: { $regex: this.queryStr.keyword, $options: "i" } },
              ],
            });
          }
          return this;
    }


    paginate(){
        const page = +this.queryStr.page || 1;
        const limit = +this.queryStr.limit || 5;
        const skip = (page - 1) * limit;
        this.MongoDBQuery = this.MongoDBQuery.skip(skip).limit(limit);
        return this;
    }





}

module.exports = ApiFeatures;