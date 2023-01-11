
let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');



add.addEventListener('click', f1)

function f1() {
    let tr = document.createElement('tr');

    allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
    createCell(tr, price.value * amount.value, "cost");

    let remove = createCell(tr, 'удалить', 'remove');
    remove.addEventListener('click', function(e) {
        if(e.target.textContent == 'удалить'){
            tr.remove();
            recountTotal();
        }
        
    });

    name.value = '';
    price.value = '';
    amount.value = '';

    table.appendChild(tr);
    recountTotal();

}

function createCell(tr, value, name) {
    let td = document.createElement('td');

    td.textContent = value;
    td.classList.add(name);
    return  tr.appendChild(td);
}

function recountTotal() {
    let costs = table.querySelectorAll('.cost');
	let sum = 0;
    
    for (let cost of costs) {
        sum += +cost.textContent;
    }
    total.textContent = sum;
    return total;
}

function allowEdit(td) {
	td.addEventListener('dblclick', function(e) {
        let inp = document.createElement('input');
        let cell = e.target;
        inp.value = cell.textContent;
            inp.addEventListener('keypress', function(e){
                if(e.key == "Enter"){
                        cell.textContent = inp.value;
                        
                        if (cell.classList.contains('price') || cell.classList.contains('amount')) {
                            let parent = cell.parentElement
                            let cost = parent.querySelector('.cost')
                            let price = parent.querySelector('.price')
                            let amount = parent.querySelector('.amount')
                            
                            cost.textContent = price.textContent * amount.textContent 
                            console.log(cost)
                        }

                    }
                })
        cell.textContent = '';
        cell.appendChild(inp)
    });
}
