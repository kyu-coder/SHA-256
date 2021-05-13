const displayContainer = document.querySelector(".show"),
    binary = displayContainer.querySelector("#binary"),
    sigma_0_display = displayContainer.querySelector("#sigma_0"),
    sigma_1_display = displayContainer.querySelector("#sigma_1"),
    sigma_upper_0_display = displayContainer.querySelector("#sigma_upper_0"),
    sigma_upper_1_display = displayContainer.querySelector("#sigma_upper_1"),
    binary_1_display = displayContainer.querySelector("#binary_1_display"),
    binary_2_display = displayContainer.querySelector("#binary_2_display"),
    binary_3_display = displayContainer.querySelector("#binary_3_display"),
    choice_outcome = displayContainer.querySelector("#choice_outcome"),
    majority_outcome = displayContainer.querySelector("#majority_outcome");

const INT_BITS = 32;

function getInputValue(){

    var inputVal = document.getElementById("input").value.padStart(INT_BITS, '0');
    var inputVal2 = document.getElementById("input2").value.padStart(INT_BITS, '0');
    var inputVal3 = document.getElementById("input3").value.padStart(INT_BITS, '0');

    binary.innerText = inputVal;
    sigma_0_display.innerText = sigma_0(inputVal);
    sigma_1_display.innerText = sigma_1(inputVal);
    sigma_upper_0_display.innerText = sigma_upper_0(inputVal);
    sigma_upper_1_display.innerText = sigma_upper_1(inputVal);
    binary_1_display.innerText = inputVal;
    binary_2_display.innerText = inputVal2;
    binary_3_display.innerText = inputVal3;
    choice_outcome.innerText = choice(inputVal, inputVal2, inputVal3);
    majority_outcome.innerText = majority(inputVal, inputVal2, inputVal3);
}

function choice(x, y, z){
    let str='';
    for (let i = 0 ; i < 32 ; i++){
        (x[i] === '0' ? str = str + z[i] : str = str + y[i]);
    }
    return str;
}

function majority(x, y, z){
    let str='';
    for (let i = 0 ; i < 32 ; i++){
        ( (x[i] === y[i] | x[i] === z[i]) ? str = str + x[i] : str = str + y[i]);
    }
    return str;
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