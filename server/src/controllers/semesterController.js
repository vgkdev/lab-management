import semesterService from "../services/semesterService";

const handleCreateNewSemester = async (req, res) => {
  const message = await semesterService.createNewSemester(req.body);
  return res.status(200).json(message);
};

const handleGetAllSemester = async (req, res) => {
  const message = await semesterService.getAllSemester();
  return res.status(200).json(message);
};

const handleEditSemester = async (req, res) => {
  const message = await semesterService.editSemester(req.body);
  return res.status(200).json(message);
};

const handleDeleteSemester = async (req, res) => {
  const message = await semesterService.deleteSemester(
    req.body.hocKy,
    req.body.namHoc
  );
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewSemester,
  handleGetAllSemester,
  handleEditSemester,
  handleDeleteSemester,
};
