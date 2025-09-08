(function () {
  // Smooth scrolling
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Theme switcher
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const button = document.getElementById('themeToggle');
    button.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '' || email === '' || message === '') {
      alert('Please fill in all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (response.ok) {
        alert(`Thank you for contacting us, ${name}!`);
        this.reset();
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  });

  // Registration form
  document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const role = document.getElementById('role').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '' || email === '' || role === '') {
      alert('Please fill in all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role })
      });
      if (response.ok) {
        alert(`Thank you for registering, ${name}!`);
        this.reset();
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  });

  // Fetch programs
  async function fetchPrograms() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const programsContainer = document.getElementById('programs-container');
      programsContainer.innerHTML = data.slice(0, 2).map((post, index) => `
        <div class="col-md-6">
          <div class="card shadow-sm h-100 animate-card" style="animation-delay: ${index * 0.2}s">
            <div class="card-body">
              <h5 class="card-title text-primary">${post.title.slice(0, 20)}...</h5>
              <p class="card-text">${post.body.slice(0, 100)}...</p>
            </div>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  }
  fetchPrograms();
})();
