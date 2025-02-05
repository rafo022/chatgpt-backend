{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const axios = require('axios');\
const cors = require('cors');\
const app = express();\
\
app.use(cors());\
app.use(express.json());\
\
const OPENAI_API_KEY = 'TU_API_KEY';\
\
app.post('/api/chat', async (req, res) => \{\
  const \{ message \} = req.body;\
\
  try \{\
    const response = await axios.post(\
      'https://api.openai.com/v1/chat/completions',\
      \{\
        model: 'gpt-4',\
        messages: [\{ role: 'user', content: message \}],\
      \},\
      \{\
        headers: \{\
          'Authorization': `Bearer $\{OPENAI_API_KEY\}`,\
          'Content-Type': 'application/json',\
        \},\
      \}\
    );\
\
    res.json(\{ reply: response.data.choices[0].message.content \});\
  \} catch (error) \{\
    res.status(500).json(\{ error: 'Error al procesar la solicitud' \});\
  \}\
\});\
\
app.listen(3000, () => \{\
  console.log('Servidor corriendo en http://localhost:3000');\
\});\
}