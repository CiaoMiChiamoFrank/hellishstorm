const express = require('express')
const routAdmin = express.Router()
const {createAdminService, loginService} = require('./AdminService')

routAdmin.post('/login', async (req, res) => {
    const {nome, pwd} = req.body

    const bool = await loginService(nome, pwd)
    if (bool == false) {
        res.status(200).json({message: 'Dati ricevuti correttamente dal server Express', bool});
        console.log('Login FALLITO.')
    } else {
        res.status(200).json({message: 'Dati ricevuti correttamente dal server Express', bool});
        console.log('Login effettuato con successo, dati ricevuto dal client.')
    }
})

routAdmin.post('/signup', async (req, res) => {
    const {nome, pwd} = req.body

    const bool = await createAdminService(nome, pwd)
    if (bool == false) {
        res.status(200).json({message: 'Dati ricevuti correttamente dal server Express', bool});
    } else {
        res.status(200).json({message: 'Dati ricevuti correttamente dal server Express', bool});
    }

})

module.exports = routAdmin