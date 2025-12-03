const API_URL = 'https://songapp-backend-1.onrender.com/api/songs';

const form = document.getElementById('addForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const payload = {
    title: formData.get('title'),
    artist: formData.get('artist') || undefined,
    popularity: formData.get('popularity') || undefined,
    releaseDate: formData.get('releaseDate') || undefined,
    genre: (formData.get('genre') || '')
      .split(',')
      .map(g => g.trim())
      .filter(Boolean)
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to save');

    window.location.href = 'index.html';
  } catch (err) {
    alert('Could not add song.');
  }
});
