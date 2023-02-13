let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
console.log(i);

let album = albums[i];

if(!album){
    container.innerHTML = `ОШИБКА  редирект на главную страницу через 5 секунд`
    setTimeout(() => {
        window.location.pathname = `index.html`
    }, 5000);
}else {
    container.innerHTML = `
        <div class="card mb-md-3">
        <div class="row">
            <div class="col-12 col-sm-4">
                <img src="${album.img}" alt="" 
             class="left-container-img img-fluid rounded-start-md-1 p-sm-4 p-md-0 rounded-sm-100" />
            </div>
            <div class="col-12 col-sm-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                </div>
            </div>
        </div>
    </div>
`

    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;

    for(let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img class="img-play me-3" src="assets/play.png" alt="" height="30px">
            <img class="img-pause me-3 d-none"src="assets/pause.png" alt="" height="30px">
            <div>
                <div>${track.title}</div>
                <div class="text-secondary">${track.author}</div>
            </div>
            <div class="container-progress">
                <div class="progress-inner">
                <div class="progress"></div>
                </div>
            </div>
            <div class="time ms-auto">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>
                    `
    }

    function setupAudio() {
        let trackNodes = document.querySelectorAll(`.track`); 
        for (let i = 0; i < trackNodes.length; i++) { 
            let track = tracks[i];
            let node = trackNodes[i];
            let timeNode = node.querySelector(`.time`);
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`);
            let progress = node.querySelector(`.progress`);
            let audio = node.querySelector(`.audio`); 

            node.addEventListener(`click`, function () {
                if (track.isPlaying) {
                    track.isPlaying = false;
                    audio.pause();
                    imgPause.classList.add(`d-none`);
                    imgPlay.classList.remove(`d-none`);
                } else {
                    track.isPlaying = true;
                    audio.play();
                    imgPause.classList.remove(`d-none`);
                    imgPlay.classList.add(`d-none`);
                    
                    updateProgress();
                }
            });
            function updateProgress() {
                let time = getTime(audio.currentTime);
                if(timeNode.innerHTML != time){
                    timeNode.innerHTML = time;
                    progress.style.width = (audio.currentTime * 100) / audio.duration + '%';
                }
                if (track.isPlaying) {
                      requestAnimationFrame(updateProgress);
                }
                
              }
        }
    }
    setupAudio()

    function getTime(time) {
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds / 60);
        let seconds = Math.floor(currentSeconds % 60);

        if(minutes < 10){
            minutes = `0` + minutes;
        }
        if(seconds < 10){
            seconds = `0` + seconds;
        }
        return `${minutes}:${seconds}`
    }
}