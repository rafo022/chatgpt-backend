export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


 try {
      // Verifica que la clave de API esté correctamente configurada
      if (!OPENAI_API_KEY) {
        return res.status(500).json({ error: 'API Key no configurada' });
      }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: message }]
        })
      });

      const data = await response.json();
      res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Error procesando la solicitud' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

