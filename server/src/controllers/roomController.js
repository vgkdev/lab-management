import roomService from "../services/roomService";

const handleCreateNewRoom = async (req, res) => {
  const message = await roomService.createNewRoom(req.body);
  return res.status(200).json(message);
};

const handleGetAllRoom = async (req, res) => {
  const message = await roomService.getAllRoom();
  return res.status(200).json(message);
};

const handleEditRoom = async (req, res) => {
  const message = await roomService.editRoom(req.body);
  return res.status(200).json(message);
};

const handleDeleteRoom = async (req, res) => {
  const message = await roomService.deleteRoom(req.body.sttPhong);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewRoom,
  handleGetAllRoom,
  handleEditRoom,
  handleDeleteRoom,
};
