const API_URL = 'https://songapp-backend-1.onrender.com/api/songs';

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString();
}

async function loadDetails() {
  const id = getId();
  if (!id) {
    document.getElementById('details').textContent = 'No song ID provided.';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`);
    const song = await res.json();
    if (!song || song.error) throw new Error();

    const genres = song.genre && song.genre.length ? song.genre.join(', ') : 'N/A';
    const html = `
      <p><strong>Title:</strong> ${song.title}</p>
      <p><strong>Artist:</strong> ${song.artist || 'N/A'}</p>
      <p><strong>Popularity:</strong> ${song.popularity || 'N/A'}</p>
      <p><strong>Release Date:</strong> ${formatDate(song.releaseDate) || 'N/A'}</p>
      <p><strong>Genres:</strong> ${genres}</p>
    `;
    document.getElementById('details').innerHTML = html;
    document.getElementById('editLink').href = `edit.html?id=${id}`;
  } catch (err) {
    document.getElementById('details').textContent = 'Failed to load song.';
  }
}

loadDetails();
