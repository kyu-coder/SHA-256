const displayContainer = document.querySelector(".show"),
    decimal = displayContainer.querySelector("#decimal"),
    binary = displayContainer.querySelector("#binary"),
    SHR_n_display = displayContainer.querySelector("#SHR_n"),
    ROTR_n_display = displayContainer.querySelector("#ROTR_n");

const INT_BITS = 32;

function getInputValue(){
    var inputVal = +document.getElementById("input").value;
    var inputVal_binary = inputVal.toString(2).padStart(INT_BITS, '0');
    var n = +document.getElementById("input_n").value;

    decimal.innerText = inputVal;
    binary.innerText = inputVal_binary;
    SHR_n_display.innerText = SHR_n(inputVal_binary, n);
    ROTR_n_display.innerText = ROTR_n(inputVal_binary, n);
    
}

function SHR_n(input, n){
    return ( input.slice(0, -n).padStart(INT_BITS, '0') );
}

function ROTR_n(input, n){
    return ( input.slice(-n) + input.slice(0, -n) );
}
