import dotenv from "dotenv";
import { env } from "process";

dotenv.configDotenv({
    quiet: true    
})

type EnvVariables = {
    port: string
    node_env: string
    bcrypt_salt: number
    db_url: string
    jwt_access_secret: string
    jwt_refresh_secret: string
    stripe_secret_key: string
    stripe_webhook_secret: string
}

const envVars: EnvVariables = {
    port: env.PORT!,
    node_env: env.NODE_ENV!,
    bcrypt_salt: parseInt(env.BCRYPT_SALT!),
    db_url: env.DATABASE_URL!,
    jwt_access_secret: env.JWT_ACCESS_SECRET!,
    jwt_refresh_secret: env.JWT_REFRESH_SECRET!,
    stripe_secret_key: env.STRIPE_SECRET_KEY!,
    stripe_webhook_secret: env.STRIPE_WEBHOOK_SECRET!
};

export default envVars;