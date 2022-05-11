const express = require("express");
const Router = express.Router();
const nftController = require('../controllers/nftController');

// create nft
Router.post("/", nftController.upload, nftController.nft_create);

Router.get("/:nftId", nftController.nft_details);

module.exports = Router;