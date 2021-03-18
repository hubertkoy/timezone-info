$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});

$((events, handler) => {
    const getInfo = () => {
        $.ajax({
            url: "php/getTimeZoneInfo.php",
            type: 'POST',
            dataType: "json",
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val()
            },
            success: (result) => {
                console.log(result);
                if (result.status.name === "ok") {
                    // Location info
                    const data = result.data;
                    console.log(data);
                    $('#countryName').html(data.countryName);
                    $('#countryCode').html(data.countryCode);
                    $('#latVal').html(data.lat);
                    $('#lngVal').html(data.lng);
                    $('#currentTime').html(data.time);
                    $('#sunrise').html(data.sunrise);
                    $('#sunset').html(data.sunset);
                    $('#timezone').html(data.timezoneID);

                    // Query time
                    $('#returnedIn').html(result.status.returnedIn);
                }
            }
        })
            .fail((jqxhr, textStatus, error) => {
                let err = `${textStatus}, ${error}`;
                $('#errorInfo').text(`Couldn't load details about selected geos: ${err}`);
                $('#error').show();

            });
    }
    // On page load, get info about London
    $('#error').hide();
    getInfo();
    // On click Submit, get information about selected capital city.
    $('#btnRun').on('click', getInfo);
});