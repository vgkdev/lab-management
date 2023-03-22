import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initAPIRoutes = (app) => {
  router.post("/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleUserLogin);
  router.get("/get-all-users", userController.handleGetAllUsers);
  router.put("/edit-user", userController.handleEditUser);
  router.delete("/delete-user", userController.handleDeleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
