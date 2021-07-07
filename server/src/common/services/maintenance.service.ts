
import { initDatabase, resetDatabase } from "../../databaseInitiator";

export class MaintenanceService {
    
    //Return all recipes of the database
    public async dbInit(): Promise<void> {
        await initDatabase();
    }

    public async dbReset(): Promise<void> {
        await resetDatabase();
    }

    public async ping(): Promise<void>{
        return;
    }
}
export default MaintenanceService;