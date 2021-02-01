

// Foursquare API Info
const clientId = 'GSIJC2ZVV2VUW0ZEHNLVWUVHL1V5GZNV3BHZAIZCT52BRJ52';
const clientSecret = 'XBQXVVMU0XI1NDLFAFRQ4GIGGUNJ521LGXMQ0MXJ3FMCZEA3';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '58987793e21dd4fa8186eb6f886114c9';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6"), $("#venue7"), $("#venue8"), $("#venue9"), $("#venue10")];
const $weatherDiv = $("#weather1");
const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];

// Add AJAX functions here:
const getVenues = async() => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210117`;
  try {
   const response = await fetch(urlToFetch);
    if(response.ok) {
        const jsonResponse = await response.json();
        const venues = jsonResponse.response.groups[0].items.map(location => location.venue);
        return venues;
    }
  }
  catch(error) {
    console.log(error)
  }
}

const getForecast = async() => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
  try{
     const response = await fetch(urlToFetch);
      console.log(response);
     if(response.ok){
       const jsonResponse = await response.json();
       console.log(jsonResponse);
       return jsonResponse;
     }
  }
  catch(error){
    console.log(error)
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const newIndex = index + 1;
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, newIndex);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
