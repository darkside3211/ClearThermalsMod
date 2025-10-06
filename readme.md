Clear Thermals & IR Mod

This is a simple SPT-AKI mod that makes two key changes to the T-7 Thermal Goggles to improve their usability.
Features

    Clearer Image: The visual noise on the T-7 Thermal Goggles has been drastically reduced, providing a much clearer and crisper sight picture.

    IR Vision: The T-7 Goggles can now detect infrared (IR) light sources, such as IR lasers and flashlights, allowing them to function like a hybrid NVG/Thermal device.

Installation

    If you haven't already, download and install Node.js and npm.

    Open a terminal or command prompt in this mod's root directory (ClearThermalsMod).

    Run npm install to download the necessary development dependencies.

    Run npm run build to compile the TypeScript code into JavaScript. This will create a dist folder containing the compiled mod.js.

    Copy the entire ClearThermalsMod folder (including the dist folder and package.json) into your SPT-AKI user/mods/ directory.

    Start the SPT-AKI server. You should see log messages from this mod in the server console as it loads.

Customization

You can edit the file src/mod.ts to change the values. For example, you can change NoiseIntensity to 0 for a perfectly clean image or add other thermal device IDs to modify them as well. Remember to run npm run build again after making any changes.
