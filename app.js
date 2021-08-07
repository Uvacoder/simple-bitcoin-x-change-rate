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

    for (let curName in data) {
      if (data.hasOwnProperty(curName)) {
        //create rows for each currency with an ID of the curName
        const curTableBody = document.querySelector("#curTableBody");
        const curRow = document.createElement("tr");
        curRow.className = "curRow";
        curRow.id = `${curName}`;
        curTableBody.appendChild(curRow);
        
        //add create a table row for currencyNames
        const curNameId = document.querySelector(`#${curName}`);
        const curNameItem = document.createElement("td");
        curNameItem.className = `curName`;
        curNameItem.innerHTML = `${curName}`;
        curNameId.appendChild(curNameItem);

        //create a table tow for BTC values in related currency
        const btcValueItem = document.createElement("td");
        btcValueItem.className = "btcValue";
        btcValueItem.innerHTML = `${data[curName].last}`;
        const curSymbol = document.createElement("span");
        curSymbol.innerHTML = ` ${curName}`;
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

//Task Two - Build a form for converting currencies to Bitcoin
//Add currency symbols in JSON object as option into the selection area
const getCurSymbol = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    for (let currencySymbol in data) {
      if (data.hasOwnProperty(currencySymbol)) {
        //create options for select element with currency symbol
        const curSymOptions = document.querySelector("#currencyArea");
        const curSymOption = document.createElement("option");
        curSymOption.className = "curSymbol";
        curSymOption.id = currencySymbol;
        curSymOption.textContent = currencySymbol;
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
const warning = document.querySelector("#warning");
const result = document.querySelector("#result");

//Fetch converted data from the api via user inputs
const convert = async () => {
  const submitCur = userInputCur.value;
  const submitValue = userInputValue.value;
  try {
    if (submitValue !== 0 && submitValue > 0) {
      const res = await fetch(
        `https://blockchain.info/tobtc?currency=${submitCur}&value=${submitValue}`
      );
      const data = await res.json();
      warning.style.display = "none";
      result.style.display = "block";
      enteredCur.innerHTML = `${submitCur} =`;
      enteredValue.innerHTML = `${submitValue}`;
      convertedValue.innerHTML = `${data} BTC`;
    } else if (submitValue == 0) {
      result.style.display = "none";
      warning.style.display = "block";
      warning.textContent = `You cannot convert zero amount ${submitCur} to BTC`;
    } else if (submitValue < 0) {
      result.style.display = "none";
      warning.style.display = "block";
      warning.textContent = `You cannot convert less than zero amount ${submitCur} to BTC`;
    }
  } catch (error) {
    console.log("Conversion part has an error", error);
  }
};

userInputCur.addEventListener("change", convert);
userInputValue.addEventListener("input", convert);
