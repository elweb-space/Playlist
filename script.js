const grid = document.getElementById("hangarGrid");

Object.keys(playlists).forEach(key => {

    const playlist = playlists[key];

    const hangar = document.createElement("div");

    hangar.className = "hangar";

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

        card.className = "songCard";

        card.innerHTML = `
            <div class="songInfo">

                    <div class="crate">
                        📦
                    </div>
                
                    <div>
                
                        <h3>${song.title}</h3>
                
                        <p>${song.artist}</p>
                
                    </div>
                
                </div>
                
                <button class="playButton">
                
                    🛩 Dispatch
                
                </button>
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>

            <button class="playButton">
                Play
            </button>
        `;

        card.querySelector("button").onclick = (e) => {

            e.stopPropagation();

            flyDroneTo(card,()=>{

                window.open(song.link,"_blank");

            });

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

        const song=allSongs[Math.floor(Math.random()*allSongs.length)];

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

    });

};
