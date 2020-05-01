'use strict';

const worldwide = "worldwide";
const defaultCountryCode = "gb";
const allTab = "all_tab";
const worldwideTab = "worldwide_tab";
const countryTab = "country_tab";
const topListTab = "top_list_tab";

$(function() {

  let sourceApi = new NovelCovid();
  let alternativeSourceApi = new VirusTracker();

  initialize();

  load_all_stats();

  function load_all_stats() {
    doAjaxCall(sourceApi.getAllUrl(), function (response) {
      const data = sourceApi.convertCountries(response);
      populateCountriesTable(data);
    });
  }

  function load_summary_stats(countryCode) {
    reset();

    let setCountryCode = !(!countryCode);
    if(!countryCode) {
      countryCode = $('#country_code').val();
    }

    const isWorldWide = countryCode === worldwide;
    if(setCountryCode && !isWorldWide) {
       $('#country_code').val(countryCode.toLowerCase());
    }

    doAjaxCall(sourceApi.getDataUrl(isWorldWide, countryCode), function (response) {
      sourceApi.setFieldsDisplay(isWorldWide);
      let convertedData = sourceApi.convert(response, isWorldWide, countryCode);
      $('#flag').attr('src', convertedData['flag_url']);
      if(isWorldWide)
        set_global_stats(convertedData);
      else
        set_country_stats(convertedData);
    });
  }

  function doAjaxCall(url, success) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      success,
      error: function (xhr, ajaxOptions, thrownError) {
        console.log('xhr', xhr);
        console.log('thrownError', thrownError);
        $('#message').css('display', 'block');
        $('#message').text(get_i18n_message('service_error'));
      }
    }
    
    $.ajax(settings);
  }

  function populateCountriesTable(data) {
    var table_body = '<table class="tableFixHead">';
    table_body += '<thead>';
    table_body += '<tr>';
    table_body += '<th class="text-center">' + get_i18n_message('danger_rank') + '</th>';
    table_body += '<th class="th-country">' + get_i18n_message('country') + '</th>';
    table_body += '<th>' + get_i18n_message('total_cases') + '</th>';
    table_body += '<th>' + get_i18n_message('total_deaths') + '</th>';
    table_body += '<th>' + get_i18n_message('today_cases') + '</th>';
    table_body += '<th>' + get_i18n_message('today_deaths') + '</th>';
    table_body += '</tr>';
    table_body += '</thead>';
    table_body += '<tbody>';
    for(let i=0;i<data.length;i++){
      table_body+='<tr>';
      table_body += '<td class="text-center">' + (i+1) + '</td>';
      table_body += '<td>';
      table_body += '<img src="' + data[i].flag_url + '" class="flag"/>';
      table_body += '<a href="" country-id="' + data[i].country_code + '" class="country_link">' + data[i].country + '</a>';
      table_body += '</td>';
      table_body += '<td>' + data[i].total_cases.toLocaleString() + '</td>';
      table_body += '<td>' + data[i].total_deaths.toLocaleString() + '</td>';
      table_body += '<td>+' + data[i].total_cases_today.toLocaleString() + '</td>';
      table_body += '<td>+' + data[i].total_deaths_today.toLocaleString() + '</td>';
      table_body+='</tr>';
    }
    table_body += '</tbody>';
    table_body+='</table>';
    $('#all').html(table_body);

    $('.country_link').click(function(evt) {
      evt.preventDefault();
      setTab(evt, "country", countryTab);
      initializeCountryTab($(this).attr("country-id"));
    });
  }

  function initialize() {
    setSourceFields();

    $('#data_source').click(function() {
      chrome.tabs.create({"url": $(this).attr("href")});
    });    

    $('#data_alternative_source').click(function() {
      let activeTab = $('.tablinks.active').attr('id');
      let temp = alternativeSourceApi;
      alternativeSourceApi = sourceApi;
      sourceApi = temp;
      setSourceFields();
      sourceApi.setFieldsDisplay(false);      

      if(activeTab === worldwideTab) {
        load_summary_stats(worldwide);
      } else if(activeTab === countryTab) {
        load_summary_stats();
      } else if($('#all_tab').is(":visible")) {
        load_all_stats();
      } else {
        setTab(null, "country", worldwideTab);
        initializeWorldWideTab();
      }
      
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
      load_summary_stats();
    });

    jQuery.ajaxSetup({
      beforeSend: function() {
         $('#loader').show();
      },
      complete: function() {
         $('#loader').hide();
      }
    });

    $('#all_tab').click(function(evt) { setTab(evt, "all"); });
    $('#top_list_tab').click(function(evt) { setTab(evt, "top_list"); initializeTopListTab(); });
    $('#country_tab').click(function(evt) { setTab(evt, "country"); initializeCountryTab(); });
    $('#worldwide_tab').click(function(evt) { setTab(evt, "country"); initializeWorldWideTab(); });
  }

  function initializeCountryTab(countryCode) {
    $('#country_code').show();
    $('#flagDiv').show();
    load_summary_stats(countryCode);
  }

  function initializeWorldWideTab() {
    $('#country_code').hide();
    $('#flagDiv').hide();
    load_summary_stats(worldwide);
  }

  function initializeTopListTab() {
    doAjaxCall(sourceApi.getAllUrl(), function (response) {
      const data = sourceApi.getTopList(response);
      populateTopListTable(data);
    });
  }

  function populateTopListTable(data) {
    $('#total_cases_top').text(data['total_cases'].toLocaleString());
    $('#total_cases_top_flag').attr('src', data['total_cases_flag']);
    $('#total_cases_top_flag').attr('title', data['total_cases_country']);

    $('#total_recovered_top').text(data['total_recovered'].toLocaleString());
    $('#total_recovered_top_flag').attr('src', data['total_recovered_flag']);
    $('#total_recovered_top_flag').attr('title', data['total_recovered_country']);

    $('#total_deaths_top').text(data['total_deaths'].toLocaleString());
    $('#total_deaths_top_flag').attr('src', data['total_deaths_flag']);
    $('#total_deaths_top_flag').attr('title', data['total_deaths_country']);

    $('#today_cases_top').text('+' + data['total_cases_today'].toLocaleString());
    $('#today_cases_top_flag').attr('src', data['total_cases_today_flag']);
    $('#today_cases_top_flag').attr('title', data['total_cases_today_country']);

    $('#today_deaths_top').text('+' + data['total_deaths_today'].toLocaleString());
    $('#today_deaths_top_flag').attr('src', data['total_deaths_today_flag']);
    $('#today_deaths_top_flag').attr('title', data['total_deaths_today_country']);

    $('#total_active_top').text(data['total_active_cases'].toLocaleString());
    $('#total_active_top_flag').attr('src', data['total_active_cases_flag']);
    $('#total_active_top_flag').attr('title', data['total_active_cases_country']);

    $('#total_serious_top').text(data['total_critical_cases'].toLocaleString());
    $('#total_serious_top_flag').attr('src', data['total_critical_cases_flag']);
    $('#total_serious_top_flag').attr('title', data['total_critical_cases_country']);

    $('#total_tests_top').text(data['total_tests'].toLocaleString());
    $('#total_tests_top_flag').attr('src', data['total_tests_flag']);
    $('#total_tests_top_flag').attr('title', data['total_tests_country']);

    $('#data_source').attr('href', data['source_url']);
    $('#data_source').text(data['source_name']);
    $('#data_alternative_source').text(alternativeSourceApi.name);
  }

  function setTab(evt, tabContentId, tabId) {
    $('.tabcontent').hide();
    $('.tablinks').removeClass('active');
    if(tabId) {
      $('#' + tabId).addClass('active');
    } else {
      evt.currentTarget.className += " active";
    }
    $('#' + tabContentId).show();
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
    set_common_stats(data);
  }

  function set_country_stats(data) {
    $('#danger_rank').text(data['total_danger_rank']);
    set_common_stats(data);
  }

  function set_common_stats(data) {
    $('#total_cases').text(data['total_cases'].toLocaleString());
    $('#total_recovered').text(data['total_recovered'].toLocaleString());
    $('#total_deaths').text(data['total_deaths'].toLocaleString());
    $('#today_cases').text('+' + data['total_cases_today'].toLocaleString());
    $('#today_deaths').text('+' + data['total_deaths_today'].toLocaleString());    
    $('#total_active').text(data['total_active_cases'].toLocaleString());
    $('#total_serious').text(data['total_critical_cases'].toLocaleString());
    $('#total_tests').text(data['total_tests'].toLocaleString());
    $('#data_source').attr('href', data['source_url']);
    $('#data_source').text(data['source_name']);
    $('#data_alternative_source').text(alternativeSourceApi.name);
  }
});