const featured = document.getElementById('featured');
const featuredHeader = document.getElementById('featured-header');
const featuredSongs = document.getElementById('featured-songs');

function loadFeaturedPlaylist() {
    fetch("data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("network response was bad");
            }
            return response.json();
        })
        .then((Playlists) => {
            const randomPlaylist = Math.floor(Math.random() * Playlists.playlists.length);
            const playlist = Playlists.playlists[randomPlaylist];

            // Clear existing content
            featuredHeader.innerHTML = '';
            featuredSongs.innerHTML = '';

            // Add featured header
            featuredHeader.innerHTML = `
                <img src="${playlist.playlist_art}" class="featured-card-img">
                <h4 class="featured-card-title">${playlist.playlist_name}</h4>
            `;

            // Add songs
            playlist.songs.forEach((song) => {
                featuredSongs.innerHTML += `
                    <div class="featured-song">
                        <img src="${song.cover_art}" class="featured-song-img">
                        <div class="featured-song-info">
                            <p class="modal-song-title">${song.title}</p>
                            <p class="featured-song-Author">${song.artist}</p>
                            <p class="featured-song-album">${song.album}</p>
                            <p class="featured-song-duration">${song.duration}</p>
                        </div>
                    </div>
                `;
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedPlaylist();
});