
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Nft = require('./app/models/Nft')
// Import routes
const nfRoutes = require("./app/routes/nft");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);



// Middlewares
app.use(express.json());
app.use(cors());


// route Middlewares


//static Images Folder
app.use('/uploads', express.static('uploads'))

app.use("/api/nfts", nfRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));