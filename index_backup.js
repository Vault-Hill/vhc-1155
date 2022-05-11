const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

// Import routes
const nfRoutes = require("./app/routes/nft");

// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/nfts", nfRoutes);

//static Images Folder
app.use('/Images', express.static('./Images'))

app.listen(4000, () => console.log("server up and runing on port 4000!"));