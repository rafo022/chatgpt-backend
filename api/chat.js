import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API Key no configurada' });
    }

    // Función para hacer scraping
    async function fetchProjectInfo() {
      try {
        const { data } = await axios.get('https://www.beeyond.pe/alborada');
        const $ = cheerio.load(data);

        // Extraer datos específicos de la página
        const projectTitle = $('h1').first().text(); // Cambia el selector según tu página
        const projectDescription = $('p').first().text();

        return `Título del Proyecto: ${projectTitle}. Descripción: ${projectDescription}`;
      } catch (error) {
        console.error("Error al obtener la información del proyecto:", error);
        return "Información del proyecto no disponible.";
      }
    }

    // Obtener la información del proyecto antes de llamar a OpenAI
    const projectInfo = await fetchProjectInfo();

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `Eres un asistente especializado en responder preguntas sobre el Proyecto Alborada Living. Información del proyecto: ${projectInfo}` },
            { role: 'user', content: message }
          ]
        })
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({ reply: data.choices[0].message.content });
      } else {
        console.error('Error en la respuesta de OpenAI:', data.error || 'Error desconocido');
        res.status(response.status).json({ error: data.error || 'Error en la respuesta de OpenAI' });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ error: 'Error procesando la solicitud' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
