function grabAllEntries(sortColumn, sortOrder, forBadge) {
    let query = `/api/entries/all`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge){
            $('#allApplicationsBadgeValue').text(response.data.length)
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesOutstanding(sortColumn, sortOrder, forBadge) {
    let query = `/api/entries/outstanding`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge){
            $('#outstandingBadgeValue').text(response.data.length)
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesInterviews(sortColumn, sortOrder, forBadge) {
    let query = `/api/entries/interviews`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge){
            $('#interviewsBadgeValue').text(response.data.length)
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesConcluded(sortColumn, sortOrder, forBadge) {
    let query = `/api/entries/concluded`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge){
            $('#concludedBadgeValue').text(response.data.length)
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesNeverResponded(sortColumn, sortOrder, forBadge) {
    let query = `/api/entries/neverresponded`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge){
            $('#neverRespondedBadgeValue').text(response.data.length)
        } else {
            drawAdvancedCards(response)
        }
    })
}

function openCardForEditing(id) {
    $.ajax({
        url: `/edit_prompt`,
        method: "POST",
        data: {
            id: id
        }
    }).then(function (response) {
        console.log('Sent delete request.')
    })
    window.location.replace()
}