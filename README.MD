simple CLI utility to delete WhatsApp messages containing a certain string.

setting it up:

I - get on the project folder

II - npm i

using it:

I - node index.js 'string' 0

'string' = whatever string you want to find in a message to delete

0 = the last arg needs to be 0 or 1, actually It can be whatever number except 1, 1 means the script will delete all found messages.

advice:

delete session.json file if you want to log out from your current session

thanks to [matebeing](https://github.com/matebeing), [BOT](https://github.com/knownasbot) and [arj-mat](https://github.com/arj-mat) for helping me on creating this project I was in need.