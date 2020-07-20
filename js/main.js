// Lets use ES6 for these funcs for once...
// Ryan Guarascia

var CELprice;
var CELHODLing;

$(function () {
    getCELPrice().then(function (price) {
        CELprice = price;
        $('#price').text(price);
    })

    setInterval(() => {
        getCELPrice().then(function (price) {
            CELprice = price;
            $('#price').text(price);
            console.warn('Checking for price update')
        })
    }, 60000);
});


calculateRatio = () => {
    if (!isNaN(getWallet()) && !isNaN(getCEL())) {
        var wallet = getWallet();
        var cel = getCEL();
        var non_cel = wallet - cel;

        if (cel > wallet) {
            alert("CEL Value cannot be larger than Wallet Value");
            return;
        }

        var ratio = (cel / non_cel) * 100;
        ratio = ((ratio > 100) ? 100 : ratio); // limiter of 100%
        $('#CEL-Ratio').text(ratio.toFixed(2) + '%');

        if (ratio < 5) {
            $("section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-4');
            $("section > div.row.cards > div:nth-child(2)").removeClass().addClass('col-md-4');
            $("section > div.row.cards > div:nth-child(1)").removeClass().addClass('col-md-4');
        } else if (ratio > 15) {
            $("section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide');
            $("section > div.row.cards > div:nth-child(2)").removeClass().addClass('hide');
            $("section > div.row.cards > div:nth-child(3)").removeClass().addClass('hide');
            $('section > div.row.cards > div.col-lg-12.platium-hide').removeClass('platium-hide').addClass('platium-show');
        } else if (ratio > 10) {
            $("section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-12');
            $("section > div.row.cards > div:nth-child(2)").removeClass().addClass('hide');
            $("section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide');
        } else if (ratio > 5) {
            $("section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-6');
            $("section > div.row.cards > div:nth-child(2)").removeClass().addClass('col-md-6');
            $("section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide');
        }
    }
}

getWallet = () => {
    return parseFloat($('#wallet').val());
}

getCEL = () => {
    return parseFloat($('#cel').val());
}

calculateCEL = () => {
    var cel = getCEL();
    CELHODLing = cel / CELprice;
    $('#CEL-Amount').text((CELHODLing).toFixed(4));
}

$('#wallet').change(function (e) {
    e.preventDefault();
    calculateRatio();
});

$('#cel').change(function (e) {
    e.preventDefault();
    calculateRatio();
    calculateCEL();
});

// Surpresses enter functions
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
            calculateRatio();
        }
    }
);

getCELPrice = () => {
    return new Promise(function (res, rej) {
        $.getJSON("https://api.coinpaprika.com/v1/tickers/cel-celsius",
            function (data) {
                res(parseFloat(data.quotes.USD.price));
            }
        );
    });
}