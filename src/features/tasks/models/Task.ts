import { TaskStatus } from './TaskStatus';

export interface Task {
  id: number;
  username: string;
  email: string;
  text: string;
  status: TaskStatus;
  image_path: string;
}
