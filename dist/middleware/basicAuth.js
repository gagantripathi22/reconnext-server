require('dotenv').config();
module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [username, password] = decoded.split(':');
    const compareCredentials = username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD;
    if (compareCredentials) {
      next();
    } else {
      res.status(500).send('unauthorized access');
    }
  }
};