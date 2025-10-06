import { DependencyContainer } from "tsyringe";
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class ThermalMod implements IPreAkiLoadMod, IPostDBLoadMod {
    private modName = "ClearThermalsMod";
    private logger: ILogger | null = null;

    /**
     * This method is called before SPT-AKI loads its data.
     * We use it to get a reference to the logger.
     */
    public preAkiLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.info(`[${this.modName}] Loading...`);
    }

    /**
     * This method is called after SPT-AKI has loaded the database.
     * This is where we will make our changes to the thermal goggles.
     */
    public postDBLoad(container: DependencyContainer): void {
        if (!this.logger) {
            this.logger = container.resolve<ILogger>("WinstonLogger");
        }
        
        this.logger.info(`[${this.modName}] Database loaded. Applying thermal changes...`);

        // Get the database server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        
        // Get all the in-game items from the database
        const items = databaseServer.getTables().templates.items;

        // The unique ID for the T-7 Thermal Goggles
        const t7GogglesId = "5c0558060db834001b735271";

        // Find the T-7 goggles item in the database
        const thermalItem = items[t7GogglesId];

        if (thermalItem) {
            this.logger.info(`[${this.modName}] Found and modifying: ${thermalItem._props.Name}`);

            // 1. Make the image clearer by reducing noise.
            // A value of 0.01 is very low, making the image crisp.
            const originalNoise = thermalItem._props.NoiseIntensity;
            thermalItem._props.NoiseIntensity = 0.01;
            this.logger.info(`    - Noise Intensity changed from ${originalNoise} to ${thermalItem._props.NoiseIntensity}`);

            // 2. Enable IR detection by adding the property.
            const originalIrState = thermalItem._props.InfraredVision || false;
            thermalItem._props.InfraredVision = true;
            this.logger.info(`    - Infrared Vision changed from ${originalIrState} to ${thermalItem._props.InfraredVision}`);
            
            this.logger.info(`[${this.modName}] Successfully applied all thermal changes!`);
        } else {
            this.logger.error(`[${this.modName}] Could not find the T-7 Goggles (ID: ${t7GogglesId}) in the database.`);
        }
    }
}

module.exports = { mod: new ThermalMod() };

