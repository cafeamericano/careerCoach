//Outstanding count
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

//Concluded count
$.ajax({
    url: `/api/entries/neverresponded`,
    method: "GET"
}).then(function (response) {
    console.log(response.data)
    $('#neverRespondedBadgeValue').text(response.data.length)
})