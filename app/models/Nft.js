const mongoose = require("mongoose");

// schema like blue print of database/collection data which format make
const Schema = mongoose.Schema;

const nftSchema = new Schema({
        name: { type: String, required: true },
        external_link:{ type: String},
        image: { type: String, required: true, get:(image)=>{
                 return `${'http://localhost:4000'}/${image}`;
        } },
        description:{ type: String},
        qty:{type: Number, required: true },
}, { timestamps: true ,toJSON:{getters:true},id:false});

module.exports = mongoose.model("Nft", nftSchema,'nfts');