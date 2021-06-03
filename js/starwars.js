// Select the 'new' button
const newThing = document.querySelector("#new-thing");
// Select the results section
const resultsSection = document.querySelector("#results-section");
// Jump to the results section and make it visible when a category card is clicked
const cards = document.querySelectorAll(".card");
// console.log(cards);
for (let card of cards) {
   card.addEventListener("click", () => {
      // Make the results section visible
      resultsSection.style.display = "block";
      // Scroll down to the results section
      resultsSection.scrollIntoView({ behavior: "smooth" });
   });
}
// Function to remove old click listeners from 'new' button
function stopListening() {
   newThing.removeEventListener("click", newPlanet);
   newThing.removeEventListener("click", newSpaceship);
   newThing.removeEventListener("click", newVehicle);
   newThing.removeEventListener("click", newPerson);
   newThing.removeEventListener("click", newFilm);
   newThing.removeEventListener("click", newSpecies);
}
// Function to check the response from an API call and then parse it into JSON if OK
function resErrOrParse(response) {
   if (!response.ok) {
      throw `Problem with the API destination! Status code: ${response.status}`;
   }
   return response.json();
}
// Function to modify URLs to HTTPS and fix mixed content error
function fixMixed(url) {
   const arr = url.split("");
   arr.splice(4, 0, "s");
   return arr.join("");
}

let count = 0;
let page = 1;
let index = 0;

// Select the results section heading fields
const thing = document.querySelector("#thing");
const thingNumber = document.querySelector("#thing-number");
const totalThings = document.querySelector("#total-things");

// Select all the heading and value elements in the results section of the page
// ONE
const headingOne = document.querySelector("#heading-1");
const valueOne = document.querySelector("#value-1");
// TWO
const headingTwo = document.querySelector("#heading-2");
const valueTwo = document.querySelector("#value-2");
// THREE
const headingThree = document.querySelector("#heading-3");
const valueThree = document.querySelector("#value-3");
// FOUR
const headingFour = document.querySelector("#heading-4");
const valueFour = document.querySelector("#value-4");
// FIVE
const headingFive = document.querySelector("#heading-5");
const valueFive = document.querySelector("#value-5");
// SIX
const headingSix = document.querySelector("#heading-6");
const valueSix = document.querySelector("#value-6");
// SEVEN
const headingSeven = document.querySelector("#heading-7");
const valueSeven = document.querySelector("#value-7");
// EIGHT
const headingEight = document.querySelector("#heading-8");
const valueEight = document.querySelector("#value-8");
// NINE
const headingNine = document.querySelector("#heading-9");
const valueNine = document.querySelector("#value-9");

// PLANETS
const swPlanet = document
   .querySelector("#planets")
   .addEventListener("click", newPlanet);

function newPlanet() {
   resultsSection.classList.add("thinking");
   let randomPlanet = 0;
   fetch("https://swapi.dev/api/planets/")
      .then(resErrOrParse)
      .then((planets) => {
         count = planets.count;
         randomPlanet = Math.floor(Math.random() * count) + 1;
         console.log("-/-/-/-/-/-/-/-/-");
         console.log(`Display planet ${randomPlanet} out of ${count}`);
         // If you return the next fetch you don't have to nest the .then() that follows it, you can chain the next then() instead of indenting it
         return fetch(`https://swapi.dev/api/planets/${randomPlanet}/`);
      })
      .then((response) => {
         if (!response.ok) {
            newPlanet();
         } else return response.json();
      })
      .then((aPlanet) => {
         console.log(aPlanet);
         // Populate the the heading
         thing.textContent = "Planet";
         thingNumber.textContent = randomPlanet;
         totalThings.textContent = count;
         // Populate the New Thing button
         stopListening();
         newThing.textContent = "New Planet";
         newThing.addEventListener("click", newPlanet);
         // populate the results table
         // ONE
         headingOne.textContent = "Name: ";
         valueOne.textContent = aPlanet.name;
         // TWO
         headingTwo.textContent = "Climate: ";
         valueTwo.textContent = aPlanet.climate;
         // THREE
         headingThree.textContent = "Surface Water: ";
         valueThree.textContent = `${aPlanet.surface_water} %`;
         // FOUR
         headingFour.textContent = "Gravity: ";
         valueFour.textContent = aPlanet.gravity;
         // FIVE
         headingFive.textContent = "Diameter: ";
         valueFive.textContent = `${aPlanet.diameter} km`;
         // SIX
         headingSix.textContent = "Terrain: ";
         valueSix.textContent = aPlanet.terrain;
         valueSix.classList.remove("boost");
         // SEVEN
         headingSeven.style.display = "initial";
         valueSeven.style.display = "initial";
         headingSeven.textContent = "Population: ";
         valueSeven.textContent = aPlanet.population;
         // EIGHT
         headingEight.style.display = "initial";
         valueEight.style.display = "initial";
         headingEight.textContent = "Orbital Period: ";
         valueEight.textContent = `${aPlanet.orbital_period} days`;
         // NINE
         headingNine.style.display = "initial";
         valueNine.style.display = "initial";
         headingNine.textContent = "Rotation Period: ";
         valueNine.textContent = `${aPlanet.rotation_period} days`;
         // Reveal results
         resultsSection.classList.remove("thinking");
      })
      .catch((error) => {
         console.log("WHOOPS!!!", error);
      });
}

// STARSHIPS
const swSpaceships = document
   .querySelector("#spaceships")
   .addEventListener("click", newSpaceship);

function newSpaceship() {
   resultsSection.classList.add("thinking");
   let randomSpaceship = 0;
   fetch("https://swapi.dev/api/starships/")
      .then(resErrOrParse)
      .then((spaceships) => {
         count = spaceships.count;
         randomSpaceship = Math.floor(Math.random() * count) + 1;
         console.log("-/-/-/-/-/-/-/-/-");
         console.log(`Display spaceship ${randomSpaceship} out of ${count}`);
         index = randomSpaceship % 10 === 0 ? 9 : (randomSpaceship % 10) - 1;
         page =
            index === 9
               ? randomSpaceship / 10
               : (randomSpaceship - (randomSpaceship % 10)) / 10 + 1;
         console.log(`Data on page ${page} / index ${index}`);
         // Load the spaceship data
         return fetch(`https://swapi.dev/api/starships/?page=${page}`);
      })
      .then((response) => {
         if (!response.ok) {
            newSpaceship();
         } else return response.json();
      })
      .then((resultsPage) => {
         console.log(resultsPage);
         const aSpaceship = resultsPage.results[index];
         // Populate the the heading
         thing.textContent = "Spaceship";
         thingNumber.textContent = randomSpaceship;
         totalThings.textContent = count;
         // Populate the New Thing button
         stopListening();
         newThing.textContent = "New Spaceship";
         newThing.addEventListener("click", newSpaceship);
         // populate the results table
         // ONE
         headingOne.textContent = "Name: ";
         valueOne.textContent = aSpaceship.name;
         // TWO
         headingTwo.textContent = "Starship Class: ";
         valueTwo.textContent = aSpaceship.starship_class;
         // THREE
         headingThree.textContent = "Model: ";
         valueThree.textContent = aSpaceship.model;
         // FOUR
         headingFour.textContent = "Passengers: ";
         valueFour.textContent = aSpaceship.passengers;
         // FIVE
         headingFive.textContent = "Length: ";
         valueFive.textContent = `${aSpaceship.length} m`;
         // SIX
         headingSix.textContent = "Cargo Capacity: ";
         valueSix.textContent = `${aSpaceship.cargo_capacity} kg`;
         valueSix.classList.remove("boost");
         // SEVEN
         headingSeven.style.display = "initial";
         valueSeven.style.display = "initial";
         headingSeven.textContent = "MGLT: ";
         valueSeven.textContent = `${aSpaceship.MGLT} Megalights`;
         // EIGHT
         headingEight.style.display = "initial";
         valueEight.style.display = "initial";
         headingEight.textContent = "Hyperdrive Rating: ";
         valueEight.textContent = aSpaceship.hyperdrive_rating;
         // NINE
         headingNine.style.display = "initial";
         valueNine.style.display = "initial";
         headingNine.textContent = "Cost: ";
         valueNine.textContent = `${aSpaceship.cost_in_credits} credits`;
         resultsSection.classList.remove("thinking");
      })
      .catch((error) => {
         console.log("WHOOPS!!!", error);
      });
}

// VEHICLES
const swVehicles = document
   .querySelector("#vehicles")
   .addEventListener("click", newVehicle);

function newVehicle() {
   resultsSection.classList.add("thinking");
   let randomVehicle = 0;
   fetch("https://swapi.dev/api/vehicles/")
      .then(resErrOrParse)
      .then((vehicles) => {
         count = vehicles.count;
         randomVehicle = Math.floor(Math.random() * count) + 1;
         console.log("-/-/-/-/-/-/-/-/-");
         console.log(`Display vehicle ${randomVehicle} out of ${count}`);

         index = randomVehicle % 10 === 0 ? 9 : (randomVehicle % 10) - 1;
         page =
            index === 9
               ? randomVehicle / 10
               : (randomVehicle - (randomVehicle % 10)) / 10 + 1;
         console.log(`Data on page ${page} / index ${index}`);
         // Load the spaceship data
         return fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
      })
      .then((response) => {
         if (!response.ok) {
            newVehicle();
         } else return response.json();
      })
      .then((resultsPage) => {
         console.log(resultsPage);
         const aVehicle = resultsPage.results[index];
         // Populate the the heading
         thing.textContent = "Vehicle";
         thingNumber.textContent = randomVehicle;
         totalThings.textContent = count;
         // Populate the New Thing button
         stopListening();
         newThing.textContent = "New Vehicle";
         newThing.addEventListener("click", newVehicle);
         // populate the results table
         // ONE
         headingOne.textContent = "Name: ";
         valueOne.textContent = aVehicle.name;
         // TWO
         headingTwo.textContent = "Manufacturer: ";
         valueTwo.textContent = aVehicle.manufacturer;
         // THREE
         headingThree.textContent = "Model: ";
         valueThree.textContent = aVehicle.model;
         // FOUR
         headingFour.textContent = "Crew: ";
         valueFour.textContent = aVehicle.crew;
         // FIVE
         headingFive.textContent = "Passengers: ";
         valueFive.textContent = aVehicle.passengers;
         // SIX
         headingSix.textContent = "Cargo Capacity: ";
         valueSix.textContent = `${aVehicle.cargo_capacity} kg`;
         valueSix.classList.remove("boost");
         // SEVEN
         headingSeven.style.display = "initial";
         valueSeven.style.display = "initial";
         headingSeven.textContent = "Max Atmosphering Speed: ";
         valueSeven.textContent = `${aVehicle.max_atmosphering_speed} kmh`;
         // EIGHT
         headingEight.style.display = "initial";
         valueEight.style.display = "initial";
         headingEight.textContent = "Length: ";
         valueEight.textContent = `${aVehicle.length} m`;
         // NINE
         headingNine.style.display = "initial";
         valueNine.style.display = "initial";
         headingNine.textContent = "Cost: ";
         valueNine.textContent = `${aVehicle.cost_in_credits} credits`;
         resultsSection.classList.remove("thinking");
      })
      .catch((error) => {
         console.log("WHOOPS!!!", error);
      });
}

// PEOPLE
const swPeople = document
   .querySelector("#people")
   .addEventListener("click", newPerson);

async function newPerson() {
   try {
      resultsSection.classList.add("thinking");
      let randomPerson = 0;
      // Load people page to find the total number of people
      const people = await axios.get("https://swapi.dev/api/people/");
      count = people.data.count;
      // and pick a random person
      randomPerson = Math.floor(Math.random() * count) + 1;
      console.log("-/-/-/-/-/-/-/-/-");
      console.log(`Display person ${randomPerson} out of ${count}`);
      index = randomPerson % 10 === 0 ? 9 : (randomPerson % 10) - 1;
      page =
         index === 9
            ? randomPerson / 10
            : (randomPerson - (randomPerson % 10)) / 10 + 1;
      console.log(`Data on page ${page} / index ${index}`);
      // Load the person data
      const findPerson = await axios.get(
         `https://swapi.dev/api/people/?page=${page}`
      );
      console.log(findPerson);
      let aPerson = findPerson.data.results[index];
      // Load the homeworld name
      let homeName;
      if (aPerson.homeworld) {
         const newURL = fixMixed(aPerson.homeworld);
         const home = await axios.get(newURL);
         homeName = home.data.name;
      }
      // Load the species name
      let speciesName;
      if (aPerson.species[0]) {
         const newURL = fixMixed(aPerson.species[0]);
         const species = await axios.get(newURL);
         speciesName = species.data.name;
      }
      // Populate the the heading
      thing.textContent = "Person";
      thingNumber.textContent = randomPerson;
      totalThings.textContent = count;
      // Populate the New Thing button
      stopListening();
      newThing.textContent = "New Person";
      newThing.addEventListener("click", newPerson);
      // populate the results table
      // ONE
      headingOne.textContent = "Name: ";
      valueOne.textContent = aPerson.name;
      // TWO
      headingTwo.textContent = "Homeworld: ";
      valueTwo.textContent = homeName;
      // THREE
      headingThree.textContent = "Species: ";
      valueThree.textContent = speciesName;
      // FOUR
      headingFour.textContent = "Birth Year: ";
      valueFour.textContent = aPerson.birth_year;
      // FIVE
      headingFive.textContent = "Mass: ";
      valueFive.textContent = `${aPerson.mass} kg`;
      // SIX
      headingSix.textContent = "Gender: ";
      valueSix.textContent = aPerson.gender;
      valueSix.classList.remove("boost");
      // SEVEN
      headingSeven.style.display = "initial";
      valueSeven.style.display = "initial";
      headingSeven.textContent = "Hair Colour: ";
      valueSeven.textContent = aPerson.hair_color;
      // EIGHT
      headingEight.style.display = "initial";
      valueEight.style.display = "initial";
      headingEight.textContent = "Skin Colour: ";
      valueEight.textContent = aPerson.skin_color;
      // NINE
      headingNine.style.display = "initial";
      valueNine.style.display = "initial";
      headingNine.textContent = "Eye Colour: ";
      valueNine.textContent = aPerson.eye_color;
      resultsSection.classList.remove("thinking");
   } catch (error) {
      console.log("This error occured when retrieving a person:", error);
   }
}

// FILMS
const swFilms = document
   .querySelector("#films")
   .addEventListener("click", newFilm);

async function newFilm() {
   try {
      resultsSection.classList.add("thinking");
      let randomFilm = 0;
      // Load films page to find the total number of films
      const films = await axios.get("https://swapi.dev/api/films/");
      count = films.data.count;
      // and pick a random film
      randomFilm = Math.floor(Math.random() * count) + 1;
      console.log("-/-/-/-/-/-/-/-/-");
      console.log(`Display film ${randomFilm} out of ${count}`);
      index = randomFilm % 10 === 0 ? 9 : (randomFilm % 10) - 1;
      page =
         index === 9
            ? randomFilm / 10
            : (randomFilm - (randomFilm % 10)) / 10 + 1;
      console.log(`Data on page ${page} / index ${index}`);
      // Load the film data
      const findFilm = await axios.get(
         `https://swapi.dev/api/films/?page=${page}`
      );
      console.log(findFilm);
      let aFilm = findFilm.data.results[index];
      // Populate the the heading
      thing.textContent = "Film";
      thingNumber.textContent = randomFilm;
      totalThings.textContent = count;
      // Populate the New Thing button
      stopListening();
      newThing.textContent = "New Film";
      newThing.addEventListener("click", newFilm);
      // populate the results table
      // ONE
      headingOne.textContent = "Episode: ";
      valueOne.textContent = aFilm.episode_id;
      // TWO
      headingTwo.textContent = "Title: ";
      valueTwo.textContent = aFilm.title;
      // THREE
      headingThree.textContent = "Release Date: ";
      valueThree.textContent = aFilm.release_date;
      // FOUR
      headingFour.textContent = "Director: ";
      valueFour.textContent = aFilm.director;
      // FIVE
      headingFive.textContent = "Producer: ";
      valueFive.textContent = aFilm.producer;
      // SIX
      headingSix.textContent = "Opening Crawl: ";
      valueSix.innerHTML = `<br> ${aFilm.opening_crawl}`;
      valueSix.classList.add("boost");
      // SEVEN
      headingSeven.style.display = "none";
      valueSeven.style.display = "none";
      // EIGHT
      headingEight.style.display = "none";
      valueEight.style.display = "none";
      // NINE
      headingNine.style.display = "none";
      valueNine.style.display = "none";
      resultsSection.classList.remove("thinking");
   } catch (error) {
      console.log("This error occured when retrieving a film:", error);
   }
}

// SPECIES
const swSpecies = document
   .querySelector("#species")
   .addEventListener("click", newSpecies);

async function newSpecies() {
   try {
      resultsSection.classList.add("thinking");
      let randomSpecies = 0;
      // Load species page to find the total number of species
      const species = await axios.get("https://swapi.dev/api/species/");
      count = species.data.count;
      // and pick a random species
      randomSpecies = Math.floor(Math.random() * count) + 1;
      console.log("-/-/-/-/-/-/-/-/-");
      console.log(`Display species ${randomSpecies} out of ${count}`);
      index = randomSpecies % 10 === 0 ? 9 : (randomSpecies % 10) - 1;
      page =
         index === 9
            ? randomSpecies / 10
            : (randomSpecies - (randomSpecies % 10)) / 10 + 1;
      console.log(`Data on page ${page} / index ${index}`);
      // Load the species data
      const findSpecies = await axios.get(
         `https://swapi.dev/api/species/?page=${page}`
      );
      console.log(findSpecies);
      let aSpecies = findSpecies.data.results[index];
      // Load the homeworld name
      let homeName;
      if (aSpecies.homeworld) {
         const newURL = fixMixed(aSpecies.homeworld);
         const home = await axios.get(newURL);
         homeName = home.data.name;
      }
      // Populate the the heading
      thing.textContent = "Species";
      thingNumber.textContent = randomSpecies;
      totalThings.textContent = count;
      // Populate the New Thing button
      stopListening();
      newThing.textContent = "New Species";
      newThing.addEventListener("click", newSpecies);
      // populate the results table
      // ONE
      headingOne.textContent = "Name: ";
      valueOne.textContent = aSpecies.name;
      // TWO
      headingTwo.textContent = "Classification: ";
      valueTwo.textContent = aSpecies.classification;
      // THREE
      headingThree.textContent = "Designation: ";
      valueThree.textContent = aSpecies.designation;
      // FOUR
      headingFour.textContent = "Homeworld: ";
      valueFour.textContent = homeName;
      // FIVE
      headingFive.textContent = "Language: ";
      valueFive.textContent = aSpecies.language;
      // SIX
      headingSix.textContent = "Average Lifespan: ";
      valueSix.textContent = `${aSpecies.average_lifespan} years`;
      valueSix.classList.remove("boost");
      // SEVEN
      headingSeven.style.display = "initial";
      valueSeven.style.display = "initial";
      headingSeven.textContent = "Average Height: ";
      valueSeven.textContent = `${aSpecies.average_height} cm`;

      // EIGHT
      headingEight.style.display = "initial";
      valueEight.style.display = "initial";
      headingEight.textContent = "Eye Colours: ";
      valueEight.textContent = aSpecies.eye_colors;
      // NINE
      headingNine.style.display = "initial";
      valueNine.style.display = "initial";
      headingNine.textContent = "Skin Colours: ";
      valueNine.textContent = aSpecies.skin_colors;
      resultsSection.classList.remove("thinking");
   } catch (error) {
      console.log("This error occured when retrieving a species:", error);
   }
}
