import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './infra/errors/AppError';
import 'express-async-errors'
import { routes } from './routes/routes';


const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next:NextFunction) =>{
  if(err instanceof AppError){
      return response.status(err.statusCode).json({
        message: err.message
          
      })
      
  }

  return response.status(500).json({
      status: "error",
      message: `Internal server Error - ${err.message}`
  })
})

app.listen(3333, () => {
  console.log('Server is running in port 3333')
})