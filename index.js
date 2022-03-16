const xhttp = new XMLHttpRequest();
const coinsArray = ['bitcoin', 'ethereum', 'ripple', 'avaterra', 'solana', 'cardano', 'polkadot', 'avalanche-2', 'dogecoin', 'shiba-inu', 'matic-network'];
const chooseCoin = document.getElementById('chooseCoin');
const predictPrice = document.getElementById('predictPriceButton');
console.log(predictPrice);
let selectedCoin;
chooseCoin.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('my_dataviz').innerHTML = '';
    var select = document.getElementsByTagName('select')[0];
    var value = select.options[select.selectedIndex].value;
    selectedCoin = value;
    if (selectedCoin !== 'Choose a coin from Menu') {
        var dataSet = anychart.data.set(getData(data[value]));
        var seriesData = dataSet.mapAs({ x: 0, value: 1 });
        var chart = anychart.line();
        var lineChart = chart.line(seriesData);
        chart.container('my_dataviz');
        chart.draw();
    }
});

predictPrice.addEventListener('click', (e) => {
    console.log('clicked');
    if (selectedCoin && selectedCoin !== 'Choose a coin from Menu') {
        let coinData = getData(data[selectedCoin]);
        const difference = coinData[coinData.length -2][1] - coinData[coinData.length -1][1];
        console.log(difference);
        const predictedPrice = coinData[coinData.length -1][1] + (difference);
        var predictionElement = document.getElementById('predictPrice');
        predictionElement.innerHTML = 'Loading...'
        setTimeout(()=>{
            predictionElement.innerHTML = `Predicted Price Will be ( RS ${predictedPrice})`;
        }, 3000);
    } else {
        alert('Choose a coin');
    }
});

let data;

function formatDate(d) {
    var date = new Date(d)
    return `${date.toDateString()}`;
}

function getData (choosedata) {
    const newData = []
    choosedata.forEach(item => {
        const itemData = [formatDate(item.date), item.price]
        newData.push(itemData);
    });
    console.log(newData);
    return newData;
}

function XMLHTTP(callback) {
    console.log('i run')
    const urltoHit = 'http://localhost:3000/api/v1/getPrice';
    xhttp.onload = function() {
        if (this.readyState === 4) {
            console.log('i run 2')
            callback(this.responseText)
        }
    }
    xhttp.open('GET', urltoHit);
    xhttp.send();
}

function fillCoin () {
    let fillElement = document.getElementById('fillCoinData');
    let elem = '<select class="form-select" aria-label="Default select example"><option selected>Choose a coin from Menu</option>';
    coinsArray.forEach(item => {
        elem += `<option value='${item}'>${item}</option>`
    })
    elem += '</select>';
    fillElement.innerHTML = elem;
}

fillCoin();
XMLHTTP(function (responseData) {
    data = JSON.parse(responseData);
});