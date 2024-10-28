document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const petProfileForm = document.getElementById('petProfileForm');
    const sendMessageButton = document.getElementById('sendMessage');

    // Manejar registro de usuario
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            alert(`Usuario registrado con email: ${email}`);
            // Aquí podrías agregar la lógica para guardar el usuario
        });
    }

    // Manejar perfil de mascota
    if (petProfileForm) {
        petProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const petName = document.getElementById('petName').value;
            alert(`Perfil de mascota guardado para: ${petName}`);
            // Aquí podrías agregar la lógica para guardar la mascota
        });
    }

    // Manejar envío de mensajes
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            const messageInput = document.getElementById('messageInput');
            const messagesDiv = document.getElementById('messages');
            const message = messageInput.value;
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.textContent = message;
                messagesDiv.appendChild(messageElement);
                messageInput.value = ''; // Limpiar el input
                messagesDiv.scrollTop = messagesDiv.scrollHeight; // Desplazarse hacia abajo
            }
        });
    }
});
