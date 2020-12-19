import bcrypt from "bcrypt";
import Clarifai from "clarifai";
import cors from "cors";
import express from "express";
import knex from "knex";
import { detect } from "./controllers/detect.js";
import { ping } from "./controllers/ping.js";
import { profile } from "./controllers/profile.js";
import { register } from "./controllers/register.js";
import { signin } from "./controllers/signin.js";
import { users } from "./controllers/users.js";

const SALT_ROUNDS = 10;

const {
  PORT = 4000,
  CLARIFAI_API_KEY = "YOUR_API_KEY_HERE",
  DB_CLIENT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
});

const clarifai = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY,
});

const app = express();
const router = express.Router();

app.use("/api", router);

router.use(express.json());
router.use(cors());

router.get("/ping", ping);
router.get("/users", users(db));
router.post("/signin", signin(bcrypt, db));
router.post("/register", register(bcrypt, db, SALT_ROUNDS));
router.get("/profile/:id", profile(db));
router.post("/detect", detect(clarifai, Clarifai.FACE_DETECT_MODEL, db));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
