

// This line gets the HTML element with the id 'generateBtn' (which is our button) and assigns it to the variable 'generateBtn'.
const generateBtn = document.getElementById('generateBtn');
const sportsListContainer = document.getElementById('sports');
// This line gets the HTML element with the id 'flag' (which is our image) and assigns it to the variable 'flagImage'.
const flagImage = document.getElementById('flag');
const replayBtn = document.getElementById('replayBtn');
const solutionBtn = document.getElementById('solutionBtn');
const banner = document.getElementById('scoreBanner');
// We are using `querySelectorAll` to select all HTML elements with class "sport". 
// This returns a NodeList (which is like an array) of all matching elements. 
const sportsList = document.querySelectorAll('.sport');
// Get all elements with class="dropbtn"
var dropdowns = document.getElementsByClassName("dropbtn");
// Get the modals
var termsModal = document.getElementById("termsModal");
var privacyModal = document.getElementById("privacyModal");

// Get the buttons that open the modals
var termsBtn = document.getElementById("termsBtn");
var privacyBtn = document.getElementById("privacyBtn");

// Get the <span> elements that close the modals
var spans = document.getElementsByClassName("close");

// List of your preferred countries
const availableCountries = ['Ireland',   'France',   'New Zealand',  'South Africa', 'Scotland', 'England',  'Australia',    'Argentina',    'Wales',    'Japan',    'Georgia',  'Samoa',    'Fiji', 'Italy',    'Tonga',    'Portugal', 'Uruguay',  'United States',    'Romania',  'Spain',    'Namibia',  'Chile',    'Canada',   'Hong Kong',    'russia',   'Netherlands',  'Switzerland',  'Brazil',   'Belgium',  'South Korea',  'Zimbabwe', 'Germany',  'Kenya',    'Poland',   'Czechia',  'Ukraine',  'Colombia', 'Tunisia',  'Sweden',   'Paraguay', 'Philippines',  'Croatia',  'Uganda',   'Madagascar',   'Malta',    'Sri Lanka',    'Morocco',  'Ivory Coast',  'Mexico',   'Trinidad and Tobago',  'Lithuania',    'Malaysia', 'Cook Islands', 'Cayman Islands',   'Singapore',    'Senegal',  'Moldova',  'Guyana',   'Bulgaria', 'Latvia',   'Israel',   'United Arab Emirates', 'Kazakhstan',   'Luxembourg',   'Taiwan',   'Jamaica',  'Bermuda',  'Zambia',   'Nigeria',  'Hungary',  'Serbia',   'Finland',  'Denmark',  'Guam', 'Peru', 'Algeria',  'Botswana', 'Venezuela',    'Thailand', 'Slovenia', 'Saint Vincent and the Grenadines', 'China',    'Barbados', 'Papua New Guinea', 'Ghana',    'India',    'Austria',  'Andorra',  'Uzbekistan',   'Burkina Faso', 'Pakistan', 'Mauritius',    'Bosnia and Herzegovina',   'laos', 'Iran', 'Rwanda',   'Costa Rica',   'Niue', 'Bahamas',  'Burundi',  'Eswatini', 'Norway',   'Solomon Islands',  'Cameroon', 'Indonesia',    'Monaco',   'Greece',   'Vanuatu',  'American Samoa'];
let countriesList = [...availableCountries];
let selectedCountriesAndRankings = [];

// A variable to keep track of the current country that is selected when the "generate" button is clicked.
let currentCountry = null;
// Initialize a counter to keep track of how many sports have been clicked and a score to sum up the rankings.
let clickedSportsCount = 0;
let totalScore = 0;

// Get the switch
const countryNamesSwitch = document.getElementById('countryNamesSwitch');
const countryNameDisplay = document.getElementById('countryName'); 

countryNamesSwitch.addEventListener('change', function() {

    // If the switch is checked, show the country names, else hide them
  if (this.checked) {
    countryNameDisplay.style.display = 'block';
  } else {
    countryNameDisplay.style.display = 'none';
  }

});

// When the user clicks on the button, open the modal
termsBtn.onclick = function() {
    termsModal.style.display = "block";
}

privacyBtn.onclick = function() {
    privacyModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        termsModal.style.display = "none";
        privacyModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == termsModal) {
        termsModal.style.display = "none";
    } else if (event.target == privacyModal) {
        privacyModal.style.display = "none";
    }
}

// Loop through the dropdown buttons to toggle between hiding and showing its dropdown content
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function() {
      this.nextElementSibling.classList.toggle("show");
    });
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

// `forEach` is a function that performs a specific task (that we define) for each element in an array (or NodeList). 
// Here, for each "sport" element, we are defining an event listener.
// The `addEventListener` function allows us to specify a function (the second argument) 
// that will be run whenever a specified event (the first argument) occurs on the element.
function lightup() {

        // First, we want to make sure that no other sport is highlighted as "active". 
        // So, we remove the "active" class from all sports in our list. 
        sportsList.forEach(sport => {
            sport.classList.remove('active');
        });

        // Then, we add the "active" class to the sport that was just clicked. 
        // In CSS, we have defined that elements with the "active" class will have green text.
        // `this` inside the event listener refers to the HTML element that was clicked.
        this.classList.add('active');
        this.removeEventListener('click', arguments.callee);
    };

sportsList.forEach(sport => {
    sport.addEventListener('click', lightup);

});

// We're defining a function named generateCountry.
// This function fetches data from the RestCountries API, selects a random country from the data, and updates the 'flagImage' source URL with the flag of the selected country.
function generateCountry() {
    // The fetch function is called with the URL of the RestCountries API.
    // It returns a Promise that resolves to the Response to that request, whether it is successful or not.
    fetch('https://restcountries.com/v3.1/all')

        // The response from the fetch request is passed into the first then() method as an argument.
        // The response is read and parsed as JSON (JavaScript Object Notation).
        .then(response => response.json())

        // The JSON data from the response is passed into the second then() method as an argument.
        // A random country is selected from the data, and its name and country code are used to update 'currentCountry' and 'flagImage.src'.
        .then(data => {
            // Filter the API data to only include the countries in our predefined list.
            let filteredData = data.filter(country => countriesList.includes(country.name.common));

            // Select a random country from the filtered data.
            let randomCountry = filteredData[Math.floor(Math.random() * filteredData.length)];
            currentCountry = randomCountry.name.common;  // Update 'currentCountry' with the name of the selected country.
            countryNameDisplay.textContent = currentCountry;
            // The `filter` function is called on the 'countriesList' array.
            // 'filter' creates a new array with all elements that pass a certain condition implemented by the provided function.
            // In this case, the condition is 'country !== currentCountry', which checks if the current country in the iteration (represented by 'country') is not the same as the 'currentCountry'.
            // So, for each 'country' in the 'countriesList', if it's not equal to 'currentCountry', it's added to the new array.
            // Finally, the 'countriesList' variable is updated to be this new array, which does not include the 'currentCountry'.
            countriesList = countriesList.filter(country => country !== currentCountry);
            const countryCode = randomCountry.cca2.toLowerCase();  // Get the country code of the selected country, convert it to lowercase.
            flagImage.src = `https://flagcdn.com/${countryCode}.svg`;  // Update the 'flagImage' source URL with the flag of the selected country.
            console.log('countryCode:', countryCode);  // Log the country code for debugging purposes.

            // Here we are hiding the button after the click
                        
            generateBtn.style.display = "none";

            sportsList.forEach(sportElement => {
                const sport = sportElement.dataset.sport;
                fetch(`https://random-countries--ronangeraghty.repl.co/ranking/${currentCountry}/${sport}`)
                    .then(response => response.json())
                    .then(data => {
                        
                        
                        if (!selectedCountriesAndRankings[currentCountry]) {
                            selectedCountriesAndRankings[currentCountry] = {};
                        }
                        // Add the current sport's ranking to the selected country's rankings
                        const sportRanking = data[sport] ? data[sport] : '200';
                        selectedCountriesAndRankings[currentCountry][sport] = parseInt(sportRanking);
                        console.log(selectedCountriesAndRankings[currentCountry][sport])
                    })
                    .catch(error => console.error('An error occurred:', error)); })
   
        })

        // The catch() method is used to handle any errors that may occur while fetching or processing the data.
        .catch(error => console.error(error));
}

// An event listener is added to 'generateBtn'. When 'generateBtn' is clicked, the generateCountry function is called.
generateBtn.addEventListener('click', function() {
    generateCountry();
    flag.style.display = 'block'; // This line shows the flag image

    sportsList.forEach((sportElement) => {
        sportElement.classList.add('clickable');
        sportElement.style.display = 'block';
    });
});

replayBtn.addEventListener('click', function() {
    // Hide the replay button
    replayBtn.style.display = 'none';
    solutionBtn.style.display = 'none';
    selectedCountriesAndRankings = [];
    countriesList = [...availableCountries];
    // Reset the game state
    // This code depends on how you've structured your game, but here's an example:
    totalScore= 0;
    clickedSportsCount= 0;
    currentCountry = null;
    sportsListContainer.classList.remove('complete')
    // Hide the score banner
    scoreBanner.style.display = 'none';
    generateCountry();
    flag.style.display = 'block'; // This line shows the flag image
    solutionBtn.addEventListener('click', FindSol);
    sportsList.forEach((sportElement) => {
        sportElement.classList.add('clickable');
        sportElement.addEventListener('click', sportsrankings);
        sportElement.textContent = sportElement.dataset.sport;
        sportElement.addEventListener('click', lightup);
    })
})

function getAllPermutations(list) {
    // Base Case:
    // If the list has only one element, the only permutation of this list is the list itself.
    // So, we return an array containing this one-item list.
    if (list.length === 1) {
        return [list];
    }

    const permutations = [];  // This is where we will store all permutations of the given list.

    // We will generate permutations by removing each element from the list and generating all permutations of the remaining list.
    // We will then add the removed element to the beginning of each of these permutations.
    for (let i = 0; i < list.length; i++) {
        const currentElement = list[i];  // This is the element we are removing from the list.

        // We create a new list which is the original list without the current element.
        const remainingList = list.slice(0, i).concat(list.slice(i + 1));

        // Recursive Case:
        // We call our function recursively to get all permutations of the remaining list.
        const remainingPermutations = getAllPermutations(remainingList);

        // We add the removed element to the beginning of each permutation of the remaining list,
        // and add each of these new permutations to our list of all permutations.
        for (let perm of remainingPermutations) {
            permutations.push([currentElement].concat(perm));
        }
    }

    // Finally, we return our list of all permutations of the original list.
    return permutations;
}




function calculateSmallestScore() {
    // Get the list of all countries.
    const countries = Object.keys(selectedCountriesAndRankings);
    console.log("Countries:", countries);
    // Get the list of all sports for the first country (assuming that the same list of sports applies to all countries).
    const sports = countries.length > 0 ? Object.keys(selectedCountriesAndRankings[countries[0]]) : [];
    console.log("Sports:", sports);
    // Get all permutations of the list of sports.
    const sportPermutations = getAllPermutations(sports);
    console.log("Permutations:", sportPermutations);
    let minScore = Infinity;  // Initialize the minimum score to infinity.
    let minPermutation = null;  // Initialize the permutation which gives the minimum score to null.

    // For each permutation of sports, calculate the score when each country is assigned the corresponding sport in the permutation.
    // If the score is less than the current minimum score, update the minimum score and the corresponding permutation.
    for (let perm of sportPermutations) {
        let score = 0;  // Initialize the score for this permutation to 0.

        // For each country, add to the score the ranking of the country in the sport corresponding to the country's position in the permutation.
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];  // The current country.
            const sport = perm[i];  // The sport assigned to this country in the current permutation.
            score += selectedCountriesAndRankings[country][sport];  // Add the ranking of the country in this sport to the score.
        }

        // If the score for this permutation is less than the current minimum score, update the minimum score and the corresponding permutation.
        if (score < minScore) {
            minScore = score;
            minPermutation = perm;
            console.log(`Score for permutation ${perm}:`, score);
        }
    }

    // Print the permutation which gives the minimum score and the minimum score itself.
    console.log("Best assignment of sports to countries:", minPermutation);
    console.log("Minimum possible score:", minScore);

    // Return the minimum score.
    return minScore;
}




    
function sportsrankings() {
        // Increase the counter when a sport is clicked.The ++ means increase the value by 1
        clickedSportsCount++;
        // This line is getting the sport's name (e.g., 'Football', 'Rugby') from the 'data-sport' attribute of the sport element.
        const sport = this.dataset.sport;
        // If the 'generate' button has not been clicked and a country hasn't been selected, then we stop the function here.
        if (!currentCountry) return;  
        
        // COMMENTING OUT AS NOT WORKING If the sport element has already been clicked and it's already 'active', then we stop the function here.
        // COMMENTING OUT AS NOT WORKING if (this.classList.contains('active')) return;  
        
        // If the element has not been clicked before, we add the 'active' class to it. 
        this.classList.remove('clickable');
        console.log(`currentCountry: ${currentCountry}, sport: ${sport}`);



        // This line sends a request to the Flask application's '/ranking/<country>/<sport>' endpoint. 
        // The 'fetch' function returns a Promise that resolves to the Response to that request, whether it is successful or not.
        fetch(`https://random-countries--ronangeraghty.repl.co/ranking/${currentCountry}/${sport}`)

        // The 'then' method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
        .then(response => {
            // Log the entire response to the console. This is just for debugging purposes.
            console.log('Response:', response);

            // The 'ok' read-only property of the Response interface contains a boolean stating whether the response was successful (status in the range 200-299) or not.
            if (!response.ok) {
                // If the response was not ok, throw an error with the status.
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            // The json() method of the Body mixin takes a Response stream and reads it to completion. 
            // It returns a promise that resolves with the result of parsing the body text as JSON.
            return response.json();
        })        

        // The promise returned from the fetch function inside the event listener attached to the sports elements is chained with another then() method.
        // The JSON data from the response is passed into this then() method as an argument.
        .then(data => {
            // The text content of the sport element that was clicked is updated with the sport and its ranking.
            // If a ranking was received from the Flask application, it is used. Otherwise, 200 is used as the default ranking.
            const sportRanking = data[sport] ? data[sport] : '200';
            this.textContent = `${sport} - ${sportRanking}`;
            // Parse the sport ranking from string to integer and add it to the total score.
            totalScore += parseInt(sportRanking);
            // After updating the text content of the sport element, the generateCountry function is called to generate a new country and fetch its flag.
            if (clickedSportsCount <= 9) {
            generateCountry();}
            // Then remove the event listener so it cannot be clicked again.
            this.removeEventListener('click', arguments.callee);
            // Check if all sports have been clicked.
                if (clickedSportsCount >= 10) {
                    // If all sports have been clicked, hide the flag image.
                    flagImage.style.display = 'none';
                    // Display the total score in the banner.
                    countryNameDisplay.textContent = null;
                    
                    // Calculate the smallest possible score

                    banner.textContent = `You Scored ${totalScore}!`;
                    banner.style.display = 'block';
                    replayBtn.style.display = 'block';
                    solutionBtn.style.display ='block';
                    solutionBtn.classList.add('clickable');
                    // Move sports list to the center of the screen.
                    // Assuming you have a container for the sports list with id 'sportsListContainer'.
                    sportsListContainer.classList.add('complete')
                    this.classList.remove('active');
                    
                }

        })

        
        
        // The catch() method returns a Promise and deals with rejected cases only.
        // It behaves the same as calling Promise.prototype.then(undefined, onRejected).
        // In this case, if any error occurs during the execution of the above code, it will be caught and logged to the console.
        .catch(error => console.error('An error occurred:', error));


}




// Adding an event listener to all sports elements.
sportsList.forEach((sportElement) => {
    // The event that we're listening for is 'click'.
    sportElement.addEventListener('click', sportsrankings);
})
function FindSol()  {
    solutionBtn.classList.remove('clickable');
    this.removeEventListener('click', arguments.callee);
    let smallestScore = calculateSmallestScore()

    banner.textContent = `You Scored ${totalScore}! The smallest possible score was ${smallestScore}.`;
}

solutionBtn.addEventListener('click', FindSol)