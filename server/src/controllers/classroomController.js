import classroomService from "../services/classroomService";

const handleCreateNewClassroom = async (req, res) => {
  const message = await classroomService.createNewClassroom(req.body);
  return res.status(200).json(message);
};

const handleGetAllClassroom = async (req, res) => {
  const message = await classroomService.getAllClassroom();
  return res.status(200).json(message);
};

const handleEditClassroom = async (req, res) => {
  const message = await classroomService.editClassroom(req.body);
  return res.status(200).json(message);
};

const handleDeleteClassroom = async (req, res) => {
  const message = await classroomService.deleteClassroom(req.body.sttPhong);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewClassroom,
  handleGetAllClassroom,
  handleEditClassroom,
  handleDeleteClassroom,
};
