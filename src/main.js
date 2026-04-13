import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // --- Contact Form ---
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // Simulate server request
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.backgroundColor = '#059669';
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = ''; // Revert to class style
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });

  // --- Live Chat ---
  const chatToggleBtn = document.getElementById('chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const closeChatBtn = document.getElementById('close-chat');
  const sendChatBtn = document.getElementById('send-chat');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.querySelector('.chat-messages');

  const toggleChat = () => {
    if (chatWidget.classList.contains('active')) {
      chatWidget.classList.remove('active');
      setTimeout(() => {
         chatWidget.style.display = 'none';
      }, 300);
    } else {
      chatWidget.style.display = 'flex';
      void chatWidget.offsetWidth; // Reflow for animation
      chatWidget.classList.add('active');
    }
  };

  chatToggleBtn.addEventListener('click', toggleChat);
  closeChatBtn.addEventListener('click', toggleChat);

  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      botMsg.textContent = 'Thanks for reaching out! A real human will get right back to you.';
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  };

  sendChatBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
