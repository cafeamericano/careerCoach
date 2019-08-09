////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  APPEND LINKS   /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Add Button
$('#sidepanel').append(`
<br>
    <a href='/add_prompt' >
        <li style='border-radius: 15px'>
            <div class='text-center'>
                <i style='font-size: 50px; color: white' class="material-icons">add_circle_outline</i>
            </div>
        </li>
    </a>
<br>
`)

//Show all applications
$('#sidepanel').append(`
    <a id='allFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link active">
            All Applications <span id='allApplicationsBadgeValue' class="badge badge-primary badge-pill"></span>
        </li>
    </a>
`)

//Only show outstanding applications
$('#sidepanel').append(`
    <a id='outstandingFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
            Outstanding Applications <span id='outstandingBadgeValue' class="badge badge-primary badge-pill"></span>
        </li>
    </a>
`)

//Only show upcoming interviews
$('#sidepanel').append(`
    <a id='interviewFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
            Upcoming Interviews <span id='interviewsBadgeValue' class="badge badge-primary badge-pill"></span>
        </li>
    </a>
`)

//Concluded applications
$('#sidepanel').append(`
    <a id='concludedFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
            Concluded Applications <span id='concludedBadgeValue' class="badge badge-primary badge-pill"></span>
        </li>
    </a>
`)

//Never responded applications
$('#sidepanel').append(`
    <a id='neverRespondedFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
            Never Responded <span id='neverRespondedBadgeValue' class="badge badge-primary badge-pill"></span>
        </li>
    </a>
`)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  INSERT BADGE COUNTS   /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All applications count
$.ajax({
    url: `/api/entries`,
    method: "GET",
    data: {
        sortBy: 'applicationSubmissionDate',
        orderBy: -1
    }
}).then(function (response) {
    $('#allApplicationsBadgeValue').text(response.data.length)
})

//Outstanding count
$.ajax({
    url: `/api/entries`,
    method: "POST",
    data: {
        sortBy: 'applicationSubmissionDate',
        orderBy: -1,
        filterBy: 'Outstanding'
    }
}).then(function (response) {
    $('#outstandingBadgeValue').text(response.data.length)
})

//Interviews count
$.ajax({
    url: `/api/entries/interviews`,
    method: "GET"
}).then(function (response) {
    console.log(response.data)
    $('#interviewsBadgeValue').text(response.data.length)
})

//Concluded count
$.ajax({
    url: `/api/entries/concluded`,
    method: "GET"
}).then(function (response) {
    console.log(response.data)
    $('#concludedBadgeValue').text(response.data.length)
})

//Never responded account
$.ajax({
    url: `/api/entries/neverresponded`,
    method: "GET"
}).then(function (response) {
    console.log(response.data)
    $('#neverRespondedBadgeValue').text(response.data.length)
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////   HIGHLIGHT ON CLICK   /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".side-panel-link", function () {
    $('.side-panel-link').removeClass('active');
    $(this).addClass('active');
});