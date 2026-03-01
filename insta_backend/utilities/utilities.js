const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-pics",
    format: async (req, file) => {
      let extArray = file.originalname.split(".");
      let extension = extArray[extArray.length - 1];
      return extension;
    },
  },
});

const Parser = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    let extArray = file.originalname.split(".");
    let extension = extArray[extArray.length - 1];
    let allowedExt = ["png", "jpg", "jpeg"];
    if (!allowedExt.includes(extension)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = Parser;