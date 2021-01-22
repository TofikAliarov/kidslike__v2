const fs = require('fs');
const multer = require("multer");
const { nanoid } = require('nanoid');
const path = require('path');


const STATIC_FILES_PATH = path.join(__dirname, "../public/images");
const storage = multer.diskStorage({
    destination: STATIC_FILES_PATH,
    filename: (req, file, cb) => { 
        if(file) {
            const ext = path.parse(file.originalname).ext;
            cb(null, nanoid() + ext);
        }
    },
});

const upload = multer({ storage });

exports.imageUpload = upload.single('image');

exports.deleteOldImage = async(imageName) => {
    const src = path.join(__dirname, (`../public/images/${imageName}`));
    await fs.promises.unlink(src);
}