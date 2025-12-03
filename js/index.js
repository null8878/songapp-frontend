const API_URL = 'https://songapp-backend-1.onrender.com/api/songs';

async function fetchSongs() {
  try {
    const res = await fetch(API_URL);
    const songs = await res.json();
    renderSongs(songs);
  } catch (err) {
    document.getElementById('songsList').innerHTML = '<li>Failed to load songs.</li>';
  }
}

function renderSongs(songs) {
  const list = document.getElementById('songsList');
  list.innerHTML = '';

  if (!songs.length) {
    list.innerHTML = '<li>No songs yet.</li>';
    return;
  }

  songs.forEach(song => {
    const li = document.createElement('li');
    const genres = song.genre && song.genre.length ? ` | Genres: ${song.genre.join(', ')}` : '';
    li.textContent = `${song.title} ${song.artist ? 'by ' + song.artist : ''}${genres}`;

    const detailsLink = document.createElement('a');
    detailsLink.href = `details.html?id=${song._id}`;
    detailsLink.textContent = ' Details';

    const editLink = document.createElement('a');
    editLink.href = `edit.html?id=${song._id}`;
    editLink.textContent = ' Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => handleDelete(song._id);

    li.appendChild(detailsLink);
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(editLink);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

async function handleDelete(id) {
  if (!confirm('Delete this song?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchSongs();
  } catch (err) {
    alert('Failed to delete song');
  }
}

fetchSongs();
