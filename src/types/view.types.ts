export type ViewType = 'KANBAN' | 'TABLE';

export interface View {
  id: string;
  name: string;
  type: ViewType;
  config: Record<string, any>;
  pipelineId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateViewDto {
  name: string;
  type: ViewType;
  config: Record<string, any>;
  pipelineId: string;
}

export interface UpdateViewDto {
  name?: string;
  type?: ViewType;
  config?: Record<string, any>;
}

export interface ViewVisibility {
  viewId: string;
  userId: string;
  canEdit: boolean;
}
