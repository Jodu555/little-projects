const btc = document.querySelector('#btc')
const xmr = document.querySelector('#xmr')

async function loadData() {
    Promise.all([
        loadBTC(),
        loadXMR()
    ])

}

async function loadXMR() {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=BTC,USD,EUR')
    const json = await response.json();

    xmr.innerHTML = `XMR: ${json.EUR} €`
}
async function loadBTC() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const json = await response.json();

    var floatPrice = json.bpi.EUR.rate;
    var euro = floatPrice.split('.')[0];
    var cleanEuro = euro.replace(',', '.');

    btc.innerHTML = `BTC: ${cleanEuro} ${json.bpi.EUR.symbol}`;
}

setInterval(() => {
    loadData();
}, 10000);


loadData();