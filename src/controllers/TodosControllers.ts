import { Request, Response, Router } from 'express';



export const allTodos = (request: Request, response: Response) => {
    response.json({result: "salve"});
}