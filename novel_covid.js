class NovelCovid {

  constructor() {
    this.baseUrl = 'https://corona.lmao.ninja';
    this.apiUrl = 'https://corona.lmao.ninja/v2';
    this.name = "NovelCOVID";
  }

  getDataUrl(isWorldWide, countryCode) {
    return isWorldWide 
      ? this.apiUrl + '/all'
      : this.apiUrl + '/countries/' + countryCode;
  }

  getAllUrl() {
    return this.apiUrl + '/countries?sort=deaths';
  }

  setFieldsDisplay(isWorldWide) {
    $('#all_tab').show();
    $('#flag').css('display', isWorldWide ? 'none' : 'block');
    $('#dangerRankDiv').css('display', 'none');
  }

  convertCountries(response) {
    let converted = [];
    for(const item of response) {
      converted.push(this.convert(item));
    }
    return converted;
  }

  convert(data, isWorldWide) {
    return {      
      total_danger_rank: '',
      country: data['country'],
      country_code: isWorldWide ? '' : data['countryInfo']['iso2'],
      total_cases: data['cases'],
      total_recovered: data['recovered'],
      total_deaths: data['deaths'],
      total_cases_today: data['todayCases'],
      total_deaths_today: data['todayDeaths'],
      total_active_cases: data['active'],
      total_critical_cases: data['critical'],
      flag_url: isWorldWide ? '' : data['countryInfo']['flag'],
      source_url: this.baseUrl,
      source_name: this.name
    };
  }
}