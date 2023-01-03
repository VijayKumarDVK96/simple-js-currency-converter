# Currency Converter with Javascript

**DEMO :** https://fabulous-cobbler-926567.netlify.app/

Developed a responsive website for Currency Conversion with Javascript where user can choose FROM & TO currency code with values to be convert.

> **Technologies used:** HTML, CSS, JS, Flagcdn - Fetch country icon using country code, ExchangeRate - Currency Converter API

# Pseudo Code

 - Country list and its respective country code is stored as object.
 - To load flag using flagcdn, loop the countrylist object, and append it in image.
 - Select and loop the currency dropdown, From currency - USD; To currency - INR.
Two forms are acquired as array which is looping individually for From and To currency, where for first index (from currency), USD is hardcoded to be selected, whereas for second index (to currency), INR is hardcoded. Every currency is formatted with option tag and appended one after another inside the select tag. Finally it triggers, the loadFlag function to load the selected flag icon using current element.
- The function is used to get the exchange rate between two currencies. It first gets the value of the amount input field and stores it in the variable "amountVal". If the value of the input field is an empty string or 0, it sets the value of the input field to 1 and sets the value of "amountVal" to 1. It then sets the text of the element with the class "exchange-rate" to "Getting exchange rate...". Next, it creates a URL using the value of the "fromCurrency" variable and stores it in the "url" variable. It then uses the fetch function to send a request to the URL and retrieves the response in JSON format. It then retrieves the exchange rate from the response using the "toCurrency" value and stores it in the "exchangeRate" variable. It calculates the total exchange rate by multiplying "amountVal" by "exchangeRate" and rounds the result to two decimal places. Finally, it sets the text of the element with the class "exchange-rate" to display the exchange rate. If there is an error in the process, it sets the text of the element to "Something went wrong".
- Swap the currency and exchanges its respective values, trigger the flag cdn and execute the currency conversion.