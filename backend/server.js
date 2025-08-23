const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos y otras funciones del servidor
let db;
async function connectToDatabase() {
  try {
    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    console.log("Conectado a la base de datos de MongoDB Atlas!");
    db = client.db("english_cards");
    return db;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

// Ruta para insertar los datos (se usa una sola vez)
// app.get("/insert-data", async (req, res) => {
//   try {
//     const collection = db.collection("cards");
//     const count = await collection.countDocuments();

//     if (count === 0) {
//       const result = await collection.insertMany(cardData);
//       console.log(`${result.insertedCount} documentos insertados.`);
//       res.status(200).send({ message: "Datos insertados correctamente." });
//     } else {
//       console.log("Los datos ya existen. No se ha insertado nada.");
//       res.status(200).send({ message: "Los datos ya existen." });
//     }
//   } catch (error) {
//     console.error("Error al insertar los datos:", error);
//     res.status(500).send({ message: "Error al insertar los datos." });
//   }
// });

// Ruta para eliminar todos los datos de las tarjetas
// app.get("/delete-all-cards", async (req, res) => {
//   try {
//     const collection = db.collection("cards");
//     const result = await collection.deleteMany({});
//     console.log(`${result.deletedCount} documentos eliminados.`);
//     res
//       .status(200)
//       .send({ message: "Todos los datos de tarjetas han sido eliminados." });
//   } catch (error) {
//     console.error("Error al eliminar los datos:", error);
//     res.status(500).send({ message: "Error al eliminar los datos." });
//   }
// });

// **NUEVA RUTA para obtener los datos de las tarjetas**
app.get("/cards", async (req, res) => {
  try {
    const collection = db.collection("cards");
    const cards = await collection.find().toArray();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error al obtener los datos de las tarjetas:", error);
    res
      .status(500)
      .send({ message: "Error al obtener los datos de las tarjetas." });
  }
});

// Ruta para agregar una nueva tarjeta
app.post("/cards", async (req, res) => {
  try {
    const newCard = req.body; // El cuerpo de la petición contiene los datos de la nueva tarjeta
    if (!newCard || Object.keys(newCard).length === 0) {
      return res
        .status(400)
        .json({ message: "El cuerpo de la petición no puede estar vacío." });
    }

    const collection = db.collection("cards");
    const result = await collection.insertOne(newCard);

    console.log(`Nueva tarjeta insertada con el ID: ${result.insertedId}`);
    res.status(201).json({
      message: "Tarjeta agregada exitosamente",
      cardId: result.insertedId,
    });
  } catch (error) {
    console.error("Error al agregar la tarjeta:", error);
    res.status(500).json({ message: "Error al agregar la tarjeta." });
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "¡Servidor Node.js funcionando!" });
});

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  db = await connectToDatabase();
  // Aquí puedes definir tus rutas API para interactuar con la base de datos.
});
