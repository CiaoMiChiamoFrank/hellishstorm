const mongoose = require('../GestioneConnessione/dbConnection')
const ProdottoSchema = new mongoose.Schema({
    id_catalogo : Object,
    titolo: String,
    descrizione : String,
    prezzo : Number,
    path : descrizione

})

const prodotto = mongoose.model('Prodotto', ProdottoSchema, 'Prodotto')

//----------------------------------- INSERIMENTO ---------------------------------------
async function insertProdotto(id_catalogo, titolo, descrizine, prezzo, path) {
    
    const p = await prodotto.create({
        id_catalogo : id_catalogo,
        titolo : titolo,
        descrizione : descrizine,
        prezzo : prezzo,
        path : path
    })

    if(p != null) {
        return true
    } else {
        return false
    }

}

//----------------------------------------------------------------------------------------

