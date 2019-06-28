const spawn = require('child_process').spawn;

let exec = async (command, args) => {
    return new Promise(resolve => {        
        let process = spawn(command, args);
        let output = '';
        process.stdout.on('data', chunk => output += chunk.toString() );
        process.stdout.on('end', () => resolve(output) );
    })
};

module.exports = exec;