const tableHeader = ["ISO", "Country", "Units", "SellRate(NPR)", "PurchaseRate(NPR)"];
const tableDiv = document.querySelector(".tableBox");
const tables = document.createElement("table");
const tableHeaderRow = document.createElement("tr");


tableHeaderRow.classList.add("size")
tableHeader.forEach(HeaderCell => {
   
    const cell = document.createElement("th");
    const tableHeaderCellText = document.createTextNode(HeaderCell);
    cell.appendChild(tableHeaderCellText);
    tableHeaderRow.appendChild(cell);
});
let forex = {
    allCounntryCurrency: function () {
        const Location = "https://www.nrb.org.np/api/forex/v1/app-rate"
        fetch(Location)
            .then((response) => { return response.json() })
            .then((data) => { this.fetchData(data) });
    },
    fetchData: function (data) {
        // creating tables      
        data.forEach(element => {
            const allData = [
                { iso: element.iso3 },
                { country: element.name },
                { moneyUnits: element.unit },
                { sellRate: element.sell },
                { purchaseUnits: element.buy }
            ]
            // for date published
            
            document.querySelector(".date").innerText = `Date: ${element.date}`;
            document.querySelector(".publish").innerText = `Published On: ${element.published_on}`;
            document.querySelector(".modified").innerText = `Modified On: ${element.modified_on}`;           

            const cellRow = document.createElement("tr");
            allData.forEach(data => {
                Object.values(data).forEach(dataText => {
                    document.querySelector(".loadingBox").classList.remove("loading");
                    const celldata = document.createElement("td");
                    const cellText = document.createTextNode(dataText);
                    celldata.appendChild(cellText);
                    cellRow.appendChild(celldata);
                })
                tables.appendChild(cellRow);                
            })
            
        })
    }
   
};
tables.appendChild(tableHeaderRow)
tableDiv.appendChild(tables);

forex.allCounntryCurrency();
