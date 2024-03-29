import userService from "../services/userService";

const handleCreateNewUser = async (req, res) => {
  const message = await userService.createNewUser(req.body);
  console.log("check new user: ", message);
  return res.status(200).json(message);
};

const handleUserLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      message: "missing inputs parameter!",
    });
  }
  const message = await userService.userLogin(req.body);
  return res.status(200).json(message);
};

const handleVerifyUser = async (req, res) => {
  const message = await userService.verifyUser(req.body);
  return res.status(200).json(message);
};

const handleGetAllUsers = async (req, res) => {
  const message = await userService.getAllUsers();
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  const message = await userService.editUser(req.body);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  console.log("check maCB server: ", req.body);
  const message = await userService.deleteUser(req.body.maCB);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewUser,
  handleUserLogin,
  handleGetAllUsers,
  handleEditUser,
  handleDeleteUser,
  handleVerifyUser,
};
