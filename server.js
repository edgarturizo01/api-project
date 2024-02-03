const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const OpenAI = require('openai');
app.use(express.urlencoded({ extended: true }));

const config = new OpenAI({
    apiKey: "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",
});


app.post('/generate-response', async (req, res) => {
    const userMessage = req.body.userMessage;
  
    try {
      const chatCompletion = await config.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      });
  
      const response = JSON.stringify(chatCompletion.choices[0].message, null, 2);
      res.render('home', { userMessage, response });
    } catch (error) {
      console.error('Error generando respuesta:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


const PORT = process.env.PORT || 3000;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura la carpeta de archivos estáticos (reemplaza 'ruta/a/tus/videos' con la ruta correcta)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));



// Rutas
  app.get('/', (req, res) => {
    res.render('login');
  });

  app.get('/home', (req, res) => {
    res.render('home', { userMessage: '', response: '' });
  });

  app.get('/lecciones', (req, res) => {
    res.render('lecciones');
  });

  app.get('/lec01', (req, res) => {
    res.render('lec_01');
  });

  app.get('/lec02', (req, res) => {
    res.render('lec_02');
  });

  app.get('/game_02', (req, res) => {
    const variables = ['x', 'y', 'z'];
    res.render('_game_02', { variables });
  });

  app.get('/open', (req, res) => {
    res.render('open', { userMessage: '', response: '' });
  });

  app.get('/algebra', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'algebra.html'));
  });
  
  app.get('/geometry', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'geometry.html'));
  });



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
