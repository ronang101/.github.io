
const generateBtn = document.getElementById('generateBtn');
const sportsListContainer = document.getElementById('sports');
const flagImage = document.getElementById('flag');
const solutionBtn = document.getElementById('solutionBtn');
const ShareBtn = document.getElementById('ShareBtn');
const banner = document.getElementById('scoreBanner');
const sportsList = document.querySelectorAll('.sport');
const viewstats = document.getElementById('viewstats');
// Get all elements with class="dropbtn"
var dropdowns = document.getElementsByClassName("dropbtn");
// Get the modals
var termsModal = document.getElementById("termsModal");
var privacyModal = document.getElementById("privacyModal");
var InstructionsModal = document.getElementById("InstructionsModal")
var setmodal = document.getElementById("settingsModal");
var setmodalcontent = document.getElementById("set-modal-content");
// Get the buttons that open the modals
var termsBtn = document.getElementById("termsBtn");
var privacyBtn = document.getElementById("privacyBtn");
var setbtn = document.getElementById("settingsBtn");
var Show_Instructions = document.getElementById("Show_Instructions");
// Get the <span> elements that close the modals
var spans = document.getElementsByClassName("close");
const availableCountries = ['Ireland',   'France',   'New Zealand',  'South Africa', 'Scotland', 'England',  'Australia',    'Argentina',    'Wales',    'Japan',    'Georgia',  'Samoa',    'Fiji', 'Italy',    'Tonga',    'Portugal', 'Uruguay',  'United States',    'Romania',  'Spain',    'Namibia',  'Chile',    'Canada',   'Hong Kong',    'russia',   'Netherlands',  'Switzerland',  'Brazil',   'Belgium',  'South Korea',  'Zimbabwe', 'Germany',  'Kenya',    'Poland',   'Czechia',  'Ukraine',  'Colombia', 'Tunisia',  'Sweden',   'Paraguay', 'Philippines',  'Croatia',  'Uganda',   'Madagascar',   'Malta',    'Sri Lanka',    'Morocco',  'Ivory Coast',  'Mexico',   'Trinidad and Tobago',  'Lithuania',    'Malaysia', 'Cook Islands', 'Cayman Islands',   'Singapore',    'Senegal',  'Moldova',  'Guyana',   'Bulgaria', 'Latvia',   'Israel',   'United Arab Emirates', 'Kazakhstan',   'Luxembourg',   'Taiwan',   'Jamaica',  'Bermuda',  'Zambia',   'Nigeria',  'Hungary',  'Serbia',   'Finland',  'Denmark',  'Guam', 'Peru', 'Algeria',  'Botswana', 'Venezuela',    'Thailand', 'Slovenia', 'Saint Vincent and the Grenadines', 'China',    'Barbados', 'Papua New Guinea', 'Ghana',    'India',    'Austria',  'Andorra',  'Uzbekistan',   'Burkina Faso', 'Pakistan', 'Mauritius',    'Bosnia and Herzegovina',   'laos', 'Iran', 'Rwanda',   'Costa Rica',   'Niue', 'Bahamas',  'Burundi',  'Eswatini', 'Norway',   'Solomon Islands',  'Cameroon', 'Indonesia',    'Monaco',   'Greece',   'Vanuatu',  'American Samoa'];

let countriesList = [...availableCountries];
let selectedCountriesAndRankings = [];
let currentCountry = null;
let clickedSportsCount = 0;
let totalScore = 0;
let currentCountryIndex = 0;
let dailycountriesList =[]
let randomizer = 1


const twohundh3 = document.getElementById('twohund');
const minscoreh3 = document.getElementById('minscore');
const dailystreak = document.getElementById('dailystreak');
const histogramContainer = document.getElementById('histogram');
const Hist_Modal = document.getElementById('Hist_Modal');
const closeButton_hist = document.querySelector('.close-button-hist');
closeButton_hist.onclick = function() {
    console.log("Clicked")
    Hist_Modal.style.display = "none";
}
console.log("Close button:", closeButton_hist);
console.log("Modal:", Hist_Modal);


// We first get the current date and time.
const now = new Date();
// Then we calculate the time of the next midnight.
// We create a new Date object for the next day and set the time to 00:00:00.
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

// We calculate the number of milliseconds until the next midnight by subtracting the current time from the midnight time.
const msTillMidnight = midnight.getTime() - now.getTime();

// We set a timer that will execute a function after a specified number of milliseconds. 
// This function will remove the 'lastPlayed' item from the localStorage, effectively resetting the game for the next day.
setTimeout(() => {
    localStorage.removeItem('lastPlayed');
}, msTillMidnight);

// Get the switch
const countryNamesSwitch = document.getElementById('countryNamesSwitch');
const countryNameDisplay = document.getElementById('countryName'); 

countryNamesSwitch.addEventListener('change', function() {

    // If the switch is checked, show the country names, else hide them
  if (this.checked) {
    countryNameDisplay.style.display = 'none';
  } else {
    countryNameDisplay.style.display = 'block';
  }

});

// When the user clicks on the button, open the modal
termsBtn.onclick = function() {
    termsModal.style.display = "block";
}

privacyBtn.onclick = function() {
    privacyModal.style.display = "block";
}

setbtn.onclick = function() {
    setmodal.style.display = "block";
  }
Show_Instructions.onclick = function() {
    InstructionsModal.style.display = "block";
}

let closeButton = document.querySelector('.close-button');
closeButton.onclick = function() {
    setmodal.style.display = "none";
}
let instructionButton = document.querySelector('.close-instructions');
instructionButton.onclick = function() {
    InstructionsModal.style.display = "none";
}
  
// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        termsModal.style.display = "none";
        privacyModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
//FIX THIS I THINK THE PROBLEM IS THAT THE MODEL TAKES THE WHOLE SCREEN
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

function lightup() {

        sportsList.forEach(sport => {
            sport.classList.remove('active');
        });

        this.classList.add('active');
        this.removeEventListener('click', arguments.callee);
    };

sportsList.forEach(sport => {
    sport.addEventListener('click', lightup);

});



function getDailyCountry() {
    // Check if there is a country to process
    if (currentCountryIndex < dailycountriesList.length) {
        // Fetch all countries
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Filter countries by the current country from our list
                let filteredData = data.filter(country => country.name.common === dailycountriesList[currentCountryIndex]);
                
                // Check if the country was found
                if (filteredData.length > 0) {
                    let currentCountryData = filteredData[0];
                    currentCountry = currentCountryData.name.common;
                    // Set the country name
                    countryNameDisplay.textContent = currentCountry;
                    // Get the country code and set the flag image
                    const countryCode = currentCountryData.cca2.toLowerCase();
                    flagImage.src = `https://flagcdn.com/${countryCode}.svg`;

                    // Increment the index for the next invocation
                    currentCountryIndex++;
                }
                else {
                    console.error('Country not found:', dailycountriesList[currentCountryIndex]);
                }
            })
            .catch(error => console.error(error));
    }
    else {
        console.log('No more countries to process.');
        // Optional: reset the index to start over
        // currentCountryIndex = 0;
    }
}




generateBtn.addEventListener('click', async function() {
    try {
        const response = await fetch('https://https://daily-ronangeraghty.replit.app/api/countries');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        dailycountriesList = await response.json();
        console.log(dailycountriesList.length);
        generateBtn.style.display = "none";
        getDailyCountry();

        flag.style.display = 'block';

        sportsList.forEach((sportElement) => {
            sportElement.classList.add('clickable');
            sportElement.style.display = 'flex';
            sportsListContainer.style.display = 'flex';
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});






    
function sportsrankings() {
        clickedSportsCount++;
        const sport = this.dataset.sport;
        if (!currentCountry) return;  
        

        this.classList.remove('clickable');
        console.log(`currentCountry: ${currentCountry}, sport: ${sport}`);


        fetch(`https://random-countries-ronangeraghty.replit.app/ranking/${currentCountry}/${sport}`)

        .then(response => {
            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            return response.json();
        })        

        .then(data => {
            const sportRanking = data[sport] ? data[sport] : '200';
            this.textContent = `${sport} - ${sportRanking}`;
            totalScore += parseInt(sportRanking);
            if (clickedSportsCount <= 9) {
            getDailyCountry();}
            this.removeEventListener('click', arguments.callee);
                if (clickedSportsCount >= 10) {
                    flagImage.style.display = 'none';
                    countryNameDisplay.textContent = null;

                    banner.textContent = `You Scored ${totalScore}!`;
                    banner.style.display = 'flex';
                    solutionBtn.style.display ='block';
                    solutionBtn.classList.add('clickable');
                    sportsListContainer.classList.add('complete')
                    this.classList.remove('active');
                    // The localStorage API provides a way to store data between browser sessions. 
                    // Here we are setting an item in the localStorage with the key 'lastPlayed'.
                    // The value of this item is a stringified JSON object which contains the date when the user played the game and their score.
                    // new Date().toDateString() generates a string representation of the current date in the format "Thu Jul 07 2023".
                    let currentDate = new Date().toDateString()
                    let yesterdayDate = new Date();
                    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
                    yesterdayDate = yesterdayDate.toDateString()
                    localStorage.setItem('lastPlayed', JSON.stringify({
                        date: new Date().toDateString(), // this will return the date in the format "Thu Jul 07 2023"
                        score: totalScore
                    }));
                    let MinScore;
                    let stats = JSON.parse(localStorage.getItem('stats')) || [0,0,0,0]
                    fetch('https://https://daily-ronangeraghty.replit.app/api/scores')
                        .then(response => response.json())
                        .then(data => {
                            MinScore = parseInt(data.minScore);
                            console.log(`${MinScore}${totalScore}`)
                            if (totalScore < 200){
                                stats[0] += 1
                            }
                            if (totalScore == MinScore){
                                stats[1] += 1
                            }
                            if (stats[3] == yesterdayDate){
                                stats[3] = currentDate
                                stats[2] +=1
                            }
                            else {
                                stats[3] = currentDate
                                stats[2] =1
                            }
                            console.log(`${stats}`)
                            localStorage.setItem('stats', JSON.stringify(stats));
                            let scores = JSON.parse(localStorage.getItem('pastScores')) || [];
                            scores.push(totalScore);
                            localStorage.setItem('pastScores', JSON.stringify(scores));
                            renderHistogram(scores, stats)
                            ShareBtn.addEventListener('click', Sharebutton(scores))
                        })

                }

        })

    
        .catch(error => console.error('An error occurred:', error));


}



sportsList.forEach((sportElement) => {
    sportElement.addEventListener('click', sportsrankings);
})
    
solutionBtn.addEventListener('click', function() {
    this.removeEventListener('click', arguments.callee);
    solutionBtn.classList.remove('clickable');
    fetch('https://https://daily-ronangeraghty.replit.app/api/scores')
        .then(response => response.json())
        .then(data => {
            let smallestScore = data.minScore;
            banner.innerHTML = `<div class="score">You Scored ${totalScore}!</div><div class="smallest-score">The smallest possible score was ${smallestScore}.</div>`;
            sportsList.forEach((sportElement) => {
                sportElement.textContent = `${sportElement.dataset.sport} - ${data.Optimal[sportElement.dataset.sport]}`;})
        })
        .catch(error => console.error('An error occurred:', error));
    solutionBtn.style.display = 'none'
});



// We retrieve the 'lastPlayed' item from the localStorage.
// Because we stored this item as a stringified JSON object, we need to parse it back into an object.
const lastPlayed = JSON.parse(localStorage.getItem('lastPlayed'));
// We check if the 'lastPlayed' item exists and if its date property is equal to today's date.
if (lastPlayed && lastPlayed.date === new Date().toDateString()) {
    // If this condition is true, then the user has already played the game today. 
    // We show their previous score and disable the game.
    // User has already played today. Show the score from the last game and disable the game.
    fetch('https://https://daily-ronangeraghty.replit.app/api/scores')
        .then(response => response.json())
        .then(data => {
            let smallestScore = data.minScore;
            banner.innerHTML = `<div class="score">You Scored ${lastPlayed.score}!</div><div class="smallest-score">The smallest possible score was ${smallestScore}.</div>`;
        })
    banner.style.display = 'flex';

    // Disable the game here
    generateBtn.style.display = 'none';
    sportsListContainer.classList.add('complete');
} else {
    // User hasn't played today. Enable the game.
    banner.style.display = 'none';
    
    // Enable the game here
    generateBtn.style.display = 'block';
    sportsListContainer.classList.remove('complete');
}

function renderHistogram(scores, stats) {
    console.log(`${scores}`)
    // Get the histogram container

    let ranges = [
        { min: 0, max: 200, count: 0 },
        { min: 201, max: 400, count: 0 },
        { min: 401, max: 600, count: 0 },
        { min: 601, max: 800, count: 0 },
        { min: 801, max: Infinity, count: 0 }
    ];
    // Clear any previous bars
    histogramContainer.innerHTML = '';
    if (twohundh3.lastChild.className === 'stats-text') {
        twohundh3.removeChild(twohundh3.lastChild);
    }
    if (minscoreh3.lastChild.className === 'stats-text') {
        minscoreh3.removeChild(minscoreh3.lastChild);
    }
    if (dailystreak.lastChild.className === 'stats-text') {
        dailystreak.removeChild(dailystreak.lastChild);
    }
    // For each score, create a bar and append it to the histogram
    scores.forEach(score => {
        for (let range of ranges) {
            if (score >= range.min && score <= range.max) {
                range.count++;
                
                break;
            }
        }
    });

    // For each range, create a bar based on its count and append it to the histogram
    ranges.forEach(range => {
        let bar = document.createElement('div');
        bar.style.width = '10%'
        bar.className = 'bar';
        
        // Create a div for the range text
        let rangeText = document.createElement('div');
        rangeText.className = 'range-text';
        if (range.min == 801) {
            rangeText.textContent = '★☆☆☆☆';
        } else if (range.min == 601) {
            rangeText.textContent = '★★☆☆☆';
        } else if (range.min == 401) {
            rangeText.textContent = '★★★☆☆';
        } else if (range.min == 201) {
            rangeText.textContent = '★★★★☆';
        } else {
            rangeText.textContent = '★★★★★';
        }
        bar.appendChild(rangeText);

        // Create a div for the count within the range
        let countText = document.createElement('div');
        countText.className = 'count-text';
        countText.textContent = range.count;
        bar.appendChild(countText);
        histogramContainer.appendChild(bar);

    });
    let twohundtext = document.createElement('div');
    let minscoretext = document.createElement('div');
    let dailystreaktext = document.createElement('div');
    twohundtext.className = 'stats-text';
    minscoretext.className = 'stats-text';
    dailystreaktext.className = 'stats-text';
    twohundtext.textContent = `${stats[0]}`;
    minscoretext.textContent = `${stats[1]}`;
    dailystreaktext.textContent = `${stats[2]}`;
    twohundh3.appendChild(twohundtext)
    minscoreh3.appendChild(minscoretext)
    dailystreak.appendChild(dailystreaktext)
    Hist_Modal.style.display = "block"
    histogramContainer.offsetHeight;
    ranges.forEach((range, index) => {
        const bar = histogramContainer.children[index];
        bar.style.width = `${10 + (range.count / scores.length) * 90}%`;
    });

}







const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
function Sharebutton(scores) {
    return function(){
            let scoretext;
        if (scores.length == 0){
            scoretext = 'X'
        }
        else if (scores[scores.length-1] <= 200) {
            scoretext = '★★★★★';
        } else if (scores[scores.length-1] <= 400) {
            scoretext = '★★★★☆';
        } else if (scores[scores.length-1] <= 600) {
            scoretext = '★★★☆☆';
        } else if (scores[scores.length-1] <= 800) {
            scoretext = '★★☆☆☆';
        } else {
            scoretext = '★☆☆☆☆';
        }
        const shareData = {
            title: '',
            text: 'Flagogories:\n' + scoretext,
            url: 'http://flagogories.com/Daily.html',
        };
        if (navigator.share && isMobile) {
            // Mobile sharing
            navigator.share(shareData)
        } else {
            // Desktop clipboard copy
            const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
            navigator.clipboard.writeText(textToCopy);
        }}
};

viewstats.onclick = function() {
    let stats = JSON.parse(localStorage.getItem('stats'))
    let scores = JSON.parse(localStorage.getItem('pastScores')) || [];
    renderHistogram(scores, stats)
    ShareBtn.addEventListener('click', Sharebutton(scores))

}