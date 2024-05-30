import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ensureAuthorization = (req) => {
  try {
    const receivedJwt = req.headers.authorization;
    const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

    return decodedJwt;
  } catch (err) {
    return err;
  }
};

export default ensureAuthorization;
