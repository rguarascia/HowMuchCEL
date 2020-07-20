// Lets use ES6 for these funcs for once...
// Ryan Guarascia
calculateRatio = () => {
    if (!isNaN(getWallet()) && !isNaN(getCEL())) {

        if (getCEL() > getWallet()) {
            alert("CEL Value cannot be larger than Wallet Value");
            return;
        }

        var ratio = (getCEL() / (getWallet() - getCEL())) * 100;
        $('#CEL-Ratio').text(ratio.toFixed(2) + '%');
        if (ratio < 5) {
            $("body > main > section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-4')
            $("body > main > section > div.row.cards > div:nth-child(2)").removeClass().addClass('col-md-4')
            $("body > main > section > div.row.cards > div:nth-child(1)").removeClass().addClass('col-md-4')
        } else if (ratio > 15) {
            $("body > main > section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide')
            $("body > main > section > div.row.cards > div:nth-child(2)").removeClass().addClass('hide')
            $("body > main > section > div.row.cards > div:nth-child(3)").removeClass().addClass('hide')
        } else if (ratio > 10) {
            $("body > main > section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-12')
            $("body > main > section > div.row.cards > div:nth-child(2)").removeClass().addClass('hide')
            $("body > main > section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide');
        } else if (ratio > 5) {
            $("body > main > section > div.row.cards > div:nth-child(3)").removeClass().addClass('col-md-6')
            $("body > main > section > div.row.cards > div:nth-child(2)").removeClass().addClass('col-md-6');
            $("body > main > section > div.row.cards > div:nth-child(1)").removeClass().addClass('hide');
        }
    }
}

getWallet = () => {
    return parseFloat($('#wallet').val());
}

getCEL = () => {
    return parseFloat($('#cel').val());
}
$('#wallet').change(function (e) {
    e.preventDefault();
    calculateRatio();
});

$('#cel').change(function (e) {
    e.preventDefault();
    calculateRatio();
});

// Surpresses enter functions
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
            calculateRatio();
        }
    });