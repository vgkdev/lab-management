import express from "express";
import userController from "../controllers/userController";
import facultyController from "../controllers/facultyController";
import courseController from "../controllers/courseController";
import yearController from "../controllers/yearController";

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

  router.post("/create-new-course", courseController.handleCreateNewCourse);
  router.get("/get-all-course", courseController.handleGetAllCourse);
  router.put("/edit-course", courseController.handleEditCourse);
  router.delete("/delete-course", courseController.handleDeleteCourse);

  router.post("/create-new-year", yearController.handleCreateNewYear);
  router.get("/get-all-year", yearController.handleGetAllYear);
  router.put("/edit-year", yearController.handleEditYear);
  router.delete("/delete-year", yearController.handleDeleteYear);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
