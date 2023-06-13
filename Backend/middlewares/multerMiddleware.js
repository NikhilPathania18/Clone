import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/profile-images')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, file.originalname)
    }
  })
  
 const upload = multer({ storage: storage })

 export default upload