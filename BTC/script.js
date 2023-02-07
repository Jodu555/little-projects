const btc = document.querySelector('#btc');
const xmr = document.querySelector('#xmr');
const celo = document.querySelector('#celo');

async function loadData() {
	Promise.all([loadBTC(), loadXMR(), loadCelo()]);
}

async function loadCelo() {
	const response = await fetch('https://mkt-api.kminfra.net/api/web-token/celo');
	const json = await response.json();

	celo.innerHTML = `Celo: ${json.data.celo.price} €`;
}
async function loadXMR() {
	const response = await fetch('https://mkt-api.kminfra.net/api/web-token/xmr');
	const json = await response.json();

	xmr.innerHTML = `XMR: ${json.data.xmr.price} €`;
}
async function loadBTC() {
	const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
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
