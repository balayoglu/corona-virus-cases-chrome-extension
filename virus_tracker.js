'use strict';

class VirusTracker extends SourceBase  {

  constructor() {
    super();
    this.baseUrl = 'https://thevirustracker.com';
    this.apiUrl = 'https://api.thevirustracker.com';
    this.name = "The Virus Tracker";
  }

  getDataUrl(isWorldWide, countryCode) {
    return isWorldWide 
      ? this.apiUrl + '/free-api?global=stats'
      : this.apiUrl + '/free-api?countryTotal=' + countryCode;
  }

  setFieldsDisplay(isWorldWide) {
    $('#all_tab').hide();
    $('#top_list_tab').hide();
    $('#flag').css('display', isWorldWide ? 'none' : 'block');
    $('#dangerRankDiv').css('display', isWorldWide ? 'none' : '');
  }

  convert(response, isWorldWide, countryCode) {
    let data = isWorldWide ? response['results'][0] : response['countrydata'][0];
    return {
      total_danger_rank: isWorldWide ? '' : data['total_danger_rank'],
      total_cases: super.getDefaultValue(data['total_cases']),
      total_recovered: super.getDefaultValue(data['total_recovered']),
      total_deaths: super.getDefaultValue(data['total_deaths']),
      total_cases_today: super.getDefaultValue(data['total_new_cases_today']),
      total_deaths_today: super.getDefaultValue(data['total_new_deaths_today']),
      total_active_cases: super.getDefaultValue(data['total_active_cases']),
      total_critical_cases: super.getDefaultValue(data['total_serious_cases']),
      total_tests: '',
      cases_death_percentage: super.getCasesDeathPercentage(data['total_cases'], data['total_deaths']),
      flag_url: isWorldWide ? '' : this.baseUrl + '/images/flags/' + countryCode + '.png',
      source_url: isWorldWide ? data['source']['url'] : data['info']['source'],
      source_name: this.name
    };
  }
}