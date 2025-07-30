const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');

const routerImag = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

routerImag.post('/image', upload.single('image'), async (req, res) => {
  try {
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'my_brand_assets',
    });

    // Salva result.secure_url in MongoDB se ti serve
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Errore upload:', error);
    res.status(500).json({ error: 'Errore durante il caricamento' });
  }
});

module.exports = routerImag;
