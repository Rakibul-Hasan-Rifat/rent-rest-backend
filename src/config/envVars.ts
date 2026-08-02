import dotenv from "dotenv";
import { env } from "process";

dotenv.configDotenv({
    quiet: true    
})

type EnvVariables = {
    port: string
    node_env: string
    bcrypt_salt: number
}

const envVars: EnvVariables = {
    port: env.PORT!,
    node_env: env.NODE_ENV!,
    bcrypt_salt: parseInt(env.BCRYPT_SALT!),
};

export default envVars;