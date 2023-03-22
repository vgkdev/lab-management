import facultyService from "../services/facultyService";

const handleCreateNewFaculty = async (req, res) => {
  const message = await facultyService.createNewFaculty(req.body);
  return res.status(200).json(message);
};

const handleGetAllFaculty = async (req, res) => {
  const message = await facultyService.getAllFaculty();
  return res.status(200).json(message);
};

const handleEditFaculty = async (req, res) => {
  const message = await facultyService.editFaculty(req.body);
  return res.status(200).json(message);
};

const handleDeleteFaculty = async (req, res) => {
  const message = await facultyService.deleteFaculty(req.body.maDV);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewFaculty,
  handleGetAllFaculty,
  handleEditFaculty,
  handleDeleteFaculty,
};
