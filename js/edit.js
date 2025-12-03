const API_URL = 'http://localhost:3000/api/songs';
const form = document.getElementById('editForm');

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function formatForInput(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

async function loadSong() {
  const id = getId();
  if (!id) {
    form.innerHTML = '<p>No song ID provided.</p>';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`);
    const song = await res.json();
    if (!song || song.error) throw new Error();

    form.elements.title.value = song.title || '';
    form.elements.artist.value = song.artist || '';
    form.elements.popularity.value = song.popularity || '';
    form.elements.releaseDate.value = formatForInput(song.releaseDate);
    form.elements.genre.value = song.genre ? song.genre.join(', ') : '';
  } catch (err) {
    form.innerHTML = '<p>Failed to load song.</p>';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = getId();
  if (!id) return;

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
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to update');

    window.location.href = `details.html?id=${id}`;
  } catch (err) {
    alert('Could not update song.');
  }
});

loadSong();
