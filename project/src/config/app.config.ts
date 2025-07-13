export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET',
    secretExpireIn: process.env.JWT_SECRET_EXPIRE_IN || '15m',
    refreshSecretExpireIn: process.env.JWT_REFRESH_SECRET_EXPIRE_IN || '7d',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'nest-db',
  },
})