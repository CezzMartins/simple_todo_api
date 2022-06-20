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

export const update = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    const todo = await TodoModel.findByPk(id);

    if(todo){
        if(request.body.title) todo.title = request.body.title;

        if(request.body.title) todo.description = request.body.description;

        if(request.body.completed) {            
           switch(request.body.completed.toLowerCase()) {
                case 'true':
                case '1':
                    todo.completed = true;
                    break;

                case 'false':
                case '0':
                    todo.completed = false;
                    break;
           }
        }
        await todo.save();
        response.json({ item: todo })
    }

    response.json({ error: "Item não encontrado."});
}

export const remove = async (request: Request, response: Response) => {
    const id = request.params.id;
    const todo = await TodoModel.findByPk(id);

    if(todo) todo.destroy();

    response.json();
}