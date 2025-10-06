import { DependencyContainer } from "tsyringe";

// SPT types
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class ClearThermals implements IPreAkiLoadMod, IPostDBLoadMod
{
    private modName = "ClearThermals";
    private logger: ILogger;

    /**
     * This method is called before SPT-AKI loads its data.
     * We use it to get a reference to the logger.
     */
    public preAkiLoad(container: DependencyContainer): void 
    {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.info(`[${this.modName}] Loading...`);
    }

    /**
     * This method is called after SPT-AKI has loaded the database.
     * This is where we will make our changes to the thermal goggles.
     */
    public postDBLoad(container: DependencyContainer): void 
    {
        if (!this.logger) 
        {
            this.logger = container.resolve<ILogger>("WinstonLogger");
        }

        this.logger.info(`[${this.modName}] Database loaded. Applying thermal changes...`);

        // Get the DatabaseServer service
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        
        // Get all the in-game items from the database
        const items = databaseServer.getTables().templates.items;

        // The ID for the T-7 Thermal Goggles
        const t7GogglesId = "5c0558060db834001b735271";

        // Find the T-7 goggles item in the database
        const t7Goggles = items[t7GogglesId];
        
        // Check if the item exists and has the properties we want to change
        if (t7Goggles && t7Goggles._props) 
        {
            // Lower the noise intensity to make the picture clearer
            t7Goggles._props.NoiseIntensity = 0.01;
            
            // Add the InfraredVision property to see IR lasers/lights
            t7Goggles._props.InfraredVision = true;

            this.logger.info(`[${this.modName}] T-7 Goggles updated successfully!`);
        }
        else
        {
            this.logger.error(`[${this.modName}] Could not find T-7 Goggles with ID: ${t7GogglesId}`);
        }
    }
}

module.exports = { mod: new ClearThermals() }

