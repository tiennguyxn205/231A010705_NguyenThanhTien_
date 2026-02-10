const movies = [
  {id:1,title:"Avatar",year:2009,rating:4.8,genres:["Phiêu lưu"],poster:"pt1.jpg",desc:"Hành tinh Pandora kỳ vĩ."},
  {id:2,title:"Transformers",year:2017,rating:4.5,genres:["Hành động"],poster:"pt2.jpg",desc:"Cuộc chiến robot."},
  {id:3,title:"World War Z",year:2013,rating:4.6,genres:["Kinh dị"],poster:"pt6.webp",desc:"Đại dịch zombie."},
  {id:4,title:"Tìm Xác",year:2025,rating:4.2,genres:["Kinh dị"],poster:"pt3.jpeg",desc:"Hành trình rùng rợn."},
  {id:5,title:"Thiên Đường Máu",year:2025,rating:4.4,genres:["Hành động"],poster:"pt4.jpg",desc:"Thế giới ngầm."},
  {id:6,title:"Điều Ước Cuối Cùng",year:2025,rating:4.0,genres:["Tình cảm"],poster:"pt5.jpg",desc:"Câu chuyện xúc động."}
];

const box = document.getElementById("movies");
const genres = document.getElementById("genres");
const genresM = document.getElementById("genresMobile");
const search = document.getElementById("search");
const searchM = document.getElementById("searchMobile");

let selected = new Set();
let keyword = "";
let currentMovie = null;

/* RENDER MOVIES */
function render(list){
  box.innerHTML = "";
  list.forEach(m=>{
    box.innerHTML += `
      <div class="movie-card" onclick="openModal(${m.id})">
        <img src="${m.poster}">
        <div class="play-btn">
          <button onclick="event.stopPropagation();watchMovie(${m.id})">
            ▶ Xem ngay
          </button>
        </div>
        <div class="movie-info">
          <strong>${m.title}</strong> (${m.year})
          <div class="rating">⭐ ${m.rating}</div>
          <div>${m.genres.join(", ")}</div>
        </div>
      </div>
    `;
  });
}

/* GENRES */
const allGenres = new Set();
movies.forEach(m=>m.genres.forEach(g=>allGenres.add(g)));

allGenres.forEach(g=>{
  const html = `<label><input type="checkbox" value="${g}"> ${g}</label>`;
  genres.innerHTML += html;
  genresM.innerHTML += html;
});

document.querySelectorAll("input[type=checkbox]").forEach(cb=>{
  cb.onchange = ()=>{
    cb.checked ? selected.add(cb.value) : selected.delete(cb.value);
    filterMovies();
  };
});

/* FILTER */
function filterMovies(){
  let result = movies;

  if(selected.size){
    result = result.filter(m => m.genres.some(g => selected.has(g)));
  }

  if(keyword){
    result = result.filter(m => m.title.toLowerCase().includes(keyword));
  }

  render(result);
}

/* SEARCH */
let timer;
[search, searchM].forEach(inp=>{
  inp.oninput = e=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      keyword = e.target.value.toLowerCase();
      filterMovies();
    },400);
  };
});

/* MODAL */
function openModal(id){
  currentMovie = movies.find(m => m.id === id);
  modal.style.display = "flex";
  modalImg.src = currentMovie.poster;
  modalTitle.innerText = currentMovie.title;
  modalMeta.innerText =
    `📅 ${currentMovie.year} | ⭐ ${currentMovie.rating} | 🎭 ${currentMovie.genres.join(", ")}`;
  modalDesc.innerText = currentMovie.desc;
}

function closeModal(){
  modal.style.display = "none";
}

function watchFromModal(){
  watchMovie(currentMovie.id);
}

/* NAVIGATION */
function watchMovie(id){
  location.href = `watch.html?id=${id}`;
}

/* UI */
function toggleTheme(){
  const html = document.documentElement;
  html.setAttribute(
    "data-theme",
    html.getAttribute("data-theme") === "dark" ? "light" : "dark"
  );
}

function toggleSidebar(){
  sidebar.classList.toggle("active");
  document.querySelector(".overlay").classList.toggle("active");
}

/* INIT */
render(movies);
