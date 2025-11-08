const universeId = "8766666913"; // ของคุณ
const apiUrl = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
const gamesContainer = document.getElementById("games");

async function fetchGame() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const game = data.data[0];

    if (!game) {
      gamesContainer.innerHTML = `<p>Game not found.</p>`;
      return;
    }

    const thumbUrl = `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${game.rootPlaceId}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`;

    const thumbRes = await fetch(thumbUrl);
    const thumbData = await thumbRes.json();
    const imageUrl = thumbData.data[0]?.imageUrl || "";

    gamesContainer.innerHTML = `
      <div class="game-card">
        <h3>${game.name}</h3>
        <p>👤 Creator: ${game.creator.name}</p>
        <img src="${imageUrl}" alt="${game.name}">
        <p>Visits: ${game.visits.toLocaleString()}</p>
        <p>Players: ${game.playing}</p>
        <a class="play-btn" href="https://www.roblox.com/games/${game.rootPlaceId}" target="_blank">▶ Play on Roblox</a>
      </div>
    `;
  } catch (err) {
    console.error("Error fetching game:", err);
    gamesContainer.innerHTML = `<p>Error loading game data.</p>`;
  }
}

fetchGame();
