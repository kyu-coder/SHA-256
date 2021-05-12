const displayContainer = document.querySelector(".show"),
    decimal = displayContainer.querySelector("#decimal"),
    binary = displayContainer.querySelector("#binary"),
    sigma_0_display = displayContainer.querySelector("#sigma_0"),
    sigma_1_display = displayContainer.querySelector("#sigma_1");
    sigma_upper_0_display = displayContainer.querySelector("#sigma_upper_0");
    sigma_upper_1_display = displayContainer.querySelector("#sigma_upper_1");

const INT_BITS = 32;

function getInputValue(){

    var inputVal = +document.getElementById("input").value;
    var inputVal_binary = inputVal.toString(2).padStart(INT_BITS, '0');

    decimal.innerText = inputVal;
    binary.innerText = inputVal_binary;
    sigma_0_display.innerText = sigma_0(inputVal);
    sigma_1_display.innerText = sigma_1(inputVal);
    sigma_upper_0_display.innerText = sigma_upper_0(inputVal);
    sigma_upper_1_display.innerText = sigma_upper_1(inputVal);
    
    
}

function SHR_n(input, n){
    return ( input.slice(0, -n).padStart(INT_BITS, '0') );
}

function ROTR_n(input, n){
    return ( input.slice(-n) + input.slice(0, -n) );
}

function sigma_0(input){
    
    var decimal = sigma_n(input, 7, 18, 3);

    var binary_solution = decimal_to_unsignedTwosComplement(decimal);

    return binary_solution;
}

function sigma_1(input){
    
    var decimal = sigma_n(input, 17, 19, 10);

    var binary_solution = decimal_to_unsignedTwosComplement(decimal);

    return binary_solution;
}

function sigma_upper_0(input){
    
    var decimal = sigma_upper_n(input, 2, 13, 22);

    var binary_solution = decimal_to_unsignedTwosComplement(decimal);

    return binary_solution;
}

function sigma_upper_1(input){
    
    var decimal = sigma_upper_n(input, 6, 11, 25);

    var binary_solution = decimal_to_unsignedTwosComplement(decimal);

    return binary_solution;
}

function sigma_n(input, a, b, c){
    input_binary = input.toString(2).padStart(INT_BITS, '0');

    const ROTR_a = parseInt(ROTR_n(input_binary, a), 2);
    const ROTR_b = parseInt(ROTR_n(input_binary, b), 2);
    const SHR_c = parseInt(SHR_n(input_binary, c), 2);

    var decimal_solution = ( ROTR_a ^ ROTR_b ) ^ SHR_c;

    return decimal_solution;
}

function sigma_upper_n(input, a, b, c){
    input_binary = input.toString(2).padStart(INT_BITS, '0');

    const ROTR_a = parseInt(ROTR_n(input_binary, a), 2);
    const ROTR_b = parseInt(ROTR_n(input_binary, b), 2);
    const ROTR_c = parseInt(ROTR_n(input_binary, c), 2);

    var decimal_solution = ( ROTR_a ^ ROTR_b ) ^ ROTR_c;

    return decimal_solution;
}

function decimal_to_unsignedTwosComplement(decimal){
    
    if (decimal < 0){
        var unsignedTwosComplement = (parseInt(decimal.toString(2)
            .replace('-', '')
            .padStart(INT_BITS, '0')
            .replaceAll('0', '2').replaceAll('1', '0').replaceAll('2', '1'), 2) + 1).toString(2);
    } else {
        var unsignedTwosComplement = (decimal.toString(2).padStart(INT_BITS, '0'));
    }

    return unsignedTwosComplement;

}