import express from 'express';
import { errorMiddleware } from '../common/middlewares/error.middleware';
import Route from "../common/interfaces/route.interface";
import cors from "cors";
import bodyParser from "body-parser"


export class RestServerClient {
    private app: express.Application;
    constructor(routes:Route[]) {

        this.app = express();
         this.app.use(cors({credentials: true, origin: function (origin:any, callback:any) {
              callback(null, true);
          }}));
          this.app.use(bodyParser.json());
          this.app.use(bodyParser.urlencoded({ extended: true }));
        this.mountRoutes(routes);

        this.app.use(errorMiddleware);
    }


    private mountRoutes(routes:Route[]): void {
              routes.forEach(route => {
                this.app.use('/', route.router);
            });
    }
    public start(port:number | string):void{
        this.app.listen(port,()=>{
            console.log(`🚀 App listening on port ${port}`);
        });
    }
}