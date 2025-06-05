
let cards = document.getElementById('playlist-cards');
let modalOverlay = document.getElementById('modal-overlay');
let modalContent = document.getElementById('modal-content')
const modalBody = document.getElementById('modal-body');
const searchBox = document.getElementById('playlist-actions-input');


function  searchForPlaylist(searchPlaylist, searchKeyword){
    const requestedPlaylists =  searchPlaylist.playlists.filter(searchPlaylist =>{
        return searchPlaylist.playlist_name.toLowerCase().includes(searchKeyword);
    })

    cards.innerHTML= '';
    searchedplaylist = {}
    searchedplaylist.playlists = requestedPlaylists;
    loadPlaylist(searchedplaylist);
}



function shuffleArray(arr) {
    console.log("func ran ")
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
       [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}

function shuffleSongs(Songs){
    let shuflledSongs =shuffleArray(Songs);
    console.log(shuflledSongs)
    modalBody.querySelectorAll('div').forEach((div) => {
        div.remove();
    })
    console.log("modalBody")
    console.log(modalBody)
    displaySongs(shuflledSongs);
}

function displaySongs(PlaylistSongs){
    PlaylistSongs.forEach((song) => {
    const modalSong = document.createElement('div');
    modalSong.classList.add('modal-song');

    modalSong.innerHTML = `
        <img src="${song.cover_art}" class="modal-song-img">
        <div class="modal-song-info">
        <p class="modal-song-title">${song.title}</p>
        <p class="modal-song-Author">${song.artist}</p>
        <p class="modal-song-album">${song.album}</p>
        </div>
        <p class="modal-song-duration">${song.duration}</p>
    `;

    modalBody.appendChild(modalSong);
    });
}

//function to display modal
function loadModal(playlistSong){
    modalOverlay.style.display = 'flex';
    modalContent.style.display = 'flex';
    const modalImage = document.getElementById("modal-image");
   
    const modalName = document.getElementById("modal-name");
    const modalCreator = document.getElementById("modal-creator");
    modalImage.src = playlistSong.playlist_art;
    modalName.textContent = playlistSong.playlist_name;
    modalCreator.textContent = playlistSong.playlist_creator;
    if (modalBody !== ''){modalBody.innerHTML = '';}
    const button = document.createElement('button');
    button.id = 'button'
    button.textContent = 'shuffle';
    modalBody.appendChild(button);
    displaySongs(playlistSong.songs);
    button.addEventListener('click', () =>{
        shuffleSongs(playlistSong.songs);
    })
}
    
function loadPlaylist(Playlists){
    if (Playlists.playlists.length === 0){
         card.innerHTML = `<h1>NO PLAYLIST TO DISPLAY</h1>`;
         return;
    }
     Playlists.playlists.forEach(pl => {
                const card = document.createElement('div');
                card.classList.add('playlist-card');
                card.setAttribute('id', pl.playlistID);

                card.innerHTML = `
                <img src="${pl.playlist_art}" class="playlist-card-img">
                <h4 class="playlist-card-title">${pl.playlist_name}</h4>
                <h5 class="playlist-card-creator">created by ${pl.playlist_creator}</h5>
                <div class="card-likes">
                    <i class="fa-regular fa-heart Heart-icon"></i>
                    <p>${pl.likeCount}</p>
                    <div><i class="fa-solid fa-wand-magic-sparkles edit"></i></div>
                </div>
                `;

                const cardLikes = card.querySelector('.card-likes');
                const cardHeartIcon = cardLikes.querySelector('.Heart-icon');
                const cardLikeNum = cardLikes.querySelector('p');

                cardHeartIcon.addEventListener("click", function(e) {
                    e.stopPropagation();
                    const isLiked = this.classList.contains('liked');
                    cardLikeNum.textContent = isLiked
                        ? Number(cardLikeNum.textContent) - 1
                        : Number(cardLikeNum.textContent) + 1;

                    this.classList.toggle('fa-solid');
                    this.classList.toggle('fa-regular');
                    this.classList.toggle('liked');
                });

                cards.appendChild(card);

                card.addEventListener('click', () => {
                loadModal(pl);

                window.onclick = function(event) {
                    if (event.target == modalContent || event.target == modalOverlay) {
                    modalContent.style.display = "none";
                    modalOverlay.style.display = "none";
                    }
                }
                });
            })
           
}
//function to retrieve playists data and create playlist card with data
function displayPlaylist(){
    fetch("data/data.json").then((response)=>{
        if (!response.ok){
            throw new Error("network response was bad");
        }
        return response.json();
    }).then(
        (Playlists) => {
            loadPlaylist(Playlists);
            searchBox.addEventListener('keydown', (event) =>{
                const searchKeyword = searchBox.value.trim().toLowerCase();
                if (event.key === 'Enter') {
                    console.log("search began");
                    searchForPlaylist(Playlists, searchKeyword);
                }
            })

            searchBox.addEventListener('input', () => {
                if (searchBox.value.trim() == ''){
                    loadPlaylist(Playlists);
                }
            })

})

//function that searches for a playlist

}



displayPlaylist();


