import express from "express";
import {Database} from "./database"




async function main(){
    const app = express();
    const port = 8080; // default port to listen
    const database = new Database();
    
    await database.main();
    
    // define a route handler for the default home page
    app.get( "/", async ( req, res ) => {
        const result = await database.main();
        res.send( result);
        
    } );
    
    // start the Express server
    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
}

main().catch((e)=>{
    console.log(e);
});