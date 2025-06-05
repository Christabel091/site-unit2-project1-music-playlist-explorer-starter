
let cards = document.getElementById('playlist-cards');
let modalOverlay = document.getElementById('modal-overlay');
let modalContent = document.getElementById('modal-content')
const modalBody = document.getElementById('modal-body');

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
    PlaylistSongs.forEach((song) =>{
        const modalSong = document.createElement('div');
        modalSong.classList.add('modal-song');

        const modalImage = document.createElement('img');
        modalImage.src = song.cover_art;
        modalImage.classList.add('modal-song-img');
        modalSong.appendChild(modalImage);

        const modalInfo = document.createElement('div');
        modalInfo.classList.add('modal-song-info')

        const modalTitle = document.createElement('p')
        modalTitle.classList.add('modal-song-title');
        modalTitle.textContent = song.duration;
        modalInfo.appendChild(modalTitle);

        const modalAuthor = document.createElement('p')
        modalAuthor.classList.add('modal-song-Author');
        modalAuthor.textContent = song.artist;
        modalInfo.appendChild(modalAuthor);

        const modalAlbum = document.createElement('p')
        modalAlbum.classList.add('modal-song-album');
        modalAlbum.textContent = song.album;
        modalInfo.appendChild(modalAlbum);

        modalSong.appendChild(modalInfo);

        const modalDuration = document.createElement('p')
        modalDuration.classList.add('modal-song-duration');
        modalTitle.textContent = song.duration;
        modalSong.appendChild(modalDuration);
        modalBody.appendChild(modalSong);
    })
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


//function to retrieve playists data and create playlist card with data
function displayPlaylist(){
    fetch("data/data.json").then((response)=>{
        if (!response.ok){
            throw new Error("network response was bad");
        }
        return response.json();
    }).then(
        (Playlists) => {
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
})
}




document.addEventListener("DOMContentLoaded", () =>{
    displayPlaylist();
});

