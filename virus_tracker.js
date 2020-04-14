'use strict';

class VirusTracker {

  constructor() {
    this.baseUrl = 'https://api.thevirustracker.com';
    this.name = "The Virus Tracker";
  }

  getDataUrl(isWorldWide, countryCode) {
    return isWorldWide 
      ? this.baseUrl + '/free-api?global=stats'
      : this.baseUrl + '/free-api?countryTotal=' + countryCode;
  }

  setFieldsDisplay(isWorldWide) {
    $('#flag').css('display', isWorldWide ? 'none' : 'block');
    $('#danger-rank-tr').css('display', isWorldWide ? 'none' : '');
  }

  convert(response, isWorldWide, countryCode) {
    let data = response['countrydata'][0];
    return {
      total_danger_rank: isWorldWide ? '' : data['total_danger_rank'],
      total_cases: data['total_cases'],
      total_recovered: data['total_recovered'],
      total_deaths: data['total_deaths'],
      total_new_cases_today: data['total_new_cases_today'],
      total_new_deaths_today: data['total_new_deaths_today'],
      total_active_cases: data['total_active_cases'],
      total_serious_cases: data['total_serious_cases'],
      flag_url: isWorldWide ? data['source']['url'] : this.baseUrl + '/images/flags/' + countryCode + '.png',
      source_url: data['info']['source'],
      source_name: this.name
    };
  }
}