const mongoose = require('../GestioneConnessione/dbConnection');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware: hash della password prima di salvare
AdminSchema.pre('save', async function (next) {
  // Solo se la password è nuova o modificata
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // genera il "sale"
    this.password = await bcrypt.hash(this.password, salt); // hasha la password
    next();
  } catch (err) {
    next(err);
  }
});

const admin = mongoose.model('Admin', AdminSchema, 'Admin');


//------------------------- confronto crypto pwd---------------------------

async function confrontaPassword(passwordInserita, passwordHashataNelDB) {
  const x =  await bcrypt.compare(passwordInserita, passwordHashataNelDB);
  return x
}

//-------------------------------------------------------------------------

//-----------------------------crea ADMIN---------------------------------
async function createAdmin(nome, password) {
    const a = await admin.create({
        nome : nome,
        password : password
    })

    if (a != null ) {
        return true
    } else {
        return false
    }
}
//------------------------------------------------------------------------


//--------------------Exist ADMIN------------------------------------------
async function existAdmin(name, password) {
  const a = await admin.findOne({ nome: name });

  if (!a) return false;

  const isMatch = await confrontaPassword(password, a.password);
  return isMatch;
}

//-------------------------------------------------------------------------


module.exports = {createAdmin, existAdmin}
