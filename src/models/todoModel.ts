import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/mysql';

export interface TodoInstance extends Model {
    id: number;
    title: string;
    description: string,
    completed: number;
}

export const TodoModel = sequelize.define<TodoInstance>('TodoModel', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    completed: {
        type: DataTypes.TINYINT,
        defaultValue: false,
    }
}, {
    tableName: 'todos',
    timestamps: false
})