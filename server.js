// server.js
import express from 'express';
import fetch from 'node-fetch';  // Asegúrate de tener esta dependencia

const app = express();
const port = 3000;

// Middleware para analizar las solicitudes JSON
app.use(express.json());

// Ruta para manejar las solicitudes al chat
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Aquí deberías incluir la lógica para comunicarte con la API de OpenAI
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Reemplaza con tu clave API
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // Puedes usar el modelo que necesites
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      // Responde con la respuesta del modelo
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: 'Lo siento, no pude obtener una respuesta.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ reply: 'Hubo un error al procesar tu solicitud.' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
