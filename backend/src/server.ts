import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './infra/errors/AppError';
import 'express-async-errors'
import { routes } from './routes/routes';
import 'dotenv';
import SwaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
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

  app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));