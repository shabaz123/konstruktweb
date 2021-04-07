// Select the 'new' button
const newThing = document.querySelector("#new-thing");
// Select the results section
const resultsSection = document.querySelector("#results-section");
// Jump to the results section and make it visible when a category card is clicked
const cards = document.querySelectorAll(".card");
console.log(cards);
for (let card of cards) {
   card.addEventListener("click", () => {
      // Make the results section visible
      resultsSection.style.display = "block";
      // jump to the results section
      resultsSection.scrollIntoView({ behavior: "smooth" });
   });
}

// PLANETS
const swPlanet = document.querySelector("#planets");
swPlanet.addEventListener("click", newPlanet);

function newPlanet() {
   fetch("https://swapi.dev/api/planets/")
      .then((response) => {
         if (!response.ok) {
            throw "Problem with the API destination!";
         }
         return response.json();
      })
      .then((planets) => {
         const count = planets.count;
         console.log(`Total available planets: ${count}`);
         const randomPlanet = Math.floor(Math.random() * count) + 1;
         console.log(`Details for planet number: ${randomPlanet}`);
         fetch(`https://swapi.dev/api/planets/${randomPlanet}/`)
            .then((response) => response.json())
            .then((aPlanet) => {
               console.log(aPlanet);
               // Populate the the heading
               const thing = document.querySelector("#thing");
               thing.textContent = "Planet";
               const thingNumber = document.querySelector("#thing-number");
               thingNumber.textContent = `${randomPlanet}`;
               const totalThings = document.querySelector("#total-things");
               totalThings.textContent = `${count}`;
               // Polulate the New Thing button
               newThing.textContent = "New Planet";
               newThing.addEventListener("click", newPlanet);
               // populate the data table
               // ONE
               const headingOne = document.querySelector("#heading-1");
               const valueOne = document.querySelector("#value-1");
               headingOne.textContent = "Name: ";
               valueOne.textContent = `${aPlanet.name}`;
               // TWO
               const headingTwo = document.querySelector("#heading-2");
               const valueTwo = document.querySelector("#value-2");
               headingTwo.textContent = "Climate: ";
               valueTwo.textContent = `${aPlanet.climate}`;
               // THREE
               const headingThree = document.querySelector("#heading-3");
               const valueThree = document.querySelector("#value-3");
               headingThree.textContent = "Surface Water: ";
               valueThree.textContent = `${aPlanet.surface_water} %`;
               // FOUR
               const headingFour = document.querySelector("#heading-4");
               const valueFour = document.querySelector("#value-4");
               headingFour.textContent = "Gravity: ";
               valueFour.textContent = `${aPlanet.gravity}`;
               // FIVE
               const headingFive = document.querySelector("#heading-5");
               const valueFive = document.querySelector("#value-5");
               headingFive.textContent = "Diameter: ";
               valueFive.textContent = `${aPlanet.diameter} km`;
               // SIX
               const headingSix = document.querySelector("#heading-6");
               const valueSix = document.querySelector("#value-6");
               headingSix.textContent = "Terrain: ";
               valueSix.textContent = `${aPlanet.terrain}`;
               // SEVEN
               const headingSeven = document.querySelector("#heading-7");
               const valueSeven = document.querySelector("#value-7");
               headingSeven.textContent = "Population: ";
               valueSeven.textContent = `${aPlanet.population}`;
               // EIGHT
               const headingEight = document.querySelector("#heading-8");
               const valueEight = document.querySelector("#value-8");
               headingEight.textContent = "Orbital Period: ";
               valueEight.textContent = `${aPlanet.orbital_period} days`;
               // NINE
               const headingNine = document.querySelector("#heading-9");
               const valueNine = document.querySelector("#value-9");
               headingNine.textContent = "Rotation Period: ";
               valueNine.textContent = `${aPlanet.rotation_period} days`;
            });
      })
      .catch((error) => {
         console.log("WHOOPS!!!", error);
      });
}

// REST OF THE CATEGORIES:
const swSpaceships = document.querySelector("#spaceships");
swSpaceships.addEventListener("click", () =>
   alert("You clicked the SPACESHIPS category!")
);

const swVehicles = document.querySelector("#vehicles");
swVehicles.addEventListener("click", () =>
   alert("You clicked the VEHICLES category!")
);

const swPeople = document.querySelector("#people");
swPeople.addEventListener("click", () =>
   alert("You clicked the PEOPLE category!")
);

const swFilms = document.querySelector("#films");
swFilms.addEventListener("click", () =>
   alert("You clicked the FILMS category!")
);

const swSpecies = document.querySelector("#species");
swSpecies.addEventListener("click", () =>
   alert("You clicked the SPECIES category!")
);
