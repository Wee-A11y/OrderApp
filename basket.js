if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    let removebasketItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removebasketItemButtons.length; i++) {
        let button = removebasketItemButtons[i]
        button.addEventListener('click', removebasketItem)
    }

    let quantityInputs = document.getElementsByClassName('basket-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addTobasketButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addTobasketButtons.length; i++) {
        let button = addTobasketButtons[i]
        button.addEventListener('click', addTobasketClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase, please collect between 16:30 and 18:00')
    let basketItems = document.getElementsByClassName('basket-items')[0]
    while (basketItems.hasChildNodes()) {
        basketItems.removeChild(basketItems.firstChild)
    }
    updatebasketTotal()
}

function removebasketItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updatebasketTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatebasketTotal()
}

function addTobasketClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemTobasket(title, price)
    updatebasketTotal()
}

function addItemTobasket(title, price) {
    let basketRow = document.createElement('div')
    basketRow.classList.add('basket-row')
    let basketItems = document.getElementsByClassName('basket-items')[0]
    let basketItemNames = basketItems.getElementsByClassName('basket-item-title')
    for (let i = 0; i < basketItemNames.length; i++) {
        if (basketItemNames[i].innerText == title) {
            alert('This item is already in your basket')
            return
        }
    }
    let basketRowContents = `
        <div class="basket-item basket-column">
            <span class="basket-item-title">${title}</span>
        </div>
        <span class="basket-price basket-column">${price}</span>
        <div class="basket-quantity basket-column">
            <input class="basket-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    basketRow.innerHTML = basketRowContents
    basketItems.append(basketRow)
    basketRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removebasketItem)
    basketRow.getElementsByClassName('basket-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updatebasketTotal() {
    let basketItemContainer = document.getElementsByClassName('basket-items')[0]
    let basketRows = basketItemContainer.getElementsByClassName('basket-row')
    let total = 0
    for (let i = 0; i < basketRows.length; i++) {
        let basketRow = basketRows[i]
        let priceElement = basketRow.getElementsByClassName('basket-price')[0]
        let quantityElement = basketRow.getElementsByClassName('basket-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('£', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket-total-price')[0].innerText = '£' + total
}