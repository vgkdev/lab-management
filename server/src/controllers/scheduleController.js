import scheduleService from "../services/scheduleService";

const handleGetAllSchedule = async (req, res) => {
  console.log("check data server : ", req.query);
  const message = await scheduleService.getAllSchedule(req.query);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllSchedule,
};
