import { Request, Response, Router } from 'express';
import { TodoModel } from '../models/todoModel';



export const all = async (request: Request, response: Response) => {
    const todoList = await TodoModel.findAll();
    response.json({ todoList })
}

export const add = (request: Request, response: Response) => {
    response.json({result: "salve"});
}

export const update = (request: Request, response: Response) => {
    response.json({result: "salve"});
}

export const remove = (request: Request, response: Response) => {
    response.json({result: "salve"});
}