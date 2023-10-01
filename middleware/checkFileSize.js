import { StatusCodes } from "http-status-codes";
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const FILE_SIZE_LIMIT_UI = `${FILE_SIZE_LIMIT / (1024 * 1024)}MB`

const checkFileSize = (req, res, next) => {
  const files = req.files;

  let filesOverLimit = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const msg = `Upload failed. The following files are over the file size limit of ${FILE_SIZE_LIMIT_UI}: ${filesOverLimit.toString().replaceAll(",", ", ")}`;
    return res
      .status(StatusCodes.REQUEST_TOO_LONG)
      .json({ status: "error", msg });
  }

  next();
};

export default checkFileSize;
