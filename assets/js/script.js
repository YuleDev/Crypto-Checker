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
    
    for (var i = 0; i < data.length; i++) {
        var forName = "#name" + [i];
        console.log(forName);
        var nameElement = document.querySelector(forName);
        nameElement.textContent = data[i].name;
        
        var forPrice = "#price" + [i];
        var priceElement = document.querySelector(forPrice);
        priceElement.textContent = data[i].price;
        
        var forIcon = "#img" + [i];
        var imgElement = document.querySelector(forIcon);
        imgElement.setAttribute("src", data[i].iconUrl);

        var numberBeauty = Math.floor(data[i].price);
        priceElement.textContent = separator(numberBeauty);
    }
};

getMainIndex();
