const {insertProdotto, updateProdotto, readProdotto, deleteProdotto, readProdottoAll, readProdottoById} = require ('./ProdottoDAO')

async function insertProdottoService(titolo, descrizione, catalogo, prezzo, path, magazzino) {
    const bool = await insertProdotto(titolo, descrizione, catalogo, prezzo, path, magazzino)
    return bool
}

async function updateProdottoService(id, titolo, descrizione, catalogo, prezzo, path) {
    const bool = updateProdotto(id, titolo, descrizione, catalogo, prezzo, path)
    return bool
}

async function readProdottoService(catalogo) {
    const prodotto = await readProdotto(catalogo)
    return prodotto
}

async function deleteProdottoService(id) {
    const bool = await deleteProdotto(id)
    return bool
}

async function readProdottoAllService() {
    const prodotto = await readProdottoAll()
    return prodotto
}

async function readProdottoByIdService(id) {
    const prodotto = await readProdottoById(id)
    return prodotto
}

module.exports = {insertProdottoService, updateProdottoService, readProdottoService, deleteProdottoService, readProdottoAllService, readProdottoByIdService}