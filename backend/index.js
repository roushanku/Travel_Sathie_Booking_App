import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/User.js";
import Place from "./Models/Place.js"
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path from "path";
import downloadImage from "./controller/image_controller.js";
import multer from "multer";
import fs from 'fs';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "heieeomieie390443ndsm";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname + '/uploads'));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.get("/test", (req, res) => {
  res.send("This is test");
});

// connecting to DB
// dAhGXLPdNsUQBQuE
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Conected");
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

app.post("/register", async (req, res) => {
  // console.log(req.body);
  let Name = req.body.name;
  let Email = req.body.email;
  let Pass = req.body.password;

  // console.log(Name,Email,Pass);

  // we want to encrypt our password so we will use module bcryt.js
  try {
    // console.log("Register Invoked");
    const newUser = new UserModel({
      name: Name,
      email: Email,
      password: bcrypt.hashSync(Pass, bcryptSalt),
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passok = bcrypt.compareSync(password, userDoc.password);
    if (passok) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else res.status(422).send("pass not ok");
  } else res.status(401).json("not found");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id } = await UserModel.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
  // res.json({token});
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const newName = Date.now() + ".jpg";
  const { link } = req.body;
//   console.log("imagedownloader");

  const url = link
  const imagePath = path.resolve(__dirname, "uploads", newName); // path where the image will be saved

  downloadImage(url, imagePath)
    .then(() => console.log("Image downloaded successfully"))
    .catch((err) => console.error(err));
  // console.log(newName);
  res.json(newName);
});

const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload' , photosMiddleware.array('photos' , 100) , (req , res) => {
  // console.log(req.files);
  const uploadedFiles = [];
  for(let i = 0 ; i < req.files.length ; i++) {
    const {path , originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path , newPath)
    uploadedFiles.push(newPath);
    uploadedFiles.push(newPath.replace('uploads/' , ''));
  }
  res.json(uploadedFiles);
})

app.post('/places' , (req , res) => {
  const { token } = req.cookies;
  const {
    title , address , 
    addedPhotos , description,
    extraInfo , checkIn , checkOut , maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
  
    const placeDoc = await Place.create({
      owner : userData.id,
      title , address , 
      addedPhotos , description,
      extraInfo , checkIn , checkOut , maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get("/places", (req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
    const {id} = userData;
    res.json( await Place.find({owner:id}));
  })

});

app.get("/places/:id" , async (req , res) => {
  // res.json(req.params);
  const {id} = req.params;
  res.json(await Place.findById(id));
})

app.listen(4000, () => {
  console.log("Server is running");
});
