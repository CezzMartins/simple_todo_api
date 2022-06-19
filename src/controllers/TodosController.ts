import { Request, Response, Router } from 'express';
import { TodoModel } from '../models/todoModel';



export const all = async (request: Request, response: Response) => {
    const todoList = await TodoModel.findAll();
    response.json({ todoList })
}

export const add = async (request: Request, response: Response) => {
    const { title, description } = request.body;
    if(title){
        let newTodoItem = await TodoModel.create({
            title: title,
            description: description,
            completed: request.body.completed ? true : false
        })
        response.status(201);
        response.json({ item: newTodoItem });
    }
    response.json({ errror: "Dados não inivados corretamente. "});
}

export const update = (request: Request, response: Response) => {
    response.json({result: "salve"});
}

export const remove = (request: Request, response: Response) => {
    response.json({result: "salve"});
}