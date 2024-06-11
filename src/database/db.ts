const { Sequelize } = require('sequelize');

const DB_NAME = 'api_movil';
const DB_USER = 'ingtorres';
const DB_PASS = 'Mysql123*';

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: '149.130.168.226',
        dialect: 'mysql',
        port: 3306
    }
);

async function generateDb() {
    await database.sync({ force: true });
    console.log('Base de datos y tablas creadas');
}

generateDb();
