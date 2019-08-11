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

grabAllEntries('applicationSubmissionDate', -1, true)
grabEntriesOutstanding('applicationSubmissionDate', -1, true)
grabEntriesInterviews('applicationSubmissionDate', -1, true)
grabEntriesConcluded('applicationSubmissionDate', -1, true)
grabEntriesNeverResponded('applicationSubmissionDate', -1, true)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////   HIGHLIGHT ON CLICK   /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".side-panel-link", function () {
    $('.side-panel-link').removeClass('active');
    $(this).addClass('active');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  DEFINE CLICK ACTIONS   /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show all
$(document).on("click", "#allFilter", function () {
    filter.by = 'all'
    chooseRouteToHitFromFilterBy()
});

//Limit to oustanding items only
$(document).on("click", "#outstandingFilter", function () {
    filter.by = 'outstanding'
    chooseRouteToHitFromFilterBy()
});

//Limit to upcoming interviews
$(document).on("click", "#interviewFilter", function () {
    filter.by = 'interview'
    chooseRouteToHitFromFilterBy()
});

//Show concluded records
$(document).on("click", "#concludedFilter", function () {
    filter.by = 'concluded'
    chooseRouteToHitFromFilterBy()
});

//Show concluded records
$(document).on("click", "#neverRespondedFilter", function () {
    filter.by = 'neverResponded'
    chooseRouteToHitFromFilterBy()
});