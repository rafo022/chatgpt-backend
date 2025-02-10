const chatBox = document.getElementById("chat-box");

// Mostrar mensaje de bienvenida automáticamente
window.onload = async () => {
  const welcomeMessage = "¡Hola! Soy tu asesor de ventas del proyecto Alborada en Surco. Cuento con inteligencia artificial ¿Qué necesitas saber del proyecto?";
  addMessage(welcomeMessage, "bot");
};

const sendMessage = async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  addMessage(userInput, "user");

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();

    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Lo siento, no pude procesar tu mensaje.", "bot");
    }
  } catch (error) {
    addMessage("Hubo un error al conectar con el servidor.", "bot");
  }
};

const addMessage = (message, sender) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);

  chatBox.scrollTop = chatBox.scrollHeight;
};
