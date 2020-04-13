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

It gets data from https://thevirustracker.com using following REST APIs:

- To get World Wide Covid-19 statistics https://api.thevirustracker.com/free-api?global=stats REST endpoint has been used.
- To get Covid-19 data for a specific country, passing country code (e.g. gb for Great Britain, us for USA, etc...) as a query parameter to the REST endpoint https://api.thevirustracker.com/free-api?countryTotal={countryCode} you can get the statistics to that country only.

Extension is implemented in a way that, as a default it selects a country that is your Chrome Browser language set. For example, if your browser's language is gb-GB it fetches data for the country code 'gb'.
 
 ## How to add extension locally and test on the Chrome?
 - Write chrome://extensions/ on the address bar of Chrome
 - Enable Developer mode
 - Then you will see extra options as "Load unpacked", click on it
 - From the opened dialog chose the folder where Extension codes reside
 
 ## Snapshots
 
 ![Add Extension Locally](https://user-images.githubusercontent.com/21006341/79047516-f335d800-7c0e-11ea-8251-add240e6631c.jpg)
 
 ![English - Snapshots](https://user-images.githubusercontent.com/21006341/79144580-1bf8d180-7db7-11ea-8798-23da71af46fe.jpg)

 ![Italian - Snapshots](https://user-images.githubusercontent.com/21006341/79144608-2b781a80-7db7-11ea-9650-5b5c853abbfc.jpg)

 ![Turkish - Snapshots](https://user-images.githubusercontent.com/21006341/79144641-37fc7300-7db7-11ea-9d34-49a2a4d2f4e0.jpg)

 ![Russian - Snapshots](https://user-images.githubusercontent.com/21006341/79144672-4480cb80-7db7-11ea-9204-df80967b6992.jpg)
