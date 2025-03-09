import fetch from 'node-fetch';

const SOLAR_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "williamsto@uia.no";
const GAME_API = "https://spacescavanger.onrender.com/";

(async function() {
    try {
      const startUrl = `${GAME_API}start?player=${encodeURIComponent(playerId)}`;
      const startResponse = await fetch(startUrl);
      const startData = await startResponse.json();
      console.log("Challenge started:", startData);

const sunResponse = await fetch(`${SOLAR_API}bodies/soleil`);
      const sunData = await sunResponse.json();
      console.log("sun data:", sunData);

    }catch (error) {
        console.error("Error:", error);
      }
})();