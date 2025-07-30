const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const uploadRoutes = require('./GestioneImmagini/upload');
const routAdmin = require('./GestioneAdmin/AdminController')

dotenv.config();
const app = express();

app.use(cors()); // <- Consenti richieste dal tuo frontend React
app.use(express.json());
app.use('/api/upload', uploadRoutes);
app.use('/admin', routAdmin)

app.listen(5000, () => {
  console.log('Server in ascolto su http://localhost:5000');
});
