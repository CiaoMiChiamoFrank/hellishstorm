const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path');

const uploadRoutes = require('./GestioneImmagini/upload');
const routAdmin = require('./GestioneAdmin/AdminController');
const routProdotto = require('./GestioneProdotto/ProdottoController');

dotenv.config();
const app = express();

app.use(cors()); // permette chiamate dal frontend

// Serve le immagini caricate
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 👇 Route che usano form-data PRIMA di express.json()
app.use('/api/upload', uploadRoutes);
app.use('/admin', routProdotto);

// ✅ Ora puoi usare express.json per le route che usano solo JSON
app.use(express.json());
app.use('/admin', routAdmin);
app.use('/shop', routProdotto);
// ...eventuali altre route JSON...

app.listen(5000, () => {
  console.log('Server in ascolto su http://localhost:5000');
});