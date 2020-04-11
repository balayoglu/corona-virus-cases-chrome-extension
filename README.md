## corona-virus-cases-chrome-extension

This is a repository to develop a Google Chrome extension. Via this extension you can track Corona Virus Cases choosing the country from the list.

It gives information about the Death Rank of Country,  number of total Infection, Recovered, Deaths, Actives, Today's Cases, Today's Deaths and Serious cases. You can also track Worldwide stats choosing Worldwide from the list.

You can add this extension as an Extension from Google Chrom Web Store.

## How it works?

It gets data from https://thevirustracker.com using following REST APIs:

- To get World Wide Covid-19 statistics https://api.thevirustracker.com/free-api?global=stats REST endpoint has been used.
- To get Covid-19 data for a specific country, passing country code (e.g. gb for Great Britain, us for USA, etc...) as a query parameter to the REST endpoint https://api.thevirustracker.com/free-api?countryTotal={countryCode} you can get the statistics to that country only.

Extension is implemented in a way that, as a default it selects a country that is your Chrome Browser language set. For example, if your browser's language is gb-GB it fetches data for the country code 'gb'.

## Tech stack used:
 - HTML
 - CSS
 - JavaScript
 - JQuery
 - REST API