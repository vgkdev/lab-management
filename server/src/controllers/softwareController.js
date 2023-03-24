import softwareService from "../services/softwareService";

const handleCreateNewSoftware = async (req, res) => {
  const message = await softwareService.createNewSoftware(req.body);
  return res.status(200).json(message);
};

const handleGetAllSoftware = async (req, res) => {
  const message = await softwareService.getAllSoftware();
  return res.status(200).json(message);
};

const handleEditSoftware = async (req, res) => {
  const message = await softwareService.editSoftware(req.body);
  return res.status(200).json(message);
};

const handleDeleteSoftware = async (req, res) => {
  const message = await softwareService.deleteSoftware(req.body.tenPM);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewSoftware,
  handleGetAllSoftware,
  handleEditSoftware,
  handleDeleteSoftware,
};
