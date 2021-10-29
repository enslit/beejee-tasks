import { AddTaskRequestForm } from './AddTaskRequestForm';

export interface Field {
  value: string;
  error: string;
  touched: boolean;
}

export type AddTaskForm = Record<keyof AddTaskRequestForm, Field>;
