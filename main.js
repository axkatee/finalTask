
  const wherePay = document.getElementById('wherepay-input');
  const howMuchPay = document.getElementById('howmuch-input');
  const addButton = document.getElementById('add-button');
  const block = document.getElementById('block');


  let infoArray = [];
  let sum = 0;
  let i = 0;

  let xhr = new XMLHttpRequest();

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = dd + '.' + mm + '.' + yyyy;

  addButton.onclick = function() {
      addInfo();
  }

  xhr.open('GET', 'http://localhost:3000/all');
  xhr.send();

  xhr.onload = function(){
    let responseArr = JSON.parse(xhr.response)

    
    responseArr.forEach((item, index) => {
      console.log(item)
      render(item.shopName, item.createDate, item.price, index);
    })
  }

  addInfo = () => {

    const body = {
      wherePay: wherePay.value,
      createDate: today,
      howMuchPay: howMuchPay.value,
      itogo: sum
    }

    sum += +(body.howMuchPay);
    i += 1;


    xhr.open('POST', 'http://localhost:3000/add');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(body));

    infoArray.push(body);

    render(body.wherePay, body.createDate, body.howMuchPay);
    
}

render = (wherePay, today, howMuchPay, index) => {

    let summa = document.getElementById('summa');
    summa.innerText = "Итого: " + `${sum}` + " р.";


  if (wherePay !== "" && howMuchPay !== null) {

    let result = document.createElement('div');
    result.innerHTML = `
    <div class="content-item">
        <div class="item-name">${index + 1}) Магазин "${wherePay}" ${today}  </div>
        <div class = "item-price">
            <div class="item-cost"> ${howMuchPay} р.</div>
            <div class="item-buttons">
                <img src = "edit.png" class="edit" id="edit-${index}">
                <img src = "delete.png" class="remove" id="del-${index}">
           </div>
        </div>
    </div>`

    block.appendChild(result);

    const editBtn = document.getElementById(`edit-${index}`);
    const deleteBtn = document.getElementById(`del-${index}`);

    editBtn.onclick = function () {
      onEditTask(index);
    }

    deleteBtn.onclick = function () {
      onDeleteTask(index);
    }

  } else if (!wherePay || !howMuchPay) {
    console.log(wherePay);
    console.log(howMuchPay);
    alert("empty fields!");
  }
}

  onDeleteTask = () => {

    xhr.open('DELETE', 'http://localhost:3000/delete');
    xhr.send();

  }

  onEditTask = () => {

    xhr.open('POST', 'http://localhost:3000/edit');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
  }