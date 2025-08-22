
function calculateMortgage(aux) {

    //Monto prestamo  = valor total - couta inicial
    //total intereses = Monto prestamo * tasa / 100
    //Cuota = (Monto prestamo + total intereses ) / (plazo años * 12)

    aux.preventDefault();

    let cuota = document.forms["calculateForm"]["fcuota"].value;
    let plazo = document.forms["calculateForm"]["fplazo"].value;
    let interes = document.forms["calculateForm"]["finteres"].value;
    let valorin = document.forms["calculateForm"]["fvalorInmueble"].value;

    const   MONTHS_ON_YEAR = 12; 

    const mortgage = {

        costoTotalInmueble: 0,
        totalPrestamo : 0,
        totalInteres  : 0,
        cuotaMensual  : 0

    };

    
    mortgage.totalPrestamo = valorin - cuota;
    mortgage.totalInteres = mortgage.totalPrestamo * interes/100;
    mortgage.costoTotalInmueble = (mortgage.totalPrestamo / valorin) * 100;
    mortgage.cuotaMensual = (mortgage.totalPrestamo + mortgage.totalInteres) / (plazo * MONTHS_ON_YEAR);

    outputMortgage (reduceData(mortgage.totalPrestamo) , reduceData(mortgage.cuotaMensual) , mortgage.costoTotalInmueble);
}

function outputMortgage(val1, val2, val3){

    document.getElementById("oMontoPrestamo").innerHTML = val1;
    document.getElementById("oCuota").innerHTML = val2;

    var totalPrestamoPorcentaje = 0;

    if(val3 > 90){
        document.getElementById("oMontoPrestamo").className = 'rounded customAlert pt-2 pb-2 fs-5';
    }

    else{
        document.getElementById("oMontoPrestamo").className = 'rounded bg-light pt-2 pb-2 fs-5';
    }
}

function resetForm(){

    document.getElementById("oMontoPrestamo").className = 'rounded bg-light pt-2 pb-2 fs-5';
    outputPlaceHolder()
    

}

function reduceData(val){
    const dollarFormatter = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2});
    return dollarFormatter.format(val);

}

function outputPlaceHolder(){

    var aux1 = 0;
    var aux2 = 0;
    
    document.getElementById("oMontoPrestamo").innerHTML = reduceData(aux1);
    document.getElementById("oCuota").innerHTML = reduceData(aux2);

}

function placeHolder(){

    outputPlaceHolder (reduceData(0), reduceData(0));
    
}

function changeBg(){

    vec = document.getElementById("oCuota").innerHTML;
    document.vec.style.setProperty('customAlert');

}

