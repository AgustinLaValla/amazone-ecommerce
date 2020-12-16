const { server } = require('./server');
const { connectDB } = require('./db');
const colors = require('colors');

const port = server.get('port');;

async function main() {
    try {
        await connectDB();
        await server.listen(port);
        console.log(`${colors.magenta('Server on port')} ${colors.green(port)}`)
    } catch (error) {
        console.log(error);
    }
}

main();