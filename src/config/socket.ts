import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server as HttpServer } from 'http';

export const configureSocket = async (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join:pipeline', (pipelineId: string) => {
      socket.join(`pipeline:${pipelineId}`);
      console.log(`Client ${socket.id} joined pipeline ${pipelineId}`);
    });

    socket.on('leave:pipeline', (pipelineId: string) => {
      socket.leave(`pipeline:${pipelineId}`);
      console.log(`Client ${socket.id} left pipeline ${pipelineId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
