const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb://localhost:27017";
const dbName = "jobaggregator";
let db;

MongoClient.connect(mongoUrl)
    .then(client => {
        db = client.db(dbName);
        app.listen(3000, () => {
            console.log("Serveur lancé sur http://localhost:3000");
        });
    })
    .catch(err => {
        console.error("Erreur de connexion MongoDB :", err);
    });

// Route pour récupérer toutes les offres
app.get("/api/offers", async (req, res) => {
    try {
        const offers = await db.collection("offers").find().toArray();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Route pour récupérer tous les utilisateurs
app.get("/api/users", async (req, res) => {
    try {
        const users = await db.collection("users").find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

 // Route pour récupérer tous les rôles
app.get("/api/roles", async (req, res) => {
    try {
        const roles = await db.collection("roles").find().toArray();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});