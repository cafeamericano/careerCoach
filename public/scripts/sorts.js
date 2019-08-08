// SORTS ############################################################

//Sort by Company Name Ascending
$(document).on("click", "#x_ASC", function () {
    $('#recordsContainer').empty()
    grabEntries('companyName', 1)
});

//Sort by Company Name Ascending
$(document).on("click", "#x_DESC", function () {
    $('#recordsContainer').empty()
    grabEntries('companyName', -1)
});

//Sort by Company Name Ascending
$(document).on("click", "#y_ASC", function () {
    $('#recordsContainer').empty()
    grabEntries('applicationSubmissionDate', 1)
});

//Sort by Company Name Ascending
$(document).on("click", "#y_DESC", function () {
    $('#recordsContainer').empty()
    grabEntries('applicationSubmissionDate', -1)
});

//Limit to oustanding items only
$(document).on("click", "#z_DESC", function () {
    $('#recordsContainer').empty()
    grabEntries('applicationSubmissionDate', -1, 'Outstanding')
});