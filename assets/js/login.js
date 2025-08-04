// Handles switching between login and registration forms and
// communicating with the serverless auth endpoints. Stores the
// returned JWT in localStorage on successful login.

document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const messageEl = document.getElementById('auth-message');

  // Toggle between login and register views
  function showLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    messageEl.textContent = '';
  }
  function showRegister() {
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    messageEl.textContent = '';
  }

  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);

  // Helper to handle fetch requests to auth endpoints
  async function submitAuth(url, data) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Request failed');
      }
      return json;
    } catch (err) {
      throw err;
    }
  }

  // Handle login submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email').trim();
    const password = formData.get('password');
    if (!email || !password) return;
    messageEl.textContent = 'Authenticating…';
    try {
      const { token } = await submitAuth('/api/auth/login', { email, password });
      localStorage.setItem('authToken', token);
      messageEl.style.color = 'green';
      messageEl.textContent = 'Logged in successfully! Redirecting…';
      // Redirect to booking page after short delay
      setTimeout(() => {
        window.location.href = 'book.html';
      }, 1500);
    } catch (err) {
      messageEl.style.color = 'red';
      messageEl.textContent = err.message;
    }
  });

  // Handle registration submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const email = formData.get('email').trim();
    const password = formData.get('password');
    if (!email || !password) return;
    messageEl.textContent = 'Creating account…';
    try {
      await submitAuth('/api/auth/register', { email, password });
      messageEl.style.color = 'green';
      messageEl.textContent = 'Registration successful! You can now log in.';
      // Switch back to login tab
      showLogin();
    } catch (err) {
      messageEl.style.color = 'red';
      messageEl.textContent = err.message;
    }
  });
});