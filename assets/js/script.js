var coinFormEl = document.querySelector("#coin-form");
var coinInputEl = document.querySelector("#coin-name");
var typedContainerEl = document.querySelector("#typed-container");
var savedCoinsContainerEl = document.querySelector("#saved-coins-container");
var clearButtonEl = document.querySelector("#clear-button");
var tasks = [];

//saves the tasks variable to the local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//gets items from local storage
var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);

    //local storage is empty this creates an empty array
    if (!tasks) {
        tasks = [];
    }
    //grabs each item in the array and sends it to my button maker
    for (var i = 0; i < tasks.length; i++) {
        displaySavedCoinButton(tasks[i]);
    }
};

//takes the typed in info
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var coinTyped = coinInputEl.value.trim();
    var coinName = coinTyped.toLowerCase();
    // console.log(coinName);

    if (coinName) {
        getTypedCoinData(coinName);
        //clears the input field
        coinInputEl.value = "";
        typedContainerEl.textContent = "";
        // descriptionContainerEl.textContent = "";
    } else {
        alert("Please enter a valid Crypto Currency.");
    }
};

//goes to the api to get the coins info by Coin Name and adds to the history.
var getTypedCoinData = function (coin) {
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coin;

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data.id);
                    for (var i = 0; i < tasks.length; i++) {
                        if (data.id === tasks[i]) {
                            console.log(coin);
                            getFeaturedCoinData(coin);
                            return;
                        }
                    }
                    //calls function to display info
                    typedCoinDisplay(data);
                    //caal function to display the save button
                    displaySavedCoinButton(data.id);
                    //pushes the lowercased name to the tasks array
                    tasks.push(data.id);
                    //calls the function to save the array to local storage
                    saveTasks();
                });
            } else {
                alert("Please enter a valid Crypto Currency." + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to CoinGecko");
        });
};

////gets coin data by name when clicked from history.  Does not add to history.
var getFeaturedCoinData = function (coin) {
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coin;

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // console.log(response);
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    typedCoinDisplay(data);
                });
            } else {
                alert("Please enter a valid Crypto Currency." + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to CoinGecko");
        });
};

//displays the saved coin button
var displaySavedCoinButton = function (coin) {
    // console.log(coin);
    //creates the coin button
    var coinEl = document.createElement("button");
    coinEl.setAttribute("data-coin", coin);
    coinEl.classList = "btn";
    coinEl.textContent = coin;

    //add the button to the HTML
    savedCoinsContainerEl.appendChild(coinEl);
};

//when you click a saved button
var buttonClickHandler = function (event) {
    // get the coin attribute from the clicked element
    var coin = event.target.getAttribute("data-coin");
    // console.log(coin);

    if (coin) {
        //calls the function to get the data without adding to history
        getFeaturedCoinData(coin);

        // clear old content
        typedContainerEl.textContent = "";
    }
};

//display the fetched data to the HTML
var typedCoinDisplay = function (coinData) {
    var numb = coinData.market_data.current_price.usd;
    var numby = coinData.developer_data.subscribers;

    //create a div to store searched data
    var firstCardEl = document.createElement("div");
    firstCardEl.classList = "card-section";
    //card name and image
    var nameEl = document.createElement("h5");
    nameEl.classList = "card-title";
    nameEl.textContent = coinData.name + " ";
    firstCardEl.appendChild(nameEl);
    //add image just after the name
    var iconEl = document.createElement("img");
    iconEl.setAttribute("src", coinData.image.thumb);
    nameEl.append(iconEl);
    //show current price
    var priceEl = document.createElement("h6");
    priceEl.classList = "card-text";
    priceEl.textContent = "Current Price: $" + separator(numb);
    firstCardEl.appendChild(priceEl);
    //show liquidity score
    var liquidityEl = document.createElement("h6");
    liquidityEl.classList = "card-text";
    liquidityEl.textContent = "Liquidity Score: " + coinData.liquidity_score;
    firstCardEl.appendChild(liquidityEl);
    //gets the community score
    var communityEl = document.createElement("h6");
    communityEl.classList = "card-text";
    communityEl.textContent = "Community Score: " + coinData.community_score;
    firstCardEl.appendChild(communityEl);
    //get the coinGecko ranking
    var geckoScoreEl = document.createElement("h6");
    geckoScoreEl.classList = "card-text";
    geckoScoreEl.textContent = "Coin Gecko Score: " + coinData.coingecko_score;
    firstCardEl.appendChild(geckoScoreEl);
    //coinGecko Rank
    var geckoRankEl = document.createElement("h6");
    geckoRankEl.classList = "card-text";
    geckoRankEl.textContent = "Coin Gecko Rank: #" + coinData.coingecko_rank;
    firstCardEl.appendChild(geckoRankEl);
    //subscribers
    var subscribersEl = document.createElement("h6");
    subscribersEl.classList = "card-text";
    subscribersEl.textContent = "Number of Subscribers: " + separator(numby);
    firstCardEl.appendChild(subscribersEl);

    //adds this to the HTML
    typedContainerEl.appendChild(firstCardEl);
};

//kole fetch request for main data
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

//kole main display function and for loop
var displayMainIndex = function (data) {
    
    for (var i = 0; i < data.length; i++) {
        var forName = "#name" + [i];
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

var clearAllCoins = function(event){
    console.log("hey there buddy");
    savedCoinsContainerEl.textContent = "";
    tasks = [];
    saveTasks();
};

//Kole main display call
getMainIndex();

//the call to load from local storage
loadTasks();

//listens to see what coin was typed in
coinFormEl.addEventListener("submit", formSubmitHandler);

//listen to see if a city history button has been clicked
savedCoinsContainerEl.addEventListener("click", buttonClickHandler);

//listen to see if the clear button is clicked
clearButtonEl.addEventListener("click", clearAllCoins);