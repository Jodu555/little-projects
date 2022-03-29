const btc = document.querySelector('#btc')

async function loadData() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const json = await response.json();

    console.log(json.bpi.EUR);

    var floatPrice = json.bpi.EUR.rate;
    var euro = floatPrice.split('.')[0];
    var cleanEuro = euro.replace(',', '.');

    console.log(btc);
    btc.innerHTML = "BTC: " + cleanEuro + " " + json.bpi.EUR.symbol

}

setInterval(() => {
    loadData();
}, 10000);


loadData();