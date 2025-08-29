const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require("dotenv").config();




const app = express();
const PORT = 5000;

// const cardData = [{ spanish: "Madre", english: "Mother", category: "", urlImage: "" },
//   { spanish: "Padre", english: "Father", category: "", urlImage: "" },
//   { spanish: "Hermano", english: "Brother", category: "", urlImage: "" },
//   { spanish: "Hermana", english: "Sister", category: "", urlImage: "" },
//   { spanish: "Abuelo", english: "Grandfather", category: "", urlImage: "" },
//   { spanish: "Abuela", english: "Grandmother", category: "", urlImage: "" },
//   { spanish: "Tío", english: "Uncle", category: "", urlImage: "" },
//   { spanish: "Tía", english: "Aunt", category: "", urlImage: "" },
//   { spanish: "Primo", english: "Cousin", category: "", urlImage: "" },
//   { spanish: "Bebé", english: "Baby", category: "", urlImage: "" },
//   { spanish: "Niño", english: "Boy", category: "", urlImage: "" },
//   { spanish: "Niña", english: "Girl", category: "", urlImage: "" },
//   { spanish: "Amigo", english: "Friend", category: "", urlImage: "" },
//   { spanish: "Familia", english: "Family", category: "", urlImage: "" },
//   { spanish: "Profesor", english: "Teacher", category: "", urlImage: "" },
//   { spanish: "Estudiante", english: "Student", category: "", urlImage: "" },
//   { spanish: "Escuela", english: "School", category: "", urlImage: "" },
//   { spanish: "Clase", english: "Class", category: "", urlImage: "" },
//   { spanish: "Libro", english: "Book", category: "", urlImage: "" },
//   { spanish: "Lápiz", english: "Pencil", category: "", urlImage: "" },
//   { spanish: "Pluma", english: "Pen", category: "", urlImage: "" },
//   { spanish: "Cuaderno", english: "Notebook", category: "", urlImage: "" },
//   { spanish: "Computadora", english: "Computer", category: "", urlImage: "" },
//   { spanish: "Teléfono", english: "Phone", category: "", urlImage: "" },
//   { spanish: "Juguete", english: "Toy", category: "", urlImage: "" },
//   { spanish: "Pelota", english: "Ball", category: "", urlImage: "" },
//   { spanish: "Bicicleta", english: "Bicycle", category: "", urlImage: "" },
//   { spanish: "Coche", english: "Car", category: "", urlImage: "" },
//   { spanish: "Avión", english: "Airplane", category: "", urlImage: "" },
//   { spanish: "Tren", english: "Train", category: "", urlImage: "" },
//   { spanish: "Yo soy\no\nYo estoy", english: "I am", category: "tobe", urlImage: ""},
//   { spanish: "Tú eres\no\nTú estás", english: "You are", category: "tobe", urlImage: "" },
//   { spanish: "Él es\no\nÉl está", english: "He is", category: "tobe", urlImage: "" },
//   { spanish: "Ella es\no\nElla está", english: "She is", category: "tobe", urlImage: "" },
//   { spanish: "Eso es\no\nEso está", english: "It is", category: "tobe", urlImage: "" },
//   { spanish: "Nosotros somos\no\nNosotros estamos", english: "We are", category: "tobe", urlImage: "" },
//   { spanish: "Ustedes son\no\nUstedes están", english: "You are", category: "tobe", urlImage: "" },
//   { spanish: "Ellos son\no\nEllos están", english: "They are", category: "tobe", urlImage: "" },
//   { spanish: "Yo tengo", english: "I have", category: "tohave", urlImage: "" },
//   { spanish: "Tú tienes", english: "You have", category: "tohave", urlImage: "" },
//   { spanish: "Él tiene", english: "He has", category: "tohave", urlImage: "" },
//   { spanish: "Ella tiene", english: "She has", category: "tohave", urlImage: "" },
//   { spanish: "Ello tiene", english: "It has", category: "tohave", urlImage: "" },
//   { spanish: "Nosotros tenemos", english: "We have", category: "tohave", urlImage: "" },
//   { spanish: "Ustedes tienen", english: "You have", category: "tohave", urlImage: "" },
//   { spanish: "Ellos tienen", english: "They have", category: "tohave", urlImage: "" }
// ];

// Configuración de CORS con credenciales
app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    credentials: true, // ¡CRUCIAL para las cookies!
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser()); // Middleware para leer cookies

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

// // Ruta para eliminar todos los datos de las tarjetas
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
    const { category } = req.query; // Aquí se lee el parámetro de la URL
    
    // Si se proporciona una categoría, se crea un filtro.
    // Si no, el filtro es un objeto vacío que encuentra todas las tarjetas.
    const filter = category ? { category: category } : {};
    
    const cards = await collection.find(filter).toArray();
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

//Ruta para loguearme y poder modificar tarjetas
app.post("/login", async (req, res) => {
  console.log(req.body);
  
  const { username, password } = req.body;

  // Usa las variables de entorno de forma segura
  const correctUsername = process.env.USUARIO_SECRETO;
  const correctPassword = process.env.PASSWORD_SECRETA;
  const tokenSecret = process.env.TOKEN_SECRETO;

  console.log(`Recibido del formulario: Usuario - "${username}", Contraseña - "${password}"`);
  console.log(`Leído del .env: Usuario - "${process.env.USUARIO_SECRETO}", Contraseña - "${process.env.PASSWORD_SECRETA}"`);

  if( username == correctUsername && password == correctPassword){
    // Si las credenciales son válidas, crea un token
    const token = jwt.sign({ username: username }, tokenSecret, {
      expiresIn: "1h",
    });

    // Guardar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
   
    console.log(res.cookie);
    

    // Enviar una respuesta de éxito sin el token en el cuerpo
    res.status(200).json({ message: "Inicio de sesión exitoso" });

  } else {
    // Si no son válidas, envía un error
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
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
