import dotenv from "dotenv";
import { env } from "process";

dotenv.configDotenv({
    quiet: true
})

type EnvVariables = {
    port: string
}

const envVars: EnvVariables = {
    port: env.PORT!
};

export default envVars;