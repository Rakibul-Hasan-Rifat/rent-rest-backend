import app from "./app"
import envVars from "./config/envVars.js"


if (envVars.node_env !== "production") {
    app.listen(envVars.port, () => {
        console.log(`The app is running at http://localhost:${envVars.port}`);
    })
}

export default app;