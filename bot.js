require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', async (qr) => {
  console.log('QR Code gerado');
  try {
    const qrCodeData = await qrcode.toDataURL(qr);
    document.getElementById('qrcode').innerHTML = `<img src="${qrCodeData}" alt="QR Code" />`;
    document.getElementById('status').textContent = 'Escaneie o QR code com o WhatsApp';
  } catch (error) {
    console.error('Erro ao gerar o QR Code:', error);
    document.getElementById('status').textContent = 'Erro ao gerar o QR Code. Verifique o terminal.';
  }
});

client.on('ready', () => {
  console.log('Bot conectado ao WhatsApp!');
  document.getElementById('status').textContent = 'Bot conectado! Envie uma mensagem no WhatsApp.';
});

client.on('message', async (message) => {
  if (message.isGroupMsg) return;
  const userMessage = message.body;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é um assistente de atendimento ao cliente para vendas. Responda de forma profissional e amigável.' },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    await message.reply(reply);
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    await message.reply('Desculpe, algo deu errado. Tente novamente!');
  }
});

client.on('disconnected', (reason) => {
  console.log('Bot desconectado:', reason);
  document.getElementById('status').textContent = 'Bot desconectado. Reinicie o programa.';
});

client.initialize().catch((error) => {
  console.error('Erro ao inicializar o bot:', error);
  document.getElementById('status').textContent = 'Erro ao inicializar o bot. Verifique o terminal.';
});