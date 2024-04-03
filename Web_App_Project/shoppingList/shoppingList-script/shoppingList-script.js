var savedItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];
    
    displayItems();
    
    function addItemPrompt() {
      var itemName = prompt('Enter item name:');
      
      if (itemName) {
        var itemAmount = parseInt(prompt('Enter item amount:'));
        
        if (!isNaN(itemAmount)) {
          var item = {
            name: itemName,
            amount: itemAmount,
            price: 0,
            discount: 0
          };
          
          savedItems.push(item);
          localStorage.setItem('shoppingItems', JSON.stringify(savedItems));
          
          displayItems();
        }
      }
    }
    window.prompt
    function displayItems() {
      var itemsContainer = document.getElementById('itemsContainer');
      itemsContainer.innerHTML = '';
      
      var totalDiscountPrice = 0;
      var totalPrice = 0;
      
      for (var i = 0; i < savedItems.length; i++) {
        var item = savedItems[i];
        
        var itemElement = document.createElement('div');
        itemElement.classList.add('item');
// ------------------------------------------------------
        var NameAmountDiv =  document.createElement('div');
        NameAmountDiv.classList.add("name-amount-container")
        itemElement.appendChild(NameAmountDiv);

        var itemNameElement = document.createElement('h3');
        itemNameElement.textContent = item.name;
        NameAmountDiv.appendChild(itemNameElement);
        
        var itemAmountElement = document.createElement('h5');
        itemAmountElement.textContent = 'Amount: ' + item.amount;
        NameAmountDiv.appendChild(itemAmountElement)
        // ---------------------------------------------------

        var discountPriceElement = document.createElement('div');
        discountPriceElement.textContent = "$" + calculateDiscountPrice(item).toFixed(2);
        itemElement.appendChild(discountPriceElement);
        
        var itemBtnContainer = document.createElement('div');
        itemBtnContainer.classList.add('item-btn-container');
        itemElement.appendChild(itemBtnContainer);
        

        var itemPriceButton = document.createElement('button');
        itemPriceButton.classList.add("price-set")
        itemPriceButton.textContent = 'Set Price';
        itemPriceButton.onclick = enterItemPrice.bind(null, i);
        itemBtnContainer.appendChild(itemPriceButton);

        var discountButton = document.createElement('button');
        discountButton.classList.add("discount-set")
        discountButton.textContent = 'Set Discount';
        discountButton.onclick = enterDiscount.bind(null, i);
        itemBtnContainer.appendChild(discountButton);

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete')
        deleteButton.classList.add('fa-regular')
        deleteButton.classList.add('fa-trash-can')
        deleteButton.onclick = deleteItem.bind(null, i);
        itemBtnContainer.appendChild(deleteButton)

        if(itemsContainer.firstChild){
          itemsContainer.insertBefore(itemElement,itemsContainer.firstChild);
        }
        else{
          itemsContainer.appendChild(itemElement)
        }
        var discountPrice = calculateDiscountPrice(item);
        totalDiscountPrice = totalDiscountPrice + discountPrice * item.amount;
        totalPrice = totalPrice + item.price * item.amount;
      }
      
      document.getElementById('totalDiscountPrice').textContent = 'Total Discount Price: $' + totalDiscountPrice.toFixed(2);
      document.getElementById('totalPrice').textContent = 'Total Price: $' + totalPrice.toFixed(2);
    }
    
    function calculateDiscountPrice(item) {
      return item.price - (item.price * item.discount / 100);
    }
    
    function enterItemPrice(index) {
      var itemPrice = parseFloat(prompt('Enter item price (per):'));
      
      if (!isNaN(itemPrice)) {
        savedItems[index].price = itemPrice;
        localStorage.setItem('shoppingItems', JSON.stringify(savedItems));
        displayItems();
      }
    }
    
    function enterDiscount(index) {
      var discount = parseFloat(prompt('Enter discount percentage:'));
      
      if (!isNaN(discount)) {
        savedItems[index].discount = discount;
        localStorage.setItem('shoppingItems', JSON.stringify(savedItems));
        displayItems();
      }
    }
    
    function deleteItem(index) {
      savedItems.splice(index, 1);
      localStorage.setItem('shoppingItems', JSON.stringify(savedItems));
      displayItems();
    }
    
    function deleteAllItems() {
      savedItems = [];
      localStorage.removeItem('shoppingItems');
      displayItems();
    }

    window.onload = dateDisplay()