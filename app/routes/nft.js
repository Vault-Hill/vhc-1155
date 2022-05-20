const express = require("express");
const Router = express.Router();

const { NftsController } = require("../controllers/NftsController");

Router.post("/mint-nft/", NftsController.mint);

module.exports = Router;