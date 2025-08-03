//ti permette di effettuare un controllo per verificare se e' l'utente che ci interessa
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  console.log('controllo autorizzazioneeeeeeeeeee')
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token mancante' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token non valido' });
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
