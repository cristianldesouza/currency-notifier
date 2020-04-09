if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.info('registered sw', reg))
        .catch(err => console.error('error registering sw', err));
} else {
    console.log('ServiceWorker não é suportado.');
}


if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      alert(permission);
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }


$(document).ready(function () {
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
                        valor = arredondar(valor, 2);
                        console.log('dolar valendo: ' + valor);
                       $('#dolar-price').text('R$ ' + valor);
                    });
            }
        })
        .catch();


    setInterval(() => {
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
                        valor = arredondar(valor, 2);
                        console.log('dolar valendo: ' + valor);
                       $('#dolar-price').text('R$ ' + valor);
                    });
            }
        })
        .catch();
    }, 30000)
});


function arredondar (numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 2;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
  };