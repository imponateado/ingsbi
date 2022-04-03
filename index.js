//getting args from comand line
const args = process.argv;

//verifying if they exist, else output usage.
if(args[2] == null && args[3] == null) {
    console.log("Usage: node index.js [options] \n options: \n 'string'\t(required)\t- Type what you want to search \n 1/0\t(required)\t- Type 1 if you want to delete the messages, type 0 if you don't want to delete the messages.");
    process.exit();
}

const fs = require('fs');
const mustDeleteMessages = args[3] == 1;
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');

const SESSION_FILE_PATH='./session.json';
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH);
};

const client = new Client({
    authStrategy: new LegacySessionAuth({
        session: sessionData
    })
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if(err){
            console.log(err);
        }
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('CONNECTED!');
});

client.initialize();

client.on('ready', () => {
    client.searchMessages(args[2]).then((data) => {
        if(mustDeleteMessages){
            data.forEach(message => {
                message.delete(false)
            });
            console.log(chalk.bold.red('WARNING! All found messages were deleted!'));
            process.exit();
        } else {
            data.forEach(i => console.log(`---\n" ${i.body} "\n---`));
            console.log(chalk.bold.red('WARNING! No message was deleted!'));
            process.exit();
        }
    });
});