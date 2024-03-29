const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

async function checkDatabaseConnection() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'Pandusai@2003',
            database: 'Ecologistics',
          
        });
        console.log('Database is connected');
        await connection.end();
        return { success: true, message: 'Database is connected' };
    } catch (error) {
        console.error('Database connection failed:', error);
        return { success: false, message: 'Database connection failed' };
    }
}

checkDatabaseConnection().then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});
