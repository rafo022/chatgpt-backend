const chatBox = document.getElementById("chat-box");

const sendMessage = async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

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

    // Verificar si la respuesta es exitosa
    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        // Mostrar la respuesta del bot
        addMessage(data.reply, "bot");
      } else {
        // Si la respuesta no tiene 'reply', mostrar error
        addMessage("Lo siento, no pude procesar tu mensaje.", "bot");
      }
    } else {
      // Si la respuesta HTTP no es 200, mostrar el mensaje de error
      const errorData = await response.json();
      addMessage(`Error: ${errorData.error || 'No se pudo procesar la solicitud'}`, "bot");
    }
  } catch (error) {
    // Si hay un error en la comunicación con el backend
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
