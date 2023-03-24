import express from "express";
import userController from "../controllers/userController";
import facultyController from "../controllers/facultyController";
import courseController from "../controllers/courseController";
import yearController from "../controllers/yearController";
import softwareController from "../controllers/softwareController";
import {
  handleCreateNewClassroom,
  handleGetAllClassroom,
  handleEditClassroom,
  handleDeleteClassroom,
} from "../controllers/classroomController";

import {
  handleCreateNewIncident,
  handleGetAllIncident,
  handleEditIncident,
  handleDeleteIncident,
} from "../controllers/incidentController";

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

  router.post(
    "/create-new-software",
    softwareController.handleCreateNewSoftware
  );
  router.get("/get-all-software", softwareController.handleGetAllSoftware);
  router.put("/edit-software", softwareController.handleEditSoftware);
  router.delete("/delete-software", softwareController.handleDeleteSoftware);

  router.post("/create-new-classroom", handleCreateNewClassroom);
  router.get("/get-all-classroom", handleGetAllClassroom);
  router.put("/edit-classroom", handleEditClassroom);
  router.delete("/delete-classroom", handleDeleteClassroom);

  router.post("/create-new-incident", handleCreateNewIncident);
  router.get("/get-all-incident", handleGetAllIncident);
  router.put("/edit-incident", handleEditIncident);
  router.delete("/delete-incident", handleDeleteIncident);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
