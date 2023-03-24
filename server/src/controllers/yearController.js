import yearService from "../services/yearService";

const handleCreateNewYear = async (req, res) => {
  const message = await yearService.createNewYear(req.body);
  return res.status(200).json(message);
};

const handleGetAllYear = async (req, res) => {
  const message = await yearService.getAllYear();
  return res.status(200).json(message);
};

const handleEditYear = async (req, res) => {
  const message = await yearService.editYear(req.body);
  return res.status(200).json(message);
};

const handleDeleteYear = async (req, res) => {
  const message = await yearService.deleteYear(req.body.namHoc);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewYear,
  handleGetAllYear,
  handleEditYear,
  handleDeleteYear,
};
