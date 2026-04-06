const mockupData = [
    { title: "Midnight City", artist: "M83", img: "https://images.unsplash.com/photo-1614680376593-902f7410d19f?w=600&q=80", tag: "TRENDING" },
    { title: "Blinding Lights", artist: "The Weeknd", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80", tag: "TOP 10" },
    { title: "Starboy", artist: "The Weeknd ft. Daft Punk", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80", tag: "CLASSIC" },
    { title: "Instant Crush", artist: "Daft Punk ft. Julian Casablancas", img: "https://images.unsplash.com/photo-1611005891338-724bcde662fb?w=600&q=80", tag: "MASTERPIECE" },
    { title: "Gosh", artist: "Jamie xx", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=600&q=80", tag: "EDITOR'S PICK" },
    { title: "Loud Places", artist: "Jamie xx ft. Romy", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", tag: "ESSENTIAL" }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gridContainer');
    grid.innerHTML = mockupData.map(item => `
        <article class="card">
            <div class="card-img-wrapper">
                <img src="${item.img}" alt="${item.title}" class="card-img">
                <div class="play-overlay">
                    <i data-lucide="play" fill="white"></i>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-artist">${item.artist}</p>
            </div>
            <div class="card-footer">
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
});
