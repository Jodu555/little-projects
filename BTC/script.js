const heading = document.getElementById('actual');

let obj;
async function loadData() {
    await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json())
        .then(data => obj = data)

    console.log(obj.bpi.EUR);

    var floatPrice = obj.bpi.EUR.rate;
    var euro = floatPrice.split('.')[0];
    var cleanEuro = euro.replace(',', '.');


    heading.innerHTML = "Aktuell: " + cleanEuro + " " + obj.bpi.EUR.symbol

}

setInterval(function() {
    loadData();
}, 10000);


loadData();