const DB = {
    "Discover": [
        { id: 1, title: "Midnight City", artist: "M83", img: "https://images.unsplash.com/photo-1614680376593-902f7410d19f?w=600&q=80", tag: "TRENDING" },
        { id: 2, title: "Blinding Lights", artist: "The Weeknd", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80", tag: "TOP 10" },
        { id: 3, title: "Starboy", artist: "The Weeknd ft. Daft Punk", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80", tag: "CLASSIC" },
        { id: 4, title: "Instant Crush", artist: "Daft Punk ft. Julian Casablancas", img: "https://images.unsplash.com/photo-1611005891338-724bcde662fb?w=600&q=80", tag: "MASTERPIECE" },
        { id: 10, title: "Limit to Your Love", artist: "James Blake", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", tag: "SOULFUL" }
    ],
    "Global Top 50": [
        { id: 5, title: "Gosh", artist: "Jamie xx", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=600&q=80", tag: "EDITOR'S PICK" },
        { id: 6, title: "Loud Places", artist: "Jamie xx ft. Romy", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", tag: "ESSENTIAL" },
        { id: 7, title: "Vibe Check Peak", artist: "Various Artists", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", tag: "RANK 1" }
    ],
    "New Releases": [
        { id: 8, title: "Neon Horizon", artist: "Synthwave Alpha", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80", tag: "PREMIERE" },
        { id: 9, title: "Cyber Dreams", artist: "Future Funk", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", tag: "FRESH" }
    ]
};

let currentTab = "Discover";
let currentSearch = "";
let isPlaying = false;
let progressInterval = null;
let progressPercent = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    renderGrid();

    // 2. Tab Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            const textContent = item.querySelector('span') ? item.querySelector('span').innerText : item.innerText;
            currentTab = textContent.trim();
            renderGrid();
        });
    });

    // 3. Search Logic
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderGrid();
    });

    // 4. Player Controls
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.addEventListener('click', togglePlay);
});

function renderGrid() {
    const grid = document.getElementById('gridContainer');
    let data = DB[currentTab] || [];
    
    // Filter by search
    if (currentSearch) {
        data = Object.values(DB).flat().filter(item => 
            item.title.toLowerCase().includes(currentSearch) || 
            item.artist.toLowerCase().includes(currentSearch)
        );
    }

    if(data.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-muted); padding: 2rem;">No tracks found.</div>`;
        return;
    }

    grid.innerHTML = data.map(item => `
        <article class="card" onclick="playTrack(${item.id})">
            <div class="card-img-wrapper">
                <img src="${item.img}" alt="${item.title}" class="card-img">
                <div class="play-overlay">
                    <i data-lucide="play" fill="white" stroke="none"></i>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-artist">${item.artist}</p>
            </div>
            <div class="card-footer" onclick="event.stopPropagation()">
                <div class="card-tag">
                    <i data-lucide="hash" class="icon-small"></i>
                    <span>${item.tag}</span>
                </div>
                <button class="btn-like" onclick="this.classList.toggle('active')">
                    <i data-lucide="heart" class="icon-small"></i>
                </button>
            </div>
        </article>
    `).join('');
    
    lucide.createIcons();
}

// Player Logic
function playTrack(id) {
    const track = Object.values(DB).flat().find(t => t.id === id);
    if (!track) return;

    // Show player bar
    const playerBar = document.getElementById('playerBar');
    playerBar.classList.add('active');

    // Update info
    document.getElementById('playerImg').src = track.img;
    document.getElementById('playerTitle').innerText = track.title;
    document.getElementById('playerArtist').innerText = track.artist;

    // Adjust progress safely
    isPlaying = false;
    progressPercent = 0;
    document.getElementById('progressFill').style.width = '0%';
    document.querySelector('.time-current').innerText = '0:00';
    togglePlay();
}

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    const timeCurrent = document.querySelector('.time-current');
    
    if (isPlaying) {
        btn.innerHTML = '<i data-lucide="pause" fill="#000" color="#000\"></i>';
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            progressPercent += 0.5;
            if (progressPercent >= 100) progressPercent = 0;
            document.getElementById('progressFill').style.width = progressPercent + '%';
            
            // update fake time 
            let maxSeconds = 225; // 3:45
            let currentSeconds = Math.floor((progressPercent / 100) * maxSeconds);
            let mins = Math.floor(currentSeconds / 60);
            let secs = currentSeconds % 60;
            timeCurrent.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
        }, 500);
    } else {
        btn.innerHTML = '<i data-lucide="play" fill="#000" color="#000\"></i>';
        clearInterval(progressInterval);
    }
    lucide.createIcons();
}
