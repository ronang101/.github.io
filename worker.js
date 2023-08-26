
function* getAllPermutations(list) {
    if (list.length === 1) {
        yield list;
    } else {
        for (let i = 0; i < list.length; i++) {
            const currentElement = list[i];
            const remainingList = list.slice(0, i).concat(list.slice(i + 1));
            for (let perm of getAllPermutations(remainingList)) {
                yield [currentElement].concat(perm);
            }
        }
    }
}
function calculateSmallestScore(selectedCountriesAndRankings) {
    // Get the list of all countries.
    const countries = Object.keys(selectedCountriesAndRankings);

    // Get the list of all sports for the first country (assuming that the same list of sports applies to all countries).
    const sports = countries.length > 0 ? Object.keys(selectedCountriesAndRankings[countries[0]]) : [];

    // Get all permutations of the list of sports.
    const sportPermutations = getAllPermutations(sports);
    let minPermutation = null;
    let minScore = Infinity;  // Initialize the minimum score to infinity.
    let minpermmap = {};

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
        }
    }
    

    for (let i = 0; i < minPermutation.length; i++) {
        minpermmap[minPermutation[i]] = countries[i];
    }

    // Print the permutation which gives the minimum score and the minimum score itself.

    // Return the minimum score.
    return { minScore, minpermmap};
}

self.addEventListener('message', function(e) {
    const selectedCountriesAndRankings = e.data.selectedCountriesAndRankings;
    // Assume calculateSmallestScore is defined or imported here
    const results = calculateSmallestScore(selectedCountriesAndRankings);
    self.postMessage(results);
}, false);