import { StatusCodes } from "http-status-codes";

const isFilePayload = (req, res, next) => {
  if (!req.files) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "error", msg: `Missing files` });
  }

  next();
};

export default isFilePayload
