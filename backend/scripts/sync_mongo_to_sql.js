// Synchronisation MongoDB -> PostgreSQL (Prisma)
// Ce script lira les offres brutes dans MongoDB, les normalisera et les insérera dans la base SQL via Prisma.

const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');

const prisma = new PrismaClient();
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'jobaggregator';

async function main() {
  
    const mongoClient = new MongoClient(mongoUrl); // Connexion à MongoDB
    await mongoClient.connect();
    const db = mongoClient.db(dbName); // Accès à la base de données MongoDB
    const offers = await db.collection('offers').find().toArray(); // Récupération de toutes les offres brutes

    for (const offer of offers) { // Parcours de chaque offre brute
        // Exemple de normalisation (à adapter selon le schéma Prisma)
        await prisma.offer.upsert({ // upsert pour éviter les doublons
            where: { externalId: offer._id.toString() },
            update: {
                title: offer.title,
                description: offer.description,
                company: offer.company,
                location: offer.location,
                contractType: offer.contractType,
                date: offer.date,
                salary: offer.salary || null,
            },
            create: { // Création d'une nouvelle offre si elle n'existe pas
                externalId: offer._id.toString(),
                title: offer.title,
                description: offer.description,
                company: offer.company,
                location: offer.location,
                contractType: offer.contractType,
                date: offer.date,
                salary: offer.salary || null,
            },
        });
    }

    await mongoClient.close();   // Fermeture de la connexion MongoDB
    await prisma.$disconnect(); // Fermeture des connexions
    console.log('Synchronisation terminée.');
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
