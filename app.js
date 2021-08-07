// Task One - Display BTC Prices in Different Currencies - src: https://blockchain.info/ticker

// Fetch data from the src,

// and display it on a table which includes Currency Name and 1 BTC value of the currency

// table should be responsive, use a CSS Framework

const getPrices = async () => {
  try {
    const res = await fetch("https://blockchain.info/ticker");
    const data = await res.json();
    console.log("Data fetching is working");

    const curTableBody = document.querySelector("#curTableBody");

    for (let curName in data) {
      if (data.hasOwnProperty(curName)) {
        //create rows for each currency with an ID of the curName
        let curRow = document.createElement("tr");
        curRow.className = "curRow";
        curRow.id = `${curName}`;
        curTableBody.appendChild(curRow);
        let curNameId = document.querySelector(`#${curName}`);

        //add create a table row for currencyNames
        let curNameItem = document.createElement("td");
        curNameItem.className = `curName`;
        curNameItem.innerHTML = `${curName}`;
        curNameId.appendChild(curNameItem);

        //create a table tow for BTC values in related currency
        let btcValueItem = document.createElement("td");
        btcValueItem.className = "btcValue";
        btcValueItem.innerHTML = `${data[curName].last}`;
        let curSymbol = document.createElement("span");
        curSymbol.innerHTML = ` ${data[curName].symbol}`
        curNameId.appendChild(btcValueItem);
        btcValueItem.appendChild(curSymbol)
      } else {
        console.log("There is no property.");
      }
    }
  } catch (err) {
    console.log("Oops! Error: ", err);
  }
};

getPrices();
