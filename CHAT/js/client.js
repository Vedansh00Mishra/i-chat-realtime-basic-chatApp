const socket = io('http://localhost:8000'); // Ensure this matches the server's address

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.m4a')

const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play()
    }
};

form.addEventListener('sumbit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right')
    socket.emit('send',message)
    messageInput.value = ''
})

const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});
socket.on('left', data => {
    appendMessage(`${data.name} left the chat`, 'left');
});

