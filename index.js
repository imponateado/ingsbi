const args = process.argv;

if(args[2] == null && args[3] == null) {
    console.log("Usage: node index.js [options] \n options: \n 'string'\t(required)\t- Type what you want to search \n 1/0\t(required)\t- Type 1 if you want to delete the messages, type 0 if you don't want to delete the messages.")
} else {
    const qrcode = require('qrcode-terminal');
    const chalk = require('chalk');
    const { Client } = require('whatsapp-web.js');
    const client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('CONNECTED!');
    });

    client.initialize();

    client.on('message', message => {
        if(message.body === '!ping'){
            message.reply('pong!');
        }
    });

    client.on('ready', () => {
        client.searchMessages(args[2]).then((data) => {
            data.forEach(i => console.log(`---\n" ${i.body} "\n---`));
            if(args[3] == 1){
                data.forEach(message => {
                    message.delete(false)
                })
                console.log(chalk.bold.red('WARNING! All found messages were deleted!'))
                client.logout();
            } else if (args[3] == 0){
                console.log(chalk.bold.red('WARNING! No message was deleted!'));
                client.logout();
            } else {
                console.log(chalk.bold.red('WARNING! No message was deleted!'));
                client.logout();
            }
        });
    });

};