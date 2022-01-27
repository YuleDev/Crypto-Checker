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

        const seanArr = []
        for (var i = 0; i < cryptoInfo.data.coins.length; i++) {
            seanArr.push(cryptoInfo.data.coins[i]);
        }
        console.log(seanArr);
        (seanArr).forEach(function (coin) {
        console.log(coin)
        })
    });

/* let coinPrice = cryptoInfo.data.coins[i].price;
let coinIcon = cryptoInfo.data.coins[i].iconUrl;
let coinRank = cryptoInfo.data.coins[i].rank; */


/* grab each coin 0-8 out of the array
have each coin only show the data of: name, price, iconUrl
have the coins descend from price
have the coins append or fill text to each card based on ID */