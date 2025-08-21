const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

// Reemplaza esta línea con la URL de tu base de datos de MongoDB Atlas
const mongoURI = 'mongodb+srv://juancmdev:6623115a@english-cards-cluster.2gt2dro.mongodb.net/?retryWrites=true&w=majority&appName=english-cards-cluster'; 

app.use(cors());
app.use(express.json());

// Conexión a la base de datos y otras funciones del servidor
async function connectToDatabase() {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log('Conectado a la base de datos de MongoDB Atlas!');
        return client.db();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); 
    }
}

app.listen(PORT, async () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    const db = await connectToDatabase();
    // Aquí puedes definir tus rutas API para interactuar con la base de datos.
    
    // Por ejemplo, una ruta para obtener todas las tarjetas
    app.get('/cards', (req, res) => {
        // Lógica para obtener las tarjetas de la base de datos
    });
});



// const cardData = [
//     {
//       english: "Hello",
//       spanish: "Hola",
//     },
//     {
//       english: "Dog",
//       spanish: "Perro",
//     },
//     {
//       english: "Cat",
//       spanish: "Gato",
//     },
//     {
//       english: "Tree",
//       spanish: "Árbol",
//     },
//     {
//       english: "House",
//       spanish: "Casa",
//     },
//     {
//       english: "Car",
//       spanish: "Coche",
//     },
//     {
//       english: "Book",
//       spanish: "Libro",
//     },
//     {
//       english: "Phone",
//       spanish: "Teléfono",
//     },
//     {
//       english: "Sun",
//       spanish: "Sol",
//     },
//     {
//       english: "Moon",
//       spanish: "Luna",
//     },
//     {
//       english: "Star",
//       spanish: "Estrella",
//     },
//     {
//       english: "Tree",
//       spanish: "Árbol",
//     },
//     {
//       english: "House",
//       spanish: "Casa",
//     },
//     {
//       english: "Car",
//       spanish: "Coche",
//     },
//     {
//       english: "Book",
//       spanish: "Libro",
//     },
//     {
//       english: "Phone",
//       spanish: "Teléfono",
//     },
//     {
//       english: "Sun",
//       spanish: "Sol",
//     },
//   ];