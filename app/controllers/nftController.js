const Nft = require("../models/Nft");
const path = require('path');
const multer = require('multer');

// ------- multer start-----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')
// ------------------------

// Add new nft into database
const nft_create = async (req, res) => {
console.log(req.body);
    const nft = new Nft({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        startDate : req.body.startDate,
        endDate: req.body.endDate,
        qty : req.body.qty,
        image: req.file.path,
        type: req.body.type,
        category: req.body.category
      });
    
      try {
        const savedNft = await nft.save();
        const url = `http://localhost:4000/api/nfts/${savedNft._id}`
        res.send({url});
      } catch (error) {
        res.status(400).send(error);
      }
};

// ===== get single NFT=======
const nft_details = async (req, res) => {
  try {
      const nft = await Nft.findById(req.params.nftId);
      res.json(nft);
    } catch (error) {
      res.json({ message: error });
    }
};
const testing = (req,res,next)=>{
  res.send({yes:"ok"});
}


module.exports = { nft_create, nft_details, upload ,testing}