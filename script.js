const grid = document.getElementById("hangarGrid");

const playlistPage = document.getElementById("playlistPage");

const playlistTitle = document.getElementById("playlistTitle");

const songList = document.getElementById("songList");

const hangars = document.getElementById("hangars");

const backButton = document.getElementById("backButton");

Object.keys(playlists).forEach(key=>{

    const p = playlists[key];

    const card = document.createElement("div");

    card.className="hangar";

    card.innerHTML=`

        <h3>${p.title}</h3>

        <p>${p.description}</p>

        <br>

        ${p.songs.length} songs

    `;

    card.onclick=()=>showPlaylist(key);

    grid.appendChild(card);

});

function showPlaylist(key){

    hangars.style.display="none";

    playlistPage.style.display="block";

    const p = playlists[key];

    playlistTitle.innerHTML=p.title;

    songList.innerHTML="";

    p.songs.forEach(song=>{

        const card=document.createElement("div");

        card.className="songCard";

        card.innerHTML=`

        <div class="songInfo">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

        </div>

        <button class="playButton">

            Play

        </button>

        `;

        card.querySelector("button").onclick=()=>{

            window.open(song.link,"_blank");

        }

        songList.appendChild(card);

    });

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

backButton.onclick=()=>{

    playlistPage.style.display="none";

    hangars.style.display="block";

};

const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
    document.getElementById("hangars").scrollIntoView({
        behavior: "smooth"
    });
});
