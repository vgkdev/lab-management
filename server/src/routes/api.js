import express from "express";
import userController from "../controllers/userController";
import facultyController from "../controllers/facultyController";

let router = express.Router();

let initAPIRoutes = (app) => {
  router.post("/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleUserLogin);
  router.get("/get-all-users", userController.handleGetAllUsers);
  router.put("/edit-user", userController.handleEditUser);
  router.delete("/delete-user", userController.handleDeleteUser);

  router.post("/create-new-faculty", facultyController.handleCreateNewFaculty);
  router.get("/get-all-faculty", facultyController.handleGetAllFaculty);
  router.put("/edit-faculty", facultyController.handleEditFaculty);
  router.delete("/delete-faculty", facultyController.handleDeleteFaculty);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
