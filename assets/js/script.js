/* Base url for CoinGecko = ('api.coingecko.com/api/v3');
CoinGecko for searchbar = ('/search')
found on ('https://www.coingecko.com/api/documentations/v3') and ('https://www.coingecko.com/en/api/documentation');
can also be found on ('https://rapidapi.com/coingecko/api/coingecko/');

Base url for CoinRanking = ('https://api.coinranking.com/v2');
cURL for searchbar = ('curl https://api.coinranking.com/v2/search-suggestions?query=bitco \
-H 'x-access-token: your-api-key' \
-G');
found on ('https://developers.coinranking.com/api/documentation');
can also be found on ('https://rapidapi.com/Coinranking/api/coinranking1/');
API KEY -- coinranking3c29bda109d4290191bea7abecd0074bfe38d5634e0e6830

cURL for CoinMarketCap = ('curl -H "X-CMC_PRO_API_KEY: b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
Want to get latest data here? = ('https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest');
found on ('https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide');
can also be found on ('https://rapidapi.com/zakutynsky/api/CoinMarketCap/');

Binance seems to have alot of utility, the problem I encounterd is that in order to use the API
you need a Binance account and a corresponding AuthKey to actually get data */
var idNameEl = document.querySelector("#name0");
var idPriceEl = document.querySelector("#price0");
var idImgEl = document.querySelector("#img0");
var idNameEl = document.querySelector("#name1");
var idPriceEl = document.querySelector("#price1");
var idImgEl = document.querySelector("#img1");
var idNameEl = document.querySelector("#name2");
var idPriceEl = document.querySelector("#price2");
var idImgEl = document.querySelector("#img2");
var idNameEl = document.querySelector("#name3");
var idPriceEl = document.querySelector("#price3");
var idImgEl = document.querySelector("#img3");
var idNameEl = document.querySelector("#name4");
var idPriceEl = document.querySelector("#price4");
var idImgEl = document.querySelector("#img4");
var idNameEl = document.querySelector("#name5");
var idPriceEl = document.querySelector("#price5");
var idImgEl = document.querySelector("#img5");
var idNameEl = document.querySelector("#name6");
var idPriceEl = document.querySelector("#price6");
var idImgEl = document.querySelector("#img6");
var idNameEl = document.querySelector("#name7");
var idPriceEl = document.querySelector("#price7");
var idImgEl = document.querySelector("#img7");

var getMainIndex = function () {

    var apiUrl = "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=price&orderDirection=desc&limit=8&offset=0";

    fetch(apiUrl, {
        "method": "GET",
        "headers": {
            "x-access-key": "3c29bda109d4290191bea7abecd0074bfe38d5634e0e6830",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": "f112fe985emsh7fd3ffcf23a79fbp14c66djsnd4ab259a0c95"
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(function (cryptoInfo) {
            displayMainIndex(cryptoInfo.data.coins);
        });
    };
    
    //adds commas to the current price
    function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
};

var displayMainIndex = function (data) {
    console.log(data);
    var numberBeauty = Math.floor(data[0].price);
    idNameEl.textContent = data[0].name;
    idPriceEl.textContent = separator(numberBeauty);
    idImgEl.setAttribute("src", data[0].iconUrl);
    
    /* for (var i = 0; i < data.length; i++) {
    console.log(data[i].iconUrl);
    console.log(data[i].name);
    console.log(data[i].price);
    } */
};
getMainIndex();





/* previously used code that may be useful for the future */

/* seanArr went beow displaymainindex on line 63
 const seanArr = []
seanArr.push(cryptoInfo.data.coins[i]);
}
/*console.log(seanArr);
(seanArr).forEach(function (coin) {
console.log(coin)
}) */


/* for (var i = 0; i < data.length; i++) {
    //Creating a h3 element and a p element
    var userName = document.createElement('h3');
    var userUrl = document.createElement('p');

    //Setting the text of the h3 element and p element.
    userName.textContent = data[i].login;
    userUrl.textContent = data[i].url;

    //Appending the dynamically generated html to the div associated with the id="users"
    //Append will attach the element as the bottom most child.
    usersContainer.append(userName);
    usersContainer.append(userUrl);
  }; */

/* let coinPrice = cryptoInfo.data.coins[i].price;
let coinIcon = cryptoInfo.data.coins[i].iconUrl;
let coinRank = cryptoInfo.data.coins[i].rank; */