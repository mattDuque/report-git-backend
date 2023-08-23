export const HOST = process.env.DB_URI;
export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASSWORD;
export const DB = process.env.DB_NAME;
export const dialect = "postgres";
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}