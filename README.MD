simple CLI utility to delete WhatsApp messages containing a certain string.

setting it up:
get on the project folder
npm i whatsapp-web.js
npm i qrcode-terminal
npm i chalk@4

using it:
node index.js 'string' 0

'string' = whatever string you want to find in a message to delete
0 = the last arg needs to be 0 or 1, actually It can be whatever number except 1, 1 means the script will delete all found messages.
