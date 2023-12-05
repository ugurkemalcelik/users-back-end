const express = require("express");
const { blockUser, deleteUser } = require("../controllers/adminController");
const { checkUserExist } = require("../middlewares/authorization/userAuthorizatonMiddleware");
const { checkAdminExist } = require("../middlewares/authorization/adminAuthorizationMiddleware");
const { getAccessToRoute } = require("../middlewares/authorization/authAuthorizationMiddleware");

const adminRouter = express.Router();

adminRouter.put("/block/:id",checkUserExist,getAccessToRoute,checkAdminExist,blockUser);
adminRouter.delete("/delete/:id",checkUserExist,getAccessToRoute,checkAdminExist,deleteUser);

module.exports = adminRouter;