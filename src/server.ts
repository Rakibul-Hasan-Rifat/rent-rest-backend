import path from "path";
import app from "./app"
import envVars from "./config/envVars.js"

const main = () => {
    
    app.listen(envVars.port, () => {
        console.log(`The app is running at http://localhost:${envVars.port}`);
    })

}

main();