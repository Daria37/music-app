let container = document.querySelector(`.albums`);

for(let i = 0; i < albums.length; i++) {
    let album = albums[i];
    container.innerHTML += `
    <div class="col-lg-3 col-sm-4">
        <a href="album.html?i=${i}" class="text-decoratin-none">
        <div class="card">
            <img src="${album.img}" alt="" class="card-image-top">
            <div class="card-body">
                <p class="card-text">
                ${album.title}
                </p>
            </div>
        </div>
        </a>
    </div>
    `
}