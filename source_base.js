class SourceBase {
  getDefaultValue(value, defaultValue = 0) {
    if(!value) {
      return defaultValue;
    }
    return value;
  }

  getCasesDeathPercentage(cases, deaths) {
    return cases == 0 ? 0 : Math.round(deaths * 100 / cases * 10) / 10;
  }
}