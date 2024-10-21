const socket = new WebSocket('ws://localhost:8080/chat');

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

socket.onmessage = function(event) {
    const message = event.data;
    outputMessage(message);
};

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const msgInput = document.getElementById('msg');
    const msg = msgInput.value;
    socket.send(msg);
    msgInput.value = '';
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.textContent = message;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
