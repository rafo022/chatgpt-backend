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
      addMessage(`Error: ${JSON.stringify(errorData)}`, "bot"); // Mostrar el error completo
    }
  } catch (error) {
    // Si hay un error en la comunicación con el backend
    addMessage(`Hubo un error al conectar con el servidor: ${JSON.stringify(error)}`, "bot"); // Mostrar detalles del error
  }
};

