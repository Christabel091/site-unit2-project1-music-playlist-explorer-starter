
let cards = document.getElementById('playlist-cards');
let modalOverlay = document.getElementById('modal-overlay');
let modalContent = document.getElementById('modal-content')

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

    const modalBody = document.getElementById('modal-body');
    if (modalBody !== ''){modalBody.innerHTML = '';}
    const button = document.createElement('button');
    modalBody.appendChild(button);
    
    playlistSong.songs.forEach((song) =>{
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
                console.log("data accessed");
                const card = document.createElement('div');
                card.classList.add('playlist-card')
                card.setAttribute('id', pl.playlistID);
                
                const cardImage = document.createElement('img');
                cardImage.src = pl.playlist_art;
                cardImage.classList.add('playlist-card-img');
                card.appendChild(cardImage);

                const cardTitle = document.createElement('h4')
                cardTitle.classList.add('playlist-card-title');
                cardTitle.textContent = pl.playlist_name;
                card.appendChild(cardTitle);

                const cardCreator= document.createElement('h5')
                cardTitle.classList.add('playlist-card-creator');
                cardCreator.textContent = "created by "+pl.playlist_creator;
                card.appendChild(cardCreator);
                
                const cardHeartIcon = document.createElement('i');
                cardHeartIcon.classList.add('fa-regular', 'fa-heart', 'Heart-icon');
                cardHeartIcon.addEventListener("click", function(){
                    this.classList.toggle('fa-solid');
                    this.classList.toggle('fa-regular');
                    this.classList.toggle('liked');
                })
                card.appendChild(cardHeartIcon);
                cards.appendChild(card);
                card.addEventListener('click', () =>{
                   loadModal(pl);
                    window.onclick = function(event) {
                        if ((event.target == modalContent)  || (event.target == modalOverlay)  ) {
                            modalContent.style.display = "none";
                            modalOverlay.style.display = "none";
                        }
                    }
                })
               


            });
        }
    )
}




document.addEventListener("DOMContentLoaded", () =>{
    displayPlaylist();

});

