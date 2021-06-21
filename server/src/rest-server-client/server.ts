import express from 'express';
import { errorMiddleware } from '../common/middlewares/error.middleware';
import Route from "../common/interfaces/route.interface";

// import cors from "cors";

export class App {
    public express;

    constructor(routes:Route[]) {
        this.express = express();
        this.mountRoutes(routes);

        this.express.use(errorMiddleware);
    }


    private mountRoutes(routes:Route[]): void {
              routes.forEach(route => {
                this.express.use('/', route.router);
            });
            }
}