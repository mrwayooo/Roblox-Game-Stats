const universeId = "8766666913";
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/";
const gamesDiv = document.getElementById("games");

async function fetchGame() {
  try {
    const res = await fetch(`${proxyUrl}?universeIds=${universeId}`);
    const data = await res.json();

    if (data.error) {
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const game = data.data[0];
    const thumbnailUrl = `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=420x420&format=Png&isCircular=false`;

    gamesDiv.innerHTML = `
      <div class="game-card">
        <h2>${game.name}</h2>
        <p><strong>Creator:</strong> ${game.creator.name}</p>
        <p><strong>Players:</strong> ${game.playing}</p>
        <p><strong>Visits:</strong> ${game.visits.toLocaleString()}</p>
        <img src="${thumbnailUrl}" alt="Game Thumbnail">
      </div>
    `;
  } catch (err) {
    console.error(err);
    gamesDiv.innerHTML = `<p>⚠️ Error fetching game data.</p>`;
  }
}

fetchGame();
setInterval(fetchGame, 10000);
