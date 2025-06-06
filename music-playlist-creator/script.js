let cards = document.getElementById('playlist-cards');
let modalOverlay = document.getElementById('modal-overlay');
let modalContent = document.getElementById('modal-content')
const modalBody = document.getElementById('modal-body');
const searchBox = document.getElementById('playlist-actions-input');
const addPlaylist = document.getElementById('add-playlist');
const formContent = document.getElementById('form-content');
const savePlaylist = document.getElementById('form-submit');
const newNname = document.getElementById('new-playlist-name');
const newArtist= document.getElementById('new-artist-name');
const newSongs = document.getElementById('new-songs');
const searchBtn = document.querySelector('.search-icon')
const sortOptions = document.getElementById('sort-options');
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
         cards.innerHTML = `<h1> NO PLAYLIST TO DISPLAY </h1>`;

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
                    <div class = "edit">
                    <i class="fa fa-trash delete" aria-hidden="true"></i>
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
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
                
                //delete playlist
                const trashIcon = card.querySelector('.delete');
                trashIcon.addEventListener('click', (event) => {
                    event.stopPropagation();
                    Playlists.playlists = Playlists.playlists.filter(p => p.playlistID !== pl.playlistID);
                    cards.innerHTML = '';
                    loadPlaylist(Playlists);
                    
                   
                })

                //edit playlist
                const editIcon = card.querySelector('.fa-wand-magic-sparkles');
                editIcon.addEventListener('click', e => {
                    e.stopPropagation();
                    const newName = prompt('Enter new playlist name:', pl.playlist_name);
                    const newArtist = prompt('Enter new artist:', pl.playlist_creator);
                    if (newName && newName.trim() !== '') {
                        
                        pl.playlist_name = newName.trim();
                        card.querySelector('.playlist-card-title').textContent = newName.trim();
                    }

                    if (newArtist && newArtist.trim() !== '') {
                        
                        pl.playlist_creator = newArtist.trim();
                        card.querySelector('.playlist-card-creator').textContent = newArtist.trim();
                    }
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
            let currentPlaylist = Playlists;
            loadPlaylist(Playlists);

            function search(event){
                const searchKeyword = searchBox.value.trim().toLowerCase();
                if ( event.type == 'click' || event.type == 'keydown'  && event.key === 'Enter' && searchKeyword !== '') {
                    console.log("search began");
                    searchForPlaylist(Playlists, searchKeyword);
                }
            }
            searchBox.addEventListener('keydown', search);
            searchBtn.addEventListener('click',search);
            searchBox.addEventListener('input', () => {
                if (searchBox.value.trim() == ''){
                    cards.innerHTML ='';
                    loadPlaylist(Playlists);
                }
            })
            addPlaylist.addEventListener('click', () =>{
                form.style.display = "flex";
                formContent.style.display = "flex";
            });
            //add new playlists
            savePlaylist.addEventListener('click', (event) => {
                event.preventDefault();
                const name = newNname.value.trim();
                const artist = newArtist.value.trim();
                const songLines = newSongs.value.trim().split('\n');

            
                const songsArray = songLines
                    .map((line, index) => {
                        const parts = line.split(',');
                        if (parts.length < 2) return null; // skip invalid lines
                        const title = parts[0].trim();
                        const songArtist = parts[1].trim();
                        return {
                            songID: index,
                            title: title,
                            artist: songArtist,
                            album: "Unknown Album",
                            cover_art: 'https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200',
                            duration: "3:30"
                        };
                    })
                    .filter(song => song); // remove nulls

                if (name && artist && songsArray.length) {
                    let newPlaylist = {
                        playlistID: currentPlaylist.playlists.length,
                        playlist_name: name,
                        playlist_creator: artist,
                        likeCount: 0,
                        playlist_art: "./assets/img/song.png",
                        songs: songsArray
                    };

                    currentPlaylist.playlists.push(newPlaylist);
                    loadPlaylist(currentPlaylist);
                    form.style.display = "none";
                    formContent.style.display = "none";
                } else {
                    alert("Please fill in all fields and use correct song format.");
                }
            });
        //sort playlist
        sortOptions.addEventListener('change', () => {
            const sortBy = sortOptions.value;
            const sortedPlaylist = Object.values(currentPlaylist.playlists);
            console.log(sortedPlaylist); 
            if (sortBy === 'AZ'){
                sortedPlaylist.sort((a, b) => a.playlist_name.localeCompare(b.playlist_name));
                console.log('decision made');
            }else  if (sortBy === 'ZA'){
                sortedPlaylist.sort((a, b) => b.playlist_name.localeCompare(a.playlist_name));
                console.log('decision made');
            }else  if (sortBy === 'liked'){
                sortedPlaylist.sort((a, b) => b.likeCount-a.likeCount);
            }
            cards.innerHTML ='';
            loadPlaylist({playlists:sortedPlaylist});
        })


    })
}



displayPlaylist();


