/* Base url for CoinGecko = ('api.coingecko.com/api/v3'');
CoinGecko for searchbar = ('/search')
found on ('https://www.coingecko.com/api/documentations/v3') and ('https://www.coingecko.com/en/api/documentation');
can also be found on ('https://rapidapi.com/coingecko/api/coingecko/');

Base url for CoinRanking = ('https://api.coinranking.com/v2');
cURL for searchbar = ('curl https://api.coinranking.com/v2/search-suggestions?query=bitco \
-H 'x-access-token: your-api-key' \
-G');
found on ('https://developers.coinranking.com/api/documentation');
can also be found on ('https://rapidapi.com/Coinranking/api/coinranking1/');

cURL for CoinMarketCap = ('curl -H "X-CMC_PRO_API_KEY: b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
Want to get latest data here? = ('https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest');
found on ('https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide');
can also be found on ('https://rapidapi.com/zakutynsky/api/CoinMarketCap/');

Binance seems to have alot of utility, the problem I encounterd is that in order to use the API
you need a Binance account and a corresponding AuthKey to actually get data */
var coinFormEl = document.querySelector("#coin-form");
var coinInputEl = document.querySelector("#coin-name");
var tasks = [];

//takes the typed in info
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var coinName = coinInputEl.value.trim();
    // console.log(coinName);

    if (coinName) {
        getTypedCoinData(coinName);
        //clears the input field
        coinInputEl.value = "";
        // typedCoinContainerEl.textContent = "";

    }
    else {
        alert("Please enter a valid Crypto Currency.");
    }
};


//FETCH FUNC for the fetch request for the data for the 16 cards pass data into 


//FETCH FUNC for the search bar

var getTypedCoinData = function (coin) {
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coin;

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {   
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    typedCoinDisplay(data);
                });
            }
            else {
                alert("Please enter a valid Crypto Currency." + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to CoinGecko");
        });
};


//DISPLAY FETCH FUNC to display the images by recieving fetched data

var typedCoinDisplay = function(coinData) {
    console.log(coinData);
    console.log("Name: " + coinData.name);
    console.log(coinData.image.thumb);
    console.log("Liquidity Score: " + coinData.liquidity_score);
    console.log("Total Supply: " + coinData.market_data.total_supply);
    console.log("Current Price: " + coinData.market_data.current_price.usd);
    console.log(coinData.description.en);      
};








//CALL FETCH FUNC to a function on page load to fetch the 16 cards
// getTypedCoinData("bitcoin");

coinFormEl.addEventListener("submit", formSubmitHandler);