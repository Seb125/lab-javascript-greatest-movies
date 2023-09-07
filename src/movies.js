// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let mapDirectors = moviesArray.map(movie => [movie.director, movie]);
  let uniqueDirectors = new Map(mapDirectors).values();
  let uniqueDirectorsArray = [...uniqueDirectors];

  console.log(uniqueDirectorsArray.map(movie => movie.director));
  return uniqueDirectorsArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const spielbergDramas = moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes('Drama'));
    return spielbergDramas.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) return 0;
    const totalScore = moviesArray.filter(movie => typeof movie.score === "number").reduce(function (sum, movie) {
     return sum + movie.score;
    }, 0);
   return (Math.round((totalScore/moviesArray.length)*100))/100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return scoresAverage(moviesArray.filter(movie => movie.genre.includes("Drama")));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let myCopy = JSON.parse(JSON.stringify(moviesArray));
    myCopy.sort(function (movieA,movieB) {
    if (movieA.year > movieB.year) return 1;
    if (movieA.year < movieB.year) return -1;
    
    if (movieA.title > movieB.title) return 1;
    if (movieA.title < movieB.title) return -1;
    
  })
  
    return myCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let myCopy = JSON.parse(JSON.stringify(moviesArray));
    myCopy.sort(function (a,b) {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
        }); 
    myCopyOnlyTitle = myCopy.map(a => a.title);
    return myCopyOnlyTitle.slice(0,20);
    
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  
    let timeMinutes = moviesArray.map(movie => {
        let durationArray = movie.duration.replace(/[min,h]/g,'').split(" ");
        const minutes = durationArray[1] === undefined ? 0 : Number(durationArray[1]);
        const totalMinutes = Number(durationArray[0])*60 +  minutes;
        return {...movie, 'duration': totalMinutes};
      });
      return timeMinutes;
  
  }
// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;
    let allYears = [];
    for (let i = 0; i < moviesArray.length; i++) {
      if (!allYears.includes(moviesArray[i].year)) {
        allYears.push(moviesArray[i].year);
      }
    }
    let averageScores = [];
    allYears.forEach(year => {
      let moviesOneYear = moviesArray.filter(movie => movie.year === year);
      const averageScore = scoresAverage(moviesOneYear);
      averageScores.push({'year': year, 'avg': averageScore});
    });
  
    averageScores.sort(function (a,b) {
      if (a.avg > b.avg) return -1;
      if (a.avg < b.avg) return 1;

      if (a.year > b.year) return 1;
      if (a.year < b.year) return -1;
    });
    return `The best year was ${averageScores[0].year} with an average score of ${averageScores[0].avg}`;
  };
