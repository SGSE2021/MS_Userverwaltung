import express from 'express';
import errorMiddleware from './common/middlewares/error.middleware';
import Route from "./common/interfaces/route.interface";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


export class RestServer {
    public app: express.Application;
    constructor( routes: Route[],openapiFile:string ) {

        this.app = express();
        this.app.use( cors( {
            credentials: true, origin: function ( origin: any, callback: any ) {
                callback( null, true );
            }
        } ) );
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded( { extended: true } ) );

        this.mountRoutes( routes );
        this.initializeSwagger(openapiFile);
        this.app.use( errorMiddleware );


    }

    private mountRoutes( routes: Route[] ): void {
        routes.forEach( route => {
            this.app.use( '/', route.router );
        } );
    }


  private initializeSwagger(filename:string) {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'TESTESTSET API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: [filename],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/openapi-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

    /**
     * Starts the server on the given port
     * 
     * @param port port to start the server
     */
    public start( port: number | string ): void {
        this.app.listen( port, () => {
            console.log( `🚀 App listening on port ${ port }` );
        } );
    }
}