/** Required imports */
import express, { Express, Request, Response } from 'express';
import  * as dotenv  from 'dotenv';
import cors from "cors";
import helmet from 'helmet';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3000;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

/** App config */

app.use(helmet()) // --> using this for middlweare functions that set HTTP response headers 
app.use(cors())
app.use(express.json())