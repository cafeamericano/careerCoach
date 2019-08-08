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