const chatBox = document.getElementById("chat-box");

const sendMessage = async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return; // Si no hay mensaje, no hace nada

  // Mostrar mensaje del usuario
  addMessage(userInput, "user");

  // Enviar solicitud al backend
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
      // Mostrar la respuesta del bot
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

  // Scroll hacia abajo para mostrar el último mensaje
  chatBox.scrollTop = chatBox.scrollHeight;
};
