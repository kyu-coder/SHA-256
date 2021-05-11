const displayContainer = document.querySelector(".show"),
    decimal = displayContainer.querySelector("#decimal"),
    binary = displayContainer.querySelector("#binary"),
    SHR_n_display = displayContainer.querySelector("#SHR_n");

function getInputValue(){
    var inputVal = +document.getElementById("input").value;
    var inputVal_binary = inputVal.toString(2);
    var n = +document.getElementById("input_n").value;

    decimal.innerText = inputVal;
    binary.innerText = inputVal_binary;
    SHR_n_display.innerText = SHR_n(inputVal, n);
}

function SHR_n(input, n){
    return ( (input >> n).toString(2) );
}