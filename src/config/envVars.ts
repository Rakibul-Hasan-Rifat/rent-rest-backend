import dotenv from "dotenv";
import { env } from "process";

dotenv.configDotenv({
    quiet: true    
})

type EnvVariables = {
    port: string
    node_env: string
}

const envVars: EnvVariables = {
    port: env.PORT!,
    node_env: env.NODE_ENV!,
};

export default envVars;