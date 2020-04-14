'use strict';

const worldwide = "worldwide";
const defaultCountryCode = "gb";

$(function() {

  let sourceApi = new NovelCovid();
  let alternativeSourceApi = new VirusTracker();

  initialize();

  load_stats();

  function load_stats() {
    reset();

    const countryCode = $('#country_code').val();
    const isWorldWide = countryCode === worldwide;

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": sourceApi.getDataUrl(isWorldWide, countryCode),
      "method": "GET",
      success: function (response) {
        sourceApi.setFieldsDisplay(isWorldWide);
        let convertedData = sourceApi.convert(response, isWorldWide, countryCode);
        $('#flag').attr('src', convertedData['flag_url']);
        if(isWorldWide)
          set_global_stats(convertedData);
        else
          set_country_stats(convertedData);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log('xhr', xhr);
        console.log('thrownError', thrownError);
        $('#message').css('display', 'block');
        $('#message').text(get_i18n_message('service_error'));
      }
    }
    
    $.ajax(settings);
  }

  function initialize() {
    setSourceFields();

    $('#data_source').click(function() {
      chrome.tabs.create({"url": $(this).attr("href")});
    });

    $('#data_alternative_source').click(function() {
      let temp = alternativeSourceApi;
      alternativeSourceApi = sourceApi;
      sourceApi = temp;
      setSourceFields();
      sourceApi.setFieldsDisplay(false);
      load_stats();
      return false;
    });
  
    document.querySelectorAll('[data-locale]').forEach(elem => {
      elem.innerText = get_i18n_message(elem.dataset.locale);
    })
  
    const splits = navigator.language.split("-");
    let country = splits[0];
    if(splits.length == 2) {
      country = splits[1];    
    }
  
    if(!country) {
      country = worldwide;
    }
  
    $('#country_code').val(country.toLowerCase());    
    if(!$('#country_code').val()) {
      $('#country_code').val(defaultCountryCode);
    }

    $('#country_code').change(function(){
      load_stats();
    });

    jQuery.ajaxSetup({
      beforeSend: function() {
         $('#loader').show();
      },
      complete: function() {
         $('#loader').hide();
      },
      success: function() {}
    });
  }

  function get_i18n_message(messageId) {
    if(chrome.i18n) {
      return chrome.i18n.getMessage(messageId);
    }
    return messageId;
  }

  function setSourceFields() {
    $('#data_source').attr('href', sourceApi.baseUrl);
    $('#data_source').text(sourceApi.name);
    $('#data_alternative_source').text(alternativeSourceApi.name);    
  }

  function reset() {
    $('#message').css('display', 'none');
    $('#message').html('');
    $('#flag').attr('src', '');
    $('#danger_rank').text('');
    $('#total_cases').text('');
    $('#total_recovered').text('');
    $('#total_deaths').text('');
    $('#today_cases').text('');
    $('#today_deaths').text('');
    $('#total_active').text('');
    $('#total_serious').text('');
  }

  function set_global_stats(data) {
    // $('#flag').css('display', 'none');
    // $('#danger-rank-tr').css('display', 'none');
    set_common_stats(data);
  }

  function set_country_stats(data) {
    // $('#flag').css('display', 'block');
    // $('#danger-rank-tr').css('display', '');
    $('#danger_rank').text(data['total_danger_rank']);
    set_common_stats(data);
  }

  function set_common_stats(data) {
    $('#total_cases').text(data['total_cases'].toLocaleString());
    $('#total_recovered').text(data['total_recovered'].toLocaleString());
    $('#total_deaths').text(data['total_deaths'].toLocaleString());
    $('#today_cases').text(data['total_new_cases_today'].toLocaleString());
    $('#today_deaths').text(data['total_new_deaths_today'].toLocaleString());
    $('#today_cases').text(data['total_new_cases_today'].toLocaleString());
    $('#today_deaths').text(data['total_new_deaths_today'].toLocaleString());
    $('#total_active').text(data['total_active_cases'].toLocaleString());
    $('#total_serious').text(data['total_serious_cases'].toLocaleString());
    $('#data_source').attr('href', data['source_url']);
    $('#data_source').text(data['source_name']);
    $('#data_alternative_source').text(alternativeSourceApi.name);
  }
});