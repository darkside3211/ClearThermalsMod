My First SPT-AKI Mod

This is a template mod for SPT-AKI.
Description

This mod serves as a starting point for creating your own SPT-AKI mods. By default, it logs messages to the server console and includes an example of how to modify an item's properties in the database.
Installation

    Download and install Node.js and npm if you haven't already.

    Open a terminal or command prompt in the mod's root directory (MyFirstSPTAKIMod).

    Run npm install to download the necessary development dependencies.

    Run npm run build to compile the TypeScript code into JavaScript. This will create a dist folder.

    Copy the entire mod folder (MyFirstSPTAKIMod) into your SPT-AKI/user/mods/ directory.

    Start the SPT-AKI server. You should see the log messages from this mod in the server console.

How to Customize

    Edit the code in src/mod.ts.

    Run npm run build again to recompile your changes.

    Restart the SPT-AKI server to see your new changes in action.