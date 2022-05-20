const Nft = require("../models/Nft");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const fs = require("fs");
const ipfsAPI = require("ipfs-api");

const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

// multer handle file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const NftsController = {

  async mint(req, res, next) {
   
    const Schema = Joi.object({
      Nft: {
        name: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string().required(),
        external_link: Joi.string(),
        qty: Joi.number().min(1).required(),
      },
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return next(error);
    }

    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      
      // object distructuring from the request body
      const { name, description, qty, external_link } = req.body;
      let document;
      try {
        document = await Nft.create({
          name,
          image: filePath,
          description,
          qty,
          external_link

        });
        
        const address = path.join(
          path.dirname(require.main.filename),
          "uploads/",
          path.basename(document.image)
        )
        let images = fs.readFileSync(address);
        const bufimage = Buffer.from(images);
        const bufimageIpfs = await ipfs.add(bufimage);

        const ipfsImageUrl = `https://ipfs.io/ipfs/${bufimageIpfs[0].path}`;
        fs.writeFileSync(
          path.join(path.dirname(require.main.filename), "text.txt"),
          JSON.stringify({
            name: document.name,
            image: ipfsImageUrl,
            description: document.description,
            qty: document.qty, 
            external_link: document.external_link,
          }),
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          }
        );

        let testFile = fs.readFileSync(
          path.join(path.dirname(require.main.filename), "text.txt")
        );
        const buf = Buffer.from(testFile);
        const response = await ipfs.add(buf);

        let myarray = [];
        for (let i = 0; i < qty; i++) {
          myarray.push(i)

        }
        return res.json({ url: `https://ipfs.io/ipfs/${response[0].path}` });
      } catch (err) {
        return next(err);
      }
    });
  },

};
module.exports = { NftsController }