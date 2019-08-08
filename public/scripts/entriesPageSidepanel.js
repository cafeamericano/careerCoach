//Add Button
$('#sidepanel').append(`
    <a href='/add_prompt' >
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
            Add New
        </li>
    </a>
`)

//Show all applications
$('#sidepanel').append(`
    <a id='allFilter' style='cursor: pointer'>
        <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
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

// SET ACTIVE CLASS TO SIDE PANEL LINKS #############################

$(document).on("click", ".side-panel-link", function () {
    $('.side-panel-link').removeClass('active');
    $(this).addClass('active');
});