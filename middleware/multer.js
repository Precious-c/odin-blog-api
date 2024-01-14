const multer = require("multer")
const path = require("path")

console.log("in multer")
// multer config
module.exports = multer ({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log(file)
        console.log(File)
        let ext = path.extname(file.originalname);
        console.log(ext)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("file type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage})

// module.exports = upload