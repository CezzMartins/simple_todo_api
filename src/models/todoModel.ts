import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/mysql';

interface TodoItem extends Model {
    id: number;
    task: string;
    completed: boolean;
}