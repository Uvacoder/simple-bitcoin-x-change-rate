// Task One - Display BTC Prices in Different Currencies - src: https://blockchain.info/ticker

// Fetch data from the src,

// and display it on a table which includes Currency Name and 1 BTC value of the currency

// table should be responsive, use a CSS Framework

const url = "https://blockchain.info/ticker";

const getPrices = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Data fetching for exchange prices is working");

    const curTableBody = document.querySelector("#curTableBody");

    for (let curName in data) {
      if (data.hasOwnProperty(curName)) {
        //create rows for each currency with an ID of the curName
        const curRow = document.createElement("tr");
        curRow.className = "curRow";
        curRow.id = `${curName}`;
        curTableBody.appendChild(curRow);
        let curNameId = document.querySelector(`#${curName}`);

        //add create a table row for currencyNames
        const curNameItem = document.createElement("td");
        curNameItem.className = `curName`;
        curNameItem.innerHTML = `${curName}`;
        curNameId.appendChild(curNameItem);

        //create a table tow for BTC values in related currency
        const btcValueItem = document.createElement("td");
        btcValueItem.className = "btcValue";
        btcValueItem.innerHTML = `${data[curName].last}`;
        const curSymbol = document.createElement("span");
        curSymbol.innerHTML = ` ${data[curName].symbol}`;
        curNameId.appendChild(btcValueItem);
        btcValueItem.appendChild(curSymbol);
      } else {
        console.log("There is no property.");
      }
    }
  } catch (err) {
    console.log("Oops! Error: ", err);
  }
};

getPrices();

// Build a form which allows the user to convert a given value of a specific currency into Bitcoin.
// It's important that the user cannot select a currency that is not returned by the first endpoint; the
// user must not be able to convert 0 or negative values and the form should display appropriate
// errors.
// You are not expected to perform the conversion yourself; the following endpoint
// https://blockchain.info/tobtc?currency=USD&value=50 will handle the action for you.

const getCurSymbol = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Data fetching for symbols is working");

    for (let curName in data) {
      if (data.hasOwnProperty(curName)) {
        //create options for select element with currency symbol
        const curSymOptions = document.querySelector(".curSymOptions");
        let curSymOption = document.createElement("option");
        curSymOption.className = "curSymbol";
        curSymOption.id = `${curName}`;
        curSymOption.innerHTML = `${data[curName].symbol}`;
        curSymOptions.appendChild(curSymOption);
      } else {
        console.log("There is no property.");
      }
    }
  } catch (err) {
    console.log("Oops! Error: ", err);
  }
};

getCurSymbol();

const userInputValue = document.querySelector("#userInputValue");
const userInputCur = document.querySelector("#currencyArea");
const enteredCur = document.querySelector("#enteredCur");
const enteredValue = document.querySelector("#enteredValue");
const convertedValue = document.querySelector("#convertedValue");
const convertBtn = document.querySelector("#convertBtn");

const convert = async () => {
  let submitCur = userInputCur.value;
  let submitValue = userInputValue.value;
  fetch(
    `https://blockchain.info/tobtc?currency=${submitCur}&value=${submitValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Data fetching for conversion is working");
      enteredCur.innerHTML = `${submitCur} =`;
      enteredValue.innerHTML = `${submitValue}`;
      convertedValue.innerHTML = `${data} BTC`;
    })
    .catch((err) => console.log("Conversion part has an error", err));
};

userInputCur.addEventListener("change", convert);
userInputValue.addEventListener("input", convert);
convertBtn.addEventListener("click", convert);
