import { fileURLToPath } from "url";
import * as path from "path";
import express from "express";
import { StatusCodes } from "http-status-codes";
import fileUpload from "express-fileupload";

import isFilePayload from "./middleware/isFilePayload.js";
import checkFileSize from "./middleware/checkFileSize.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(fileUpload({ createParentPath: true }));
app.use(express.static("./public"));

app.post("/upload", isFilePayload, checkFileSize, (req, res) => {
  const files = req.files;
  // console.log(files);

  let storagePath = [];

  Object.keys(files).forEach(async (key) => {
    const filePath = path.join(__dirname, "uploads", files[key].name);
    storagePath.push(filePath);
    try {
      await files[key].mv(filePath);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: error, msg: "Upload failed. Try later" });
    }
  });

  return res.status(StatusCodes.OK).json({
    status: "success",
    msg: `${Object.keys(files)} uploaded to the server`
      .toString()
      .replaceAll(",", ", "),
    paths: `${storagePath}`,
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
