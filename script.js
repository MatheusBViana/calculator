var button_number = document.querySelectorAll('.number')
const button_operation = document.querySelectorAll('.operation')
const button_solve = document.querySelector('.equals')
const button_delete = document.querySelector('.delete')
const button_delete_all = document.querySelector('.delete_all')
const prev_number = document.querySelector('#prev_number')
const cur_number = document.querySelector('#cur_number')
var operation_symbol = "";
var solved = false;
const regex_numbers = new RegExp(/^\d$/);
const regex_operators = new RegExp("[\*\+\-\/\]")

document.onkeydown = function(e) {
    if(e.which === 8){
        cur_number.textContent = cur_number.textContent.slice(0, -1);
    }
    if(regex_numbers.test(e.key) || e.key == "."){
        addNumber(e.key)
    }else
    if(e.key === "=" || e.which === 13){
        solve();
    }else
    if(regex_operators.test(e.key) && e.key !== ','){
        chooseOperation(e.key);
    }else{
        return
    }
}

button_number.forEach(function(button){
    button.addEventListener('click', function(){
        addNumber(button.textContent);
    })
});

button_operation.forEach(function(button){
    button.addEventListener('click', function(){
        chooseOperation(button.textContent);
    })
});

button_solve.addEventListener('click', function(){
    solve();
})

button_delete_all.addEventListener('click', function(){
    deleteAll();
})

button_delete.addEventListener('click', function(){
    deleteCurrent();
})

function deleteAll(){
    prev_number.textContent = "";
    cur_number.textContent = "";
    prev_number.textContent = "";
}

function deleteCurrent(){
    cur_number.textContent = "";
}

function addNumber(number_to_add){
    if(solved){
        prev_number.textContent = cur_number.textContent;
        cur_number.textContent = "";
        solved = false;
    }
    if(number_to_add == '.' && cur_number.textContent.includes('.'))
        return
    
    cur_number.textContent += number_to_add;
}

function chooseOperation(operation){
    if(cur_number.textContent == ""){
        return
    }
    solved = false;
    operation_symbol = operation;
    cur_number.textContent += operation;
    prev_number.textContent = cur_number.textContent;
    cur_number.textContent = "";
}

function solve(){
    let result;
    let num1 = parseFloat(prev_number.textContent.slice(0, -1));
    let num2 = parseFloat(cur_number.textContent);


    switch(operation_symbol){
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        
        default:
            return
            
    }
    solved = true;
    prev_number.textContent += num2;
    operation = undefined;
    cur_number.textContent = result;
}