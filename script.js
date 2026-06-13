const grid = document.getElementById("hangarGrid");

Object.keys(playlists).forEach(key => {

    const playlist = playlists[key];

    const hangar = document.createElement("div");

    hangar.className = "hangar";
    
    hangar.dataset.playlist = key;
    
    hangar.innerHTML = `
        <h3>${playlist.title}</h3>
        <p>${playlist.description}</p>

        <br>

        ${playlist.songs.length} songs

        <div class="songContainer"></div>
    `;

    const container = hangar.querySelector(".songContainer");

    playlist.songs.forEach(song => {

        const card = document.createElement("div");
        
        card.id = `${key}-${song.title.replace(/\s+/g, "-")}`;
        
        card.className = "songCard";

        card.innerHTML = `
            <div class="songInfo">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
        
            <button class="playButton">
                ▶ Play
            </button>
        `;

        card.querySelector("button").onclick = (e) => {
        
            e.stopPropagation();
        
            window.open(song.link, "_blank");
        
        };

        container.appendChild(card);

    });

    hangar.onclick = () => {

        // Close every other hangar
        document.querySelectorAll(".hangar").forEach(h => {

            if (h !== hangar) {

                h.classList.remove("open");

                h.querySelector(".songContainer").style.display = "none";

            }

        });

        // Toggle current one
        if (container.style.display === "block") {

            container.style.display = "none";

            hangar.classList.remove("open");

        }
        else {

            container.style.display = "block";

            hangar.classList.add("open");

        }

    };

    grid.appendChild(hangar);

});

const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {

    document.getElementById("hangars").scrollIntoView({

        behavior: "smooth"

    });

});

const drone = document.getElementById("drone");

function flyDroneTo(element, callback){

    const rect = element.getBoundingClientRect();

    drone.style.left = rect.left + "px";

    drone.style.top = rect.top - 40 + "px";

    setTimeout(callback,2000);

}

const missionButton=document.getElementById("missionButton");

const cargos=document.querySelectorAll(".cargo");

const result=document.getElementById("missionResult");

missionButton.onclick=()=>{

    cargos.forEach(c=>c.classList.remove("selected"));

    const cargo=cargos[Math.floor(Math.random()*cargos.length)];

    cargo.classList.add("selected");

    flyDroneTo(cargo,()=>{

        let allSongs=[];

        Object.values(playlists).forEach(p=>{

            allSongs=allSongs.concat(p.songs);

        });

        const playlistKeys = Object.keys(playlists);

        let chosenPlaylist = null;
        let chosenSong = null;
        
        while (!chosenSong) {
        
            const key = playlistKeys[Math.floor(Math.random() * playlistKeys.length)];
        
            const playlist = playlists[key];
        
            if (playlist.songs.length > 0) {
        
                chosenPlaylist = key;
        
                chosenSong = playlist.songs[Math.floor(Math.random() * playlist.songs.length)];
        
            }
        
        }

        result.innerHTML=`

        🚁 Delivery Complete

        <br><br>

        <strong>${song.title}</strong>

        <br>

        ${song.artist}

        <br><br>

        <button onclick="window.open('${song.link}','_blank')">

        Play Song

        </button>

        `;

            setTimeout(() => {

            // Open the correct hangar
            document.querySelectorAll(".hangar").forEach(h => {
    
                const container = h.querySelector(".songContainer");
    
                if (h.dataset.playlist === chosenPlaylist) {
    
                    h.classList.add("open");
                    container.style.display = "block";
    
                } else {
    
                    h.classList.remove("open");
                    container.style.display = "none";
    
                }
    
            });
    
            // Scroll to the selected song
            const card = document.getElementById(
                `${chosenPlaylist}-${chosenSong.title.replace(/\s+/g, "-")}`
            );
    
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    
            card.classList.add("selectedSong");
    
            setTimeout(() => {
                card.classList.remove("selectedSong");
            }, 3000);
    
        }, 800);

    });

};
