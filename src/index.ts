/** Required imports */
import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createUser, getUserById } from './controllers/user.controller';

dotenv.config();

const app: Express = express();
const router = express.Router();
const port = process.env.PORT || 3000;

router.use(helmet()); // --> using this for middlweare functions that set HTTP response headers
router.use(cors());
router.use(express.json()); // --> using this for parsing incoming requests with JSON

router.get('/:id', getUserById);

router.post('/signup', createUser);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
