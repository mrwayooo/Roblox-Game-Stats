const universeIds = ["8766666913"];
const gamesDiv = document.getElementById("games");

async function fetchGames() {
  const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIds.join(",")}`);
  const data = await res.json();

  gamesDiv.innerHTML = ""; // เคลียร์ก่อน
  data.data.forEach(game => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${game.name}</h2>
      <p>Players: ${game.playing}</p>
      <img src="${game.thumbnailUrl}" width="200">
    `;
    gamesDiv.appendChild(div);
  });
}

fetchGames();
setInterval(fetchGames, 5000);
