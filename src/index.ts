import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/database';
import { configureSocket } from './config/socket';


dotenv.config();
const app = express();
const httpServer = createServer(app);



app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', routes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const io = await configureSocket(httpServer);
    app.set('io', io);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();
