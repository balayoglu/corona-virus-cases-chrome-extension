class NovelCovid {

  constructor() {
    this.baseUrl = 'https://corona.lmao.ninja';
    this.apiUrl = 'https://corona.lmao.ninja';
    this.name = "NovelCOVID";
  }

  getDataUrl(isWorldWide, countryCode) {
    return isWorldWide 
      ? this.apiUrl + '/all'
      : this.apiUrl + '/countries/' + countryCode;
  }

  setFieldsDisplay(isWorldWide) {
    $('#flag').css('display', isWorldWide ? 'none' : 'block');
    $('#danger-rank-tr').css('display', 'none');
  }

  convert(data, isWorldWide) {
    return {
      total_danger_rank: '',
      total_cases: data['cases'],
      total_recovered: data['recovered'],
      total_deaths: data['deaths'],
      total_new_cases_today: data['todayCases'],
      total_new_deaths_today: data['todayDeaths'],
      total_active_cases: data['active'],
      total_serious_cases: data['critical'],
      flag_url: isWorldWide ? '' : data['countryInfo']['flag'],
      source_url: this.baseUrl,
      source_name: this.name
    };
  }
}