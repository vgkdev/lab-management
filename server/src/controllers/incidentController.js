import incidentService from "../services/incidentService";

const handleCreateNewIncident = async (req, res) => {
  const message = await incidentService.createNewIncident(req.body);
  return res.status(200).json(message);
};

const handleGetAllIncident = async (req, res) => {
  const message = await incidentService.getAllIncident();
  return res.status(200).json(message);
};

const handleEditIncident = async (req, res) => {
  const message = await incidentService.editIncident(req.body);
  return res.status(200).json(message);
};

const handleDeleteIncident = async (req, res) => {
  const message = await incidentService.deleteIncident(req.body.sttPhong);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewIncident,
  handleGetAllIncident,
  handleEditIncident,
  handleDeleteIncident,
};
