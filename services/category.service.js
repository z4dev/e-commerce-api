const CategoryModel = require("../models/cate.models");
const slugify = require("slugify");

exports.getAllCategories = async (req, res) => {
  const page =  +req.query.page || 1 ;
  const limit  = +req.query.limit || 5  ; 
  const skip = (page-1) * limit;
 try{
   const documents = await CategoryModel.find({}).skip(skip).limit(limit);
   if(page>1){
    res.send({result : documents.length == 0 ? "this page will not show any data" :  documents.length , data : documents , page , prevPage:page-1 , nextPage : page+1}) 
   }
   else{
    res.send({result : documents.length , data : documents , page , nextPage : page+1}) 
   }
     
 }
 catch(err){
  res.status(400).send(`the error occurred case of ${err}`)
 }
};

exports.getSpecificCategory = async(req, res) => {
  const {id} = req.params;
  try{
    const document = await CategoryModel.findById(id)
    res.status(200).json(document);
  }
  catch(err){
    res.json(`${err}`);
  }
  
}


//@access Private
//@
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const slugName = slugify(name);

try{
  const document = await CategoryModel.create({
     name :name , 
     slug : slugName
  })
  res.send(document);
}

catch(err){
  res.send(`the error oucurred is ${err}`)
}


};



exports.updateCategory = async(req,res)=>{
     const {id} = req.params;
     const {name} = req.body;
     const slugUpdated = slugify(name);

     try{
      const updateDocument = await CategoryModel.findOneAndUpdate({_id:id},{name:name,slug:slugUpdated},{new:true}) 
      res.send({"data":updateDocument});
     }
     
     catch(err){
       res.status(400).send(`the error cased of ${err}`);
     }
   
}

exports.deleteCategory = async(req,res)=>{
  const {id} = req.params;
  try{
    const deleteDocument = await CategoryModel.findOneAndDelete({_id:id});
    res.send({"data":deleteDocument});
  }
  catch(err){
    res.status(400).send(`the error cased of ${err}`);
  }
}



