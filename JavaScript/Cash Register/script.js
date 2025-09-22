// Price of the item
let price = 19.5;

// Cash-in-drawer (you can change this for testing)
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Currency values
const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// DOM elements
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

purchaseBtn.addEventListener("click", () => {
  let cash = Number(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = parseFloat((cash - price).toFixed(2));
  let totalCID = parseFloat(
    cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2)
  );

  // Case 1: INSUFFICIENT_FUNDS
  if (totalCID < changeNeeded) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Case 2: CLOSED
  if (totalCID === changeNeeded) {
    let closedChange = cid
      .filter(item => item[1] > 0)
      .reverse(); // highest-to-lowest order
    changeDue.textContent =
      "Status: CLOSED " +
      closedChange.map(item => `${item[0]}: $${item[1]}`).join(" ");
    return;
  }

  // Case 3: OPEN
  let changeArr = [];
  let remainingChange = changeNeeded;

  // Start from highest denomination
  let reversedCID = [...cid].reverse();

  for (let [unit, amountAvailable] of reversedCID) {
    let unitValue = currencyUnit[unit];
    let amountToReturn = 0;

    while (
      remainingChange >= unitValue &&
      amountAvailable > 0
    ) {
      remainingChange = parseFloat((remainingChange - unitValue).toFixed(2));
      amountAvailable = parseFloat((amountAvailable - unitValue).toFixed(2));
      amountToReturn = parseFloat((amountToReturn + unitValue).toFixed(2));
    }

    if (amountToReturn > 0) {
      changeArr.push([unit, amountToReturn]);
    }
  }

  // If exact change not possible
  if (remainingChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Success: Status OPEN
  changeDue.textContent =
    "Status: OPEN " +
    changeArr.map(item => `${item[0]}: $${item[1]}`).join(" ");
});
