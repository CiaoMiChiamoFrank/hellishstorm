const mongoose = require('../GestioneConnessione/dbConnection')

const ProdottoSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String },
  catalogo: [{ type: String }], // array di categorie
  prezzo: { type: Number, required: true },
  immagini: [{ type: String }], // array di path delle immagini
  magazzino: { type: Boolean, default: true },
  data: { type: Date, default: Date.now }
});

const prodotto = mongoose.model('Prodotto', ProdottoSchema, 'Prodotto')

//----------------------------------- INSERIMENTO ------------------------------------------
async function insertProdotto(titolo, descrizione, catalogo, prezzo, immagini, magazzino) {

  // CORREZIONE: Ho modificato il nome del parametro da 'paths' a 'immagini'
  // e lo sto passando direttamente al modello.
  const a = await prodotto.create({
    titolo: titolo,
    descrizione: descrizione,
    catalogo: catalogo,
    prezzo: prezzo,
    immagini: immagini, // <-- QUI ERA IL PROBLEMA. Ora riceve l'array corretto.
    magazzino: magazzino
  })

  if(a != null) {
    return true
  } else {
    return false
  }
}
//-------------------------------------------------------------------------------------------

//------------------------------------CANCELLAZIONE PRODOTTO---------------------------------
async function deleteProdotto(id) {
  const a = await prodotto.deleteOne({_id : id})
  if ( a != null) {
    return true;
  } else {
    return false;
  }
}
//-------------------------------------------------------------------------------------------

//-------------------------------------UPDATE------------------------------------------------
async function updateProdotto(id, titolo, descrizione, catalogo, prezzo, path) {
  const a = await prodotto.findOne({_id : id})
  if (a != null) {
    a.titolo = titolo
    a.descrizione = descrizione
    a.catalogo = catalogo
    a.prezzo = prezzo
    a.path = path

    await a.save()
    return true
  } else {
    return false
  }
}
//-------------------------------------------------------------------------------------------

//---------------------------------------READ------------------------------------------------
async function readProdotto(catalogo) {
  // CORREZIONE: Utilizza l'operatore '$in' per trovare i prodotti che
  // hanno almeno una delle categorie specificate nell'array.
  // In questo caso, il 'catalogo' che arriva è una singola stringa (es. 'T-Shirt'),
  // quindi la query cercherà i prodotti che hanno quella stringa
  // all'interno del loro array 'catalogo'.
  const a = await prodotto.find({ catalogo: { $in: [catalogo] } });
  
  if (a !== null) {
    return a;
  } else {
    return null;
  }
}

async function readProdottoAll() {
  // Modifica: Aggiunto .sort({ data: 1 }) per ordinare i prodotti dal più vecchio al più recente
  const a = await prodotto.find().sort({ data: 1 }) 
  if (a != null) {
    return a
  } else {
    return null
  }
}

async function readProdottoById(id) {
  const a = await prodotto.findOne({ _id: id });
  if (a != null) {
    return a;
  } else {
    return null;
  } 
}


//--------------------------------------------------------------------------------------------

module.exports = { insertProdotto, updateProdotto, readProdotto, deleteProdotto, readProdottoAll, readProdottoById }