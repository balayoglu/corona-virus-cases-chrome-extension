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
    $('#top_list_tab').show();
    $('#flag').css('display', isWorldWide ? 'none' : 'block');
    $('#dangerRankDiv').css('display', 'none');
  }

  getTopList(response) {
    let result = {
      country: response[0]['country'],
      total_deaths: response[0]['deaths'],
      total_deaths_flag: this.getCountryFlag(response[0]),
      source_url: this.baseUrl,
      source_name: this.name
    };

    let data = this.findMax(response, "cases");
    result.total_cases = data['cases'];
    result.total_cases_country = data['country'];
    result.total_cases_flag = this.getCountryFlag(data);

    data = this.findMax(response, "recovered");
    result.total_recovered = data['recovered'];
    result.total_recovered_country = data['country'];
    result.total_recovered_flag = this.getCountryFlag(data);

    data = this.findMax(response, "todayCases");
    result.total_cases_today = data['todayCases'];
    result.total_cases_today_country = data['country'];
    result.total_cases_today_flag = this.getCountryFlag(data);

    data = this.findMax(response, "todayDeaths");
    result.total_deaths_today = data['todayDeaths'];
    result.total_deaths_today_country = data['country'];
    result.total_deaths_today_flag = this.getCountryFlag(data);

    data = this.findMax(response, "tests");
    result.total_tests = data['tests'];
    result.total_tests_country = data['country'];
    result.total_tests_flag = this.getCountryFlag(data);

    data = this.findMax(response, "active");
    result.total_active_cases = data['active'];
    result.total_active_cases_country = data['country'];
    result.total_active_cases_flag = this.getCountryFlag(data);

    data = this.findMax(response, "critical");
    result.total_critical_cases = data['critical'];
    result.total_critical_cases_country = data['country'];
    result.total_critical_cases_flag = this.getCountryFlag(data);

    return result;
  }

  getCountryFlag(data) {
    return data['countryInfo']['flag'];
  }

  findMax(arr, key) {
    arr.sort(function(a, b) {
      return (a[key] >= b[key]) ? -1 : 1;
    });

    return arr[0];
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
      total_tests: data['tests'],
      flag_url: isWorldWide ? '' : data['countryInfo']['flag'],
      source_url: this.baseUrl,
      source_name: this.name
    };
  }
}