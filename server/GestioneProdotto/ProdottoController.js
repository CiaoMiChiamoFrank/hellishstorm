const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const verificaToken = require('../authMiddleware');
const { insertProdottoService, updateProdottoService, readProdottoService, deleteProdottoService, readProdottoAllService, readProdottoByIdService} = require('./ProdottoService');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /magazzino - Modificato per accettare fino a 5 file
router.post('/magazzino', upload.array('foto', 5), async (req, res) => {
  try {
    const { titolo, descrizione, categorie, prezzo, magazzino } = req.body;

    console.log('titolo: ' + titolo);
    console.log('descrizione: ' + descrizione);
    console.log('categoria: ' + categorie);
    console.log('prezzo: ' + prezzo);
    console.log('magazzino: ' + magazzino);

    let immaginiPath = []; // Array per salvare gli URL delle immagini

    // Modificato per gestire un array di file
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64Image, {
          folder: 'hellishstorm_assets',
        });
        immaginiPath.push(result.secure_url);
      }
      console.log('Immagini caricate su Cloudinary:', immaginiPath);
    }

    const inserito = await insertProdottoService(
      titolo,
      descrizione,
      categorie,
      prezzo,
      immaginiPath, // Passa l'array di URL
      magazzino === 'true' || magazzino === true
    );

    if (inserito) {
      res.json({ bool: true, message: 'Prodotto inserito correttamente' });
    } else {
      res.status(500).json({ bool: false, message: 'Inserimento fallito' });
    }
  } catch (err) {
    console.error('Errore inserimento prodotto:', err);
    res.status(500).json({ bool: false, message: 'Errore server' });
  }
});


//restituisce tutti i prodotti
router.post('/magazzino/visualizza', async (req, res) => {

  console.log('Visualizzazione prodotti richiesta');
  try {
    const prodotti = await readProdottoAllService();
    if (prodotti != null) {
      res.json({ bool: true, prodotti });
    } else {
      res.status(404).json({ bool: false, message: 'Nessun prodotto trovato' });
    }
  } catch (err) {
    console.error('Errore visualizzazione prodotti:', err);
    res.status(500).json({ bool: false, message: 'Errore server' });
  }
});

//restituisce prodotti catalogo
router.post('/catalogo/visualizza', async (req, res) => {
  console.log('Richiesta di visualizzazione prodotti per catalogo');
  const { catalogo } = req.body;
  try {
    const prodotti = await readProdottoService(catalogo);
    if (prodotti != null) {
      res.json({ bool: true, prodotti });
    } else {
      res.status(404).json({ bool: false, message: 'Nessun prodotto trovato' });
    }
  } catch (err) {
    console.error('Errore visualizzazione prodotti:', err);
    res.status(500).json({ bool: false, message: 'Errore server' });
  }
});

//Route: id
router.get('/catalogo/:id', async (req, res) => {
  // Recupera l'ID del prodotto dalla richiesta
  console.log('sono dentro la richiesta di visualizzazione prodotto');
  const id = req.params.id;
  console.log('Richiesta di visualizzazione prodotto con ID:', id);
  try {
    const prodotto = await readProdottoByIdService(id);
    if (prodotto != null) {
      res.json({ bool: true, prodotto });
    } else {
      res.status(404).json({ bool: false, message: 'Prodotto non trovato' });
    }
  } catch (err) {
    console.error('Errore visualizzazione prodotto:', err);
    res.status(500).json({ bool: false, message: 'Errore server' });
  }
});

module.exports = router;