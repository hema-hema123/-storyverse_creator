import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { requireAuth } from "./firebaseAdmin.js";
import { getCollection } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/me", requireAuth, async (req, res) => {
  const col = await getCollection();

  let doc = await col.findOne({ uid: req.uid });

  if (!doc) {
    doc = {
      uid: req.uid,
      email: req.email,
      interestedGenres: [],
      chosenEnding: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await col.insertOne(doc);
  }

  res.json(doc);
});

app.put("/api/me", requireAuth, async (req, res) => {
  const { interestedGenres, chosenEnding } = req.body;

  const genres =
    Array.isArray(interestedGenres) && interestedGenres.every((g) => typeof g === "string")
      ? interestedGenres
      : [];

  const ending = typeof chosenEnding === "string" ? chosenEnding : null;

  const col = await getCollection();

  await col.updateOne(
    { uid: req.uid },
    {
      $set: {
        email: req.email,
        interestedGenres: genres,
        chosenEnding: ending,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  const updated = await col.findOne({ uid: req.uid });
  res.json(updated);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT || 3001}`);
});

