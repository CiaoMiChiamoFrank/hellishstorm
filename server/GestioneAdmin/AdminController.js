const express = require('express')
const routAdmin = express.Router()
const jwt = require('jsonwebtoken');
const {createAdminService, loginService} = require('./AdminService')

const SECRET_KEY = 'chiave_super_segreta';

//-------------------------LOGIN + JWT -------------------------------------------------------------
routAdmin.post('/login', async (req, res) => {
  const { nome, pwd } = req.body;

  const admin = await loginService(nome, pwd);
  if (!admin) {
    console.log('Login FALLITO.');
    return res.status(401).json({ message: 'Credenziali non valide', bool: false });
  }

  const token = jwt.sign(
    {
      id: admin._id,
      nome: admin.nome
    },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  console.log(`Login effettuato da ${admin.nome}`);

  res.status(200).json({
    message: 'Login OK',
    bool: true,
    token
  });
});
//--------------------------------------------------------------------------------------------------------

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