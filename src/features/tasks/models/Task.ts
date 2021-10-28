export interface Task {
  id: number;
  username: string;
  email: string;
  text: string;
  status: 1 | 10;
  image_path: string;
}
