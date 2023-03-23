import courseService from "../services/courseService";

const handleCreateNewCourse = async (req, res) => {
  const message = await courseService.createNewCourse(req.body);
  return res.status(200).json(message);
};

const handleGetAllCourse = async (req, res) => {
  const message = await courseService.getAllCourse();
  return res.status(200).json(message);
};

const handleEditCourse = async (req, res) => {
  const message = await courseService.editCourse(req.body);
  return res.status(200).json(message);
};

const handleDeleteCourse = async (req, res) => {
  const message = await courseService.deleteCourse(req.body.maHP);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewCourse,
  handleGetAllCourse,
  handleEditCourse,
  handleDeleteCourse,
};
