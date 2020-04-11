const worldwide = "worldwide";
$(function() {

  const splits = navigator.language.split("-");
  let country = splits[0];
  if(splits.length == 2) {
    country = splits[1];    
  }

  if(!country) {
    country = worldwide;
  }

  $('#country_code').val(country.toLowerCase());

  load_stats();

  $('#country_code').change(function(){
    load_stats();
  });

  function load_stats() {
    clear_stats();

    const countryCode = $('#country_code').val();
    let imgSrc = "";
    let url = "https://api.thevirustracker.com/free-api?global=stats";
    const isWorldWide = countryCode === worldwide;

    if(!isWorldWide) {
      imgSrc = 'https://thevirustracker.com/images/flags/' + countryCode + '.png';
      url = "https://api.thevirustracker.com/free-api?countryTotal=" + countryCode;
    }

    $('#country_img').attr('src',imgSrc);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      success: function (response) {
        if(isWorldWide) set_global_stats(response);
        else set_country_stats(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr);
        console.log(thrownError);
        alert("Error getting statistics.");
      }
    }
    
    $.ajax(settings);
  }

  function clear_stats() {
    $('#danger_rank').text('');
    $('#total_cases').text('');
    $('#total_recovered').text('');
    $('#total_deaths').text('');
    $('#today_cases').text('');
    $('#today_deaths').text('');
    $('#total_active').text('');
    $('#total_serious').text('');
  }

  function set_global_stats(response) {
    let data = response.results[0];
    $('#country-tr').css('display', 'none');
    $('#danger-rank-tr').css('display', 'none');
    set_stats(data);
  }

  function set_country_stats(response) {
    let data = response['countrydata'][0];
    $('#country-tr').css('display', '');
    $('#danger-rank-tr').css('display', '');
    $('#danger_rank').text(data['total_danger_rank']);
    set_stats(data);
  }

  function set_stats(data) {
    $('#total_cases').text(data['total_cases']);
    $('#total_recovered').text(data['total_recovered']);
    $('#total_deaths').text(data['total_deaths']);
    $('#today_cases').text(data['total_new_cases_today']);
    $('#today_deaths').text(data['total_new_deaths_today']);
    $('#today_cases').text(data['total_new_cases_today']);
    $('#today_deaths').text(data['total_new_deaths_today']);
    $('#total_active').text(data['total_active_cases']);
    $('#total_serious').text(data['total_serious_cases']);
  }
});