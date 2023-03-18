import express from "express";
// import homeController from "../controllers/homeController";
// import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world vgk");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
