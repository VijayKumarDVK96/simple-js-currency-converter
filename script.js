const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

/*
01 - To load flag using flagcdn, loop the countrylist object, and append it in image.
*/

function loadFlag(element) {
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

/*
02 - Select and loop the currency dropdown, From currency - USD; To currency - INR.
Two forms are acquired as array which is looping individually for From and To currency, where for first index (from currency), USD is hardcoded to be selected, whereas for second index (to currency), INR is hardcoded. Every currency is formatted with option tag and appended one after another inside the select tag. Finally it triggers, the loadFlag function to load the selected flag icon using current element.
*/
let selected;
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list) {
        if (i == 0) {
            selected = (currency_code == "USD") ? "selected" : "";
        } else {
            selected = (currency_code == "INR") ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

/*
03 - The function is used to get the exchange rate between two currencies. It first gets the value of the amount input field and stores it in the variable "amountVal". If the value of the input field is an empty string or 0, it sets the value of the input field to 1 and sets the value of "amountVal" to 1. It then sets the text of the element with the class "exchange-rate" to "Getting exchange rate...". Next, it creates a URL using the value of the "fromCurrency" variable and stores it in the "url" variable. It then uses the fetch function to send a request to the URL and retrieves the response in JSON format. It then retrieves the exchange rate from the response using the "toCurrency" value and stores it in the "exchangeRate" variable. It calculates the total exchange rate by multiplying "amountVal" by "exchangeRate" and rounds the result to two decimal places. Finally, it sets the text of the element with the class "exchange-rate" to display the exchange rate. If there is an error in the process, it sets the text of the element to "Something went wrong".
*/

function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/fda2161199eff63d59c6a76f/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

/*
04 - Load getExchangeRate function on page loads, and after button clicks.
*/

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

/*
05 - Swap the currency and exchanges its respective values, trigger the flag cdn and execute the currency conversion.
*/

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})