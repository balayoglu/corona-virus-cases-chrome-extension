## corona-virus-cases-chrome-extension

This is a repository to develop a Google Chrome extension. Via this extension you can track Corona Virus Cases choosing the country from the list.

It gives information about the Death Rank of Country,  number of total Infection, Recovered, Deaths, Actives, Today's Cases, Today's Deaths and Serious cases. You can also track Worldwide stats choosing Worldwide from the list. Currently it supports 4 languages (English, Italian, Turkish and Russian).

You can add this extension as an Extension from Google Chrome Web Store via this link https://chrome.google.com/webstore/detail/corona-virus-cases/hjpiinbpfiafehfffkiohaffejlhkgkh

## Tech stack used:
 - HTML
 - CSS
 - JavaScript
 - JQuery
 - REST API

## How it works?

It gets data using the REST API of https://github.com/novelcovid/api. There is also alternative REST API of https://thevirustracker.com:

- To get World Wide Covid-19 statistics we are using either https://corona.lmao.ninja/all or https://api.thevirustracker.com/free-api?global=stats REST endpoints.
- To get Covid-19 data for a specific country, passing country code (e.g. gb for Great Britain, us for USA, etc...) as a query parameter to the REST endpoints https://corona.lmao.ninja/countries/{countryCode} or https://api.thevirustracker.com/free-api?countryTotal={countryCode} you can get the statistics to that country only.

Extension is implemented in a way that, as a default it selects a country that is your Chrome Browser language set. For example, if your browser's language is gb-GB it fetches data for the country code 'gb'.
 
 ## How to add extension locally and test on the Chrome?
 - Write chrome://extensions/ on the address bar of Chrome
 - Enable Developer mode
 - Then you will see extra options as "Load unpacked", click on it
 - From the opened dialog chose the folder where Extension codes reside
 
 ## Snapshots
 
 ![Add Extension Locally](https://user-images.githubusercontent.com/21006341/79047516-f335d800-7c0e-11ea-8251-add240e6631c.jpg)
 
 - In English
 ![English - Snapshots 1280x800](https://user-images.githubusercontent.com/21006341/79264369-5da77c00-7e8c-11ea-85e7-cee730ff22f8.jpg)

- In Italian
 ![Italian - Snapshots 1280x800](https://user-images.githubusercontent.com/21006341/79264398-6ac46b00-7e8c-11ea-9701-1ddc213ae916.jpg)
