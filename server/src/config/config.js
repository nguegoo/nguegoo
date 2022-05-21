module.exports = {
    port : process.env.PORT || 8081,
    db: {
        dbname: process.env.DB_NAME || 'nguegoo',
        dbuser: process.env.DB_USER || 'root',
        dbpass: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost'
        }
    },
    AuthenticationSecret: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}