const mongoose = require("mongoose");
const { APP_URL } = require("../config/config");

// schema like blue print of database/collection data which format make
const Schema = mongoose.Schema;

const nftSchema = new Schema({
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true, get:(image)=>{
                 return `${'http://localhost:4000'}/${image}`;
        } },
        description:{ type: String},
        startDate: { type: Date,required: true },
        endDate: { type: Date,required: true },
        qty:{type: Number, required: true },
        type:{type:String,default:'comman'},
        category:{type:String,default:'private'}
}, { timestamps: true ,toJSON:{getters:true},id:false});

module.exports = mongoose.model("Nft", nftSchema,'nfts');