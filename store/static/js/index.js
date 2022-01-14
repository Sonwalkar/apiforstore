document.addEventListener("DOMContentLoaded", () => {
  var itemsList = [];

  // add item to itemList when clicks on Add item Button
  document.querySelector("#add-item").addEventListener("click", () => {
    // Getting all value
    itemCategory = document.querySelector("#itemCategory").value;
    item = document.querySelector("#item").value;
    price = document.querySelector("#price").value;
    quantity = document.querySelector("#quantity").value;

    // Select error msg element
    error_msg = document.querySelector("#error-msg");

    // if item name empty show error message
    if (item == "") {
      error_msg.innerText = "Item name should not be empty";
    }

    // if item price empty or less than 1 than show error message
    else if (price < 1 || price == "") {
      error_msg.innerText = "Price should not be empty or less then 1";
    }

    // if item quantity empty or less than 1 than show error message
    else if (quantity <= 0 || quantity == "") {
      error_msg.innerText = "Quantity should not be empty or less than 1";
    }

    // If every field is valid than add item
    else {
      error_msg.innerText = "";

      // Creating new Object
      var newEntry = new Object();
      newEntry.item = item;
      newEntry.itemCategory = itemCategory;
      newEntry.quantity = parseInt(quantity);
      newEntry.price = parseInt(price);

      itemsList.push(newEntry);

      // Create table row and table data
      let createTR = document.createElement("tr");
      let createTDCategory = document.createElement("td");
      let createTDItem = document.createElement("td");
      let createTDQuantity = document.createElement("td");
      let createTDPrice = document.createElement("td");

      // add data values
      createTDCategory.innerText = itemCategory;
      createTDItem.innerText = item;
      createTDQuantity.innerText = quantity;
      createTDPrice.innerText = price;

      // Append table data to table row
      createTR.append(
        createTDCategory,
        createTDItem,
        createTDQuantity,
        createTDPrice
      );

      // append table row to table body
      document.querySelector(".tableBody").append(createTR);

      // Show added list table
      document.querySelector(".addedListTable").style.display = "table";
    }
  });

  // After clicked on submit Send request to server and get response
  document
    .querySelector(".btn.btn-success")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      var formData = itemsList;
      // Get csrf Token value
      let csrftoken = document.querySelector(
        "input[name='csrfmiddlewaretoken']"
      ).value;
      await fetch(``, {
        method: "POST",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Content-Type": "application/json;",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // After Successfully get response show receipt
          showReceipt(data);
        });
    });

  // Show Receipt page
  function showReceipt(data) {
    // Show one by one item receipt
    data[0].map((itemInfo, index) => {
      // Create Table Row
      let createTrReceipt = document.createElement("tr");
      // Create Table Data
      let createTdSrNo = document.createElement("td");
      let createTdItemName = document.createElement("td");
      let createTdItemCategory = document.createElement("td");
      let createTdItemQuantity = document.createElement("td");
      let createTdUnitPrice = document.createElement("td");
      let createTdNetAmount = document.createElement("td");
      let createTdTaxRate = document.createElement("td");
      let createTdTaxAmount = document.createElement("td");
      let createTdFinalAmount = document.createElement("td");

      // Gives value to table data
      createTdSrNo.innerText = index + 1;
      createTdItemName.innerText = itemInfo.item;
      createTdItemCategory.innerText = itemInfo.itemCategory;
      createTdItemQuantity.innerText = itemInfo.quantity;
      createTdUnitPrice.innerHTML = `&#x20b9; ${itemInfo.price}`;
      createTdNetAmount.innerHTML = `&#x20b9; ${itemInfo.netAmount}`;
      createTdTaxRate.innerText = `${itemInfo.taxRate}%`;
      createTdTaxAmount.innerHTML = `&#x20b9; ${itemInfo.taxAmount}`;
      createTdFinalAmount.innerHTML = `&#x20b9; ${itemInfo.finalPrice}`;

      // Append Table data to table row serially
      createTrReceipt.append(
        createTdSrNo,
        createTdItemName,
        createTdItemCategory,
        createTdUnitPrice,
        createTdItemQuantity,
        createTdNetAmount,
        createTdTaxRate,
        createTdTaxAmount,
        createTdFinalAmount
      );

      // Append table row to table body of Receipt div
      document.querySelector(".receiptTableBody").append(createTrReceipt);
    });

    // If discount amount is greater than 0 show 5% text
    if (data[1][0].discountAmount !== 0) {
      document.querySelector(".discountTdLabel").innerText =
        "Discount Amount 5%";
    }

    // Show Total Tax Amount
    document.querySelector('.totalTaxAmount').innerHTML= `<strong>Total Tax Amount:</strong> ${data[1][0].totalTaxAmount}`
    
    // Show Total amount
    document.querySelector(
      ".totalAmountTd"
    ).innerHTML = `&#x20b9; ${data[1][0].totalAmount}`;

    // Show total discount if total amount is greater than 2000
    document.querySelector(
      ".discountTd"
    ).innerHTML = `&#x20b9; ${data[1][0].discountAmount}`;

    // Show Total amount Payable
    document.querySelector(
      ".totalAmountPayableTd"
    ).innerHTML = `&#x20b9; ${data[1][0].totalAmountPayable}`;

    // Show Date Of Purchase
    document.querySelector(".dateAndTime").innerText =
      data[1][0].dateOfPurchase;

    // Show Receipt Div And Hide itemInputList Div
    document.querySelector(".receiptDiv").style.display = "block";
    document.querySelector(".itemsListsInput").style.display = "none";
  }
});
