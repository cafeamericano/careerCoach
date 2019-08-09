let filter = {
    by: 'all'
}

let sort = {
    column: 'applicationSubmissionDate',
    order: -1
}

$(document).on("click", "#sort_appDateDesc", function () {
    sort.column = 'applicationSubmissionDate';
    sort.order = -1
    chooseRouteToHitFromFilterBy()
});

$(document).on("click", "#sort_appDateAsc", function () {
    sort.column = 'applicationSubmissionDate';
    sort.order = 1
    chooseRouteToHitFromFilterBy()
});

$(document).on("click", "#sort_companyAsc", function () {
    sort.column = 'companyName';
    sort.order = 1
    chooseRouteToHitFromFilterBy()
});

$(document).on("click", "#sort_companyDesc", function () {
    sort.column = 'companyName';
    sort.order = -1
    chooseRouteToHitFromFilterBy()
});