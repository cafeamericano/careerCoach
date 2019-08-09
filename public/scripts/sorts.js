////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////     FILTER      /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show all
$(document).on("click", "#allFilter", function () {
    $('#recordsContainer').empty()
    grabEntries('applicationSubmissionDate', -1)
});

//Limit to oustanding items only
$(document).on("click", "#outstandingFilter", function () {
    $('#recordsContainer').empty()
    grabEntriesOutstanding()
});

//Limit to upcoming interviews
$(document).on("click", "#interviewFilter", function () {
    $('#recordsContainer').empty()
    grabEntriesInterviews()
});

//Show concluded records
$(document).on("click", "#concludedFilter", function () {
    $('#recordsContainer').empty()
    grabEntriesConcluded()
});

//Show concluded records
$(document).on("click", "#neverRespondedFilter", function () {
    $('#recordsContainer').empty()
    grabEntriesNeverResponded()
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////      SORT       /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Sort by Company Name Ascending
// $(document).on("click", "#x_ASC", function () {
//     $('#recordsContainer').empty()
//     grabEntries('companyName', 1)
// });

// //Sort by Company Name Ascending
// $(document).on("click", "#x_DESC", function () {
//     $('#recordsContainer').empty()
//     grabEntries('companyName', -1)
// });

// //Sort by Company Name Ascending
// $(document).on("click", "#y_ASC", function () {
//     $('#recordsContainer').empty()
//     grabEntries('applicationSubmissionDate', 1)
// });

// //Sort by Company Name Ascending
// $(document).on("click", "#y_DESC", function () {
//     $('#recordsContainer').empty()
//     grabEntries('applicationSubmissionDate', -1)
// });