 const featured = document.getElementById('featured')
 const featuredHeader = document.getElementById('featured-header');
 const featuredSongs = document.getElementById('featured-songs');
 function loadFeaturedPlaylist(){
    fetch("data/data.json").then((response)=>{
        if (!response.ok){
            throw new Error("network response was bad");
        }
            return response.json();
        }).then(
            (Playlists) => {
                const randomPlaylist = Math.floor(Math.random() * (Playlists.playlists.length + 1));

                const featuredImage = document.createElement('img');
                featuredImage.src = Playlists.playlists[randomPlaylist].playlist_art;
                featuredImage.classList.add('featured-card-img');
                featuredHeader.appendChild(featuredImage);

                const featuredTitle = document.createElement('h4')
                featuredTitle.classList.add('featured-card-title');
                featuredTitle.textContent = Playlists.playlists[randomPlaylist].playlist_name;
                featuredHeader.appendChild(featuredTitle);

                Playlists.playlists[randomPlaylist].songs.forEach((song) =>{
                const featuredSong = document.createElement('div');
                featuredSong.classList.add('featured-song');

                const featuredImage = document.createElement('img');
                featuredImage.src = song.cover_art;
                featuredImage.classList.add('featured-song-img');
                featuredSong.appendChild(featuredImage);

                const featuredInfo = document.createElement('div');
                featuredInfo.classList.add('featured-song-info')

                const featuredTitle = document.createElement('p')
                featuredTitle.classList.add('modal-song-title');
                featuredTitle.textContent = song.title;
                featuredInfo.appendChild(featuredTitle);

                const featuredAuthor = document.createElement('p')
                featuredAuthor.classList.add('featured-song-Author');
                featuredAuthor.textContent = song.artist;
                featuredInfo.appendChild(featuredAuthor);

                const featuredAlbum = document.createElement('p')
                featuredAlbum.classList.add('featured-song-album');
                featuredAlbum.textContent = song.album;
                featuredInfo.appendChild(featuredAlbum);

                const featuredDuration = document.createElement('p')
                featuredDuration.classList.add('featured-song-duration');
                featuredTitle.textContent = song.duration;
                featuredInfo.appendChild(featuredDuration);
                featuredSong.appendChild(featuredInfo);
                featuredSongs.appendChild(featuredSong);

            })
        })
 }

 document.addEventListener('DOMContentLoaded', () =>{
    loadFeaturedPlaylist();
 })
 