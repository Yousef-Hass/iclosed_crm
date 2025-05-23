import { Server } from 'socket.io';

export const emitPipelineUpdate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('pipeline:update', data);
};

export const emitPipelineDelete = (io: Server, pipelineId: string) => {
  io.to(`pipeline:${pipelineId}`).emit('pipeline:delete');
};

export const emitContactCreate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('contact:create', data);
};

export const emitContactUpdate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('contact:update', data);
};

export const emitContactDelete = (io: Server, pipelineId: string, contactId: string) => {
  io.to(`pipeline:${pipelineId}`).emit('contact:delete', { contactId });
};

export const emitContactMove = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('contact:move', data);
};

export const emitViewUpdate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('view:update', data);
};

export const emitStageReorder = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('stage:reorder', data);
};

export const emitStatusCreate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('status:create', data);
};

export const emitStatusUpdate = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('status:update', data);
};

export const emitStatusDelete = (io: Server, pipelineId: string, statusId: string) => {
  io.to(`pipeline:${pipelineId}`).emit('status:delete', { statusId });
};

export const emitStatusReorder = (io: Server, pipelineId: string, data: any) => {
  io.to(`pipeline:${pipelineId}`).emit('status:reorder', data);
};
