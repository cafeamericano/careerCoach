function grabAllEntries(sortColumn, sortOrder) {
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
        drawAdvancedCards(response)
    })
}

function grabEntriesOutstanding(sortColumn, sortOrder) {
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
        drawAdvancedCards(response)
    })
}

function grabEntriesInterviews(sortColumn, sortOrder) {
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
        drawAdvancedCards(response)
    })
}

function grabEntriesConcluded(sortColumn, sortOrder) {
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
        drawAdvancedCards(response)
    })
}

function grabEntriesNeverResponded(sortColumn, sortOrder) {
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
        drawAdvancedCards(response)
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