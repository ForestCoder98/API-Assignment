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

      //Task 1:

const sunResponse = await fetch(`${SOLAR_API}bodies/sun`);
      const sunData = await sunResponse.json();
      console.log("sun data:", sunData);

      const sunEquaRadius = sunData.equaRadius;
      const sunMeanRadius = sunData.meanRadius;
      const Code = sunEquaRadius - sunMeanRadius;

      const answerResponse = await fetch(`${GAME_API}answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: Code, player: playerId })
      });

      const answerData = await answerResponse.json();
        console.log("Answer response:", answerData);

      //Task 2:

        const earthResponse = await fetch(`${SOLAR_API}bodies/earth`);
    const earthData = await earthResponse.json();
    const earthAxialTilt = earthData.axialTilt;
    console.log("Earth's axial tilt:", earthAxialTilt);

    const allBodiesResponse = await fetch(`${SOLAR_API}bodies/`);
    const allBodiesData = await allBodiesResponse.json();

    let closestPlanet = null;
    let smallestDifference = Infinity;

    allBodiesData.bodies.forEach(body => {
        if (body.isPlanet && body.axialTilt !== undefined && body.axialTilt != earthAxialTilt) {
            let difference = Math.abs(body.axialTilt - earthAxialTilt);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestPlanet = body;
            }
        }
    });

    console.log("Closest planet:", closestPlanet.englishName);

    const answerResponse2 = await fetch(`${GAME_API}answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: closestPlanet.englishName, player: playerId }),
    });
    
    const answerData2 = await answerResponse2.json();
    console.log("Answer response:", answerData2);

    //Task 3:

    let shortestDayPlanet = null;
    let shortestDay = Infinity;

    allBodiesData.bodies.forEach((body) => {
      if (body.isPlanet && typeof body.sideralRotation === "number") {
        let shortestPossibleDay = Math.abs(body.sideralRotation)
        if (shortestPossibleDay < shortestDay) {
          shortestDay = shortestPossibleDay;
          shortestDayPlanet = body.englishName;
        }
      }
    });

    console.log("shortest day planet:", shortestDayPlanet);

    const answerResponse3 = await fetch(`${GAME_API}answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: shortestDayPlanet, player: playerId }),
    });

    const answerData3 = await answerResponse3.json();
    console.log("Answer response:", answerData3);

    //Task 4:

    const jupiterResponse = await fetch(`${SOLAR_API}bodies/jupiter`);
    const jupiterData = await jupiterResponse.json();
    const jupiterMoonCount = jupiterData.moons.length;

    console.log("Jupiter's moons: ", jupiterMoonCount);

    const answerResponse4 = await fetch(`${GAME_API}answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: jupiterMoonCount, player: playerId }),
    });
    const answerData4 = await answerResponse4.json();
    console.log("Answer response:", answerData4);

    //Task 5:

    

    }catch (error) {
        console.error("Error:", error);
      }
})();