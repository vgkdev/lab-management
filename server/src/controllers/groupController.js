import groupService from "../services/groupService";

const handleCreateNewGroup = async (req, res) => {
  const message = await groupService.createNewGroup(req.body);
  return res.status(200).json(message);
};

const handleGetAllGroup = async (req, res) => {
  const message = await groupService.getAllGroup();
  return res.status(200).json(message);
};

const handleEditGroup = async (req, res) => {
  const message = await groupService.editGroup(req.body);
  return res.status(200).json(message);
};

const handleDeleteGroup = async (req, res) => {
  const message = await groupService.deleteGroup(req.body.idNhom);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewGroup,
  handleGetAllGroup,
  handleEditGroup,
  handleDeleteGroup,
};
