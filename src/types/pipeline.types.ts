export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePipelineDto {
  name: string;
  description?: string;
  organizationId: string;
}

export interface UpdatePipelineDto {
  name?: string;
  description?: string;
}

export interface PipelineAccessControl {
  userId: string;
  pipelineId: string;
  role: 'OWNER' | 'MEMBER' | 'VIEWER';
}
