const express = require("express");
const router = express.Router();
const userServices = require("../services/user.service");

router.route("/").get(userServices.getUsers).post(userServices.addUser);

router
  .route("/:id")
  .get(userServices.getUser)
  .patch(userServices.updateUser)
  .delete(userServices.deleteUser);

module.exports = router;
