//Add Button
$('#sidepanel').append(`
        <a href='/add_prompt' >
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
                Add New
            </li>
        </a>
    `)

//Only show outstanding applications
$('#sidepanel').append(`
        <a id='z_DESC' style='cursor: pointer'>
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
                Outstanding Applications <span id='outstandingBadgeValue' class="badge badge-primary badge-pill"></span>
            </li>
        </a>
    `)

//Sort by App Date Ascending
$('#sidepanel').append(`
        <a id='y_ASC' style='cursor: pointer'>
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
                Date Asc
            </li>
        </a>
    `)

//Sort by App Date Descending
$('#sidepanel').append(`
        <a id='y_DESC' style='cursor: pointer'>
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link active">
                Date Desc
            </li>
        </a>
    `)

//Sort by Company Name Ascending
$('#sidepanel').append(`
        <a id='x_ASC' style='cursor: pointer'>
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
                Name Asc
            </li>
        </a>
    `)

//Sort by Company Name Descending
$('#sidepanel').append(`
        <a id='x_DESC' style='cursor: pointer'>
            <li class="list-group-item d-flex justify-content-between align-items-center side-panel-link">
                Name Desc
            </li>
        </a>
    `)

// SET ACTIVE CLASS TO SIDE PANEL LINKS #############################

$(document).on("click", ".side-panel-link", function () {
    $('.side-panel-link').removeClass('active');
    $(this).addClass('active');
});