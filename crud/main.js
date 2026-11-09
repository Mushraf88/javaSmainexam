
let products = []

if (sessionStorage.getItem("products")) {
    products = JSON.parse(sessionStorage.getItem("products"))
    displayProductList()
}


// GET DATA
productForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const productNameInput = productname.value
    const priceInput = price.value
    const quantityInput = quantity.value

    console.log(productNameInput, priceInput, quantityInput)

    if (productNameInput && priceInput !== "" && quantityInput !== "") {

        const editindex = editstatus.value

        if (editindex == "") {

            // ADD PRODUCT
            products.push({
                productname: productNameInput,
                price: priceInput,
                quantity: quantityInput
            })

            console.log(products)

        } else {

            // UPDATE PRODUCT
            products[editindex] = {
                productname: productNameInput,
                price: priceInput,
                quantity: quantityInput
            }

            editstatus.value = ""
        }

    } else {
        alert("Please fill the form completely")
        return
    }

    productForm.reset()

    sessionStorage.setItem("products", JSON.stringify(products))

    displayProductList()

})


// DISPLAY PRODUCT ARRAY AS TABLE
function displayProductList() {

    result.innerHTML = ""

    products.forEach((item, index) => {

        let stockstatus = ""

        if (Number(item.quantity) < 5) {
            stockstatus = "Low Stock"
        } else {
            stockstatus = "Available"
        }

        result.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productname}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>${stockstatus}</td>

                <td>
                    <button onclick="editProduct(${index})"
                    class="btn btn-warning">Edit</button>

                    <button onclick="deleteProduct(${index})"
                    class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `
    })

    // TOTAL PRODUCTS
    totalproducts.innerHTML = products.length

    // LOW STOCK COUNT
    const lowstock = products.filter(
        item => Number(item.quantity) < 5
    )

    lowstockcount.innerHTML = lowstock.length
}


// EDIT PRODUCT
function editProduct(productindex) {

    const productdetails = products[productindex]

    console.log(productdetails)

    productname.value = productdetails.productname
    price.value = productdetails.price
    quantity.value = productdetails.quantity

    editstatus.value = productindex

}


// DELETE PRODUCT
function deleteProduct(productindex) {

    if (confirm("Are you sure you want to delete this product?")) {

        products.splice(productindex, 1)

        sessionStorage.setItem("products", JSON.stringify(products))

        displayProductList()
    }

}
