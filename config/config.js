const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "It's a secret",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://'+(process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/template'
}

export default config;