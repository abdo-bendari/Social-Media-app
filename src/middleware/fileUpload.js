import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/Error.js";

export const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Check the file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/mov",
      "video/avi",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError("Invalid format: only images and videos are allowed", 400)
      );
    }
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadSingleFile = (fieldName, folderName) =>
  fileUpload(folderName).single(fieldName);
export const uploadMixFiles = (arrayOfFields, folderName) =>
  fileUpload(folderName).fields(arrayOfFields);
