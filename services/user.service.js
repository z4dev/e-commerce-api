const userModel = require("../models/user.model");
const handlerFactory = require("./factory.service");

exports.getUsers = handlerFactory.getAll(userModel);
exports.getUser = handlerFactory.getOne(userModel);
exports.addUser = handlerFactory.createOne(userModel);
exports.updateUser = handlerFactory.updateOne(userModel);
exports.deleteUser = handlerFactory.deleteOne(userModel);
