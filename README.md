## corona-virus-cases-chrome-extension

This is a repository to develop a Google Chrome extension. 

There are 3 tabs on the extension. On the "All Countries" main tab, you can view list of all countries in an order of deaths counts descending. Main tab only contains total number of cases, total number of deaths, cases for today and deaths for today. Clicking on Country name it will open "Country Summary" tab where you can find more details about that country like Death Rank of Country,  number of total Infection, Recovered, Deaths, Actives, Today's Cases, Today's Deaths and Critical cases. 

You can also view Worldwide stats navigating to "Worldwide Summary" tab.

If you directly navigate to "Country Summary" tab, extension opens with a country that your Chrome Browser language set as a default. Currently extensions supports 4 languages (English, Italian, Turkish and Russian), and default language is English for unsupported languages.

Main source of the data is NovelCOVID(https://corona.lmao.ninja/). You can also fetch data from a secondary source of https://thevirustracker.com by switching on UI.

You can add this extension as an Extension from Google Chrome Web Store via https://chrome.google.com/webstore/detail/coronavirus-cases/hjpiinbpfiafehfffkiohaffejlhkgkh

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
 ![English - All Countries - 1280x800](https://user-images.githubusercontent.com/21006341/80395377-000f2880-88ab-11ea-96a3-2c4a51f0aab5.jpg)


- In Italian
 ![Italian - All Countries - 1280x800](https://user-images.githubusercontent.com/21006341/80395411-0e5d4480-88ab-11ea-9a38-f8dcc6a9ca7c.jpg)
