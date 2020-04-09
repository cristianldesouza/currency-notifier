if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.info('registered sw', reg))
        .catch(err => console.error('error registering sw', err));
} else {
    console.log('ServiceWorker não é suportado.');
}


let valueToNotify = 0.00;
let NotifyVariable = 'up';
let dolarValue = 0.00;
let check = false;

if ('Notification' in window) {

    if (Notification.permission === 'granted') {
        // If it's okay let's create a notification
        
    } else {
        //notification == denied
        Notification.requestPermission()
            .then(function (result) {
                console.log(result);  //granted || denied
                if (Notification.permission == 'granted') {
                    //doNotify('');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

$(document).ready(function () {
    getDolaPrice(false);
    setInterval(() => { getDolaPrice(check) }, 30000);
});


function arredondar(numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ? casasDecimais : 2;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
};


function doNotify(tt, msg) {
    let title = tt;
    let t = Date.now() + 120000;    //2 mins in future
    let options = {
        body: msg, 
        //data: { prop1: 123, prop2: "Steve" },
        //lang: 'en-CA',
        //icon: './img/calendar-lg.png',
        timestamp: t,
        vibrate: [100, 200, 100]
    }
    let n = new Notification(title, options);

    n.addEventListener('show', function (ev) {
        console.log('SHOW', ev.currentTarget.data);
    });
    n.addEventListener('close', function (ev) {
        console.log('CLOSE', ev.currentTarget.body);
    });
    setTimeout(n.close.bind(n), 3000); //close notification after 3 seconds
}

function getDolaPrice(check) {
    fetch(`https://economia.awesomeapi.com.br/all/USD-BRL`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (response.status != 200) {
                    return response.json()
                        .then((body) => {
                            console.log(body);
                        });
                } else {
                    return response.json()
                        .then((body) => {
                            let valor = parseFloat(body.USD.high);
                            //valor = arredondar(valor, 2);
                            console.log('dolar valendo: ' + valor);
                            $('#dolar-price').text('R$ ' + valor);
                            
                            
                            if (check) {
                                if (NotifyVariable === 'up') {
                                    if (dolarValue >= valor) {

                                    }
                                } else {   
                                    if (dolarValue <= valor) {

                                    }
                                }
                            }
                            dolarValue = valor;
                            //doNotify('Preço do dolar: ', 'O valor do dólar comercial é de: R$ ' + valor);
                        });
                }
            })
            .catch();
}


function testeNotify() {
    valor = parseFloat($('#dolar-price').text().split('R$ ')[1]);

    //valor = arredondar(valor, 2);
    doNotify('Preço do dolar: ', 'O valor do dólar comercial é de: R$ ' + valor);
}

function notifyVerification(xd) {
    NotifyVariable = xd;
    valueToNotify = dolarValue;
    check = true;
}