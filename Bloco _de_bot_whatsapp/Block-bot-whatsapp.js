const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria um novo cliente na seção local
const client = new Client({
    authStrategy: new LocalAuth(), // This ensures session persistence
    puppeteer: {
        headless: true, // Set to false if you want to see the browser window
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Ensure compatibility with various environments
    }
});

// Evento: Quando o cliente se conecta, o retorno irá indicar a confirmação
client.once('ready', () => {
    console.log('Client is ready!');
});

// Event: When a QR code is received, display it in the terminal
//Evento: Quando o QR code é escaneado, o tamanho se ajusta no terminal
client.on('qr', (qr) => {
    console.log('QR code received, scan it with your phone:');
    qrcode.generate(qr, { small: true }); // Cria uma versão reduzida do QR code
});

// Event: Log errors (optional but recommended for debugging)
//Evento: Em caso de erros (é recomdenvél a correção)
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

// Event: Listening to all incoming messages
//Evento: Envio e retorno de mensagens
client.on('message_create', message => {
    console.log('Message received:', message.body);

    // Simple command to respond with "pong" when "!ping" is received
    // Quando a mensagem é detectada, a resposta dada é "pong"
    if (message.body === '!ping') {
        // Send "pong" to the chat the message was sent from
        // Envio de "pong"  na conversa
        client.sendMessage(message.from, 'pong');
        
        // Alternatively, reply directly to the message
        message.reply('pong');
    }
});

// Start your client
//Inicia 0 cliente
//node app.js
client.initialize();
