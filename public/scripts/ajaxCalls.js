function grabEntries(x, y, z) {
    let query = `/api/entries`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortBy: x,
            orderBy: y,
            filterBy: z
        }
    }).then(function (response) {
        console.log(response.data)
        drawAdvancedCards(response)
    })
}

function grabEntriesInterviews() {
    let query = `/api/entries/interviews`
    console.log(query)
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        drawAdvancedCards(response)
    })
}

function grabEntriesConcluded() {
    let query = `/api/entries/concluded`
    console.log(query)
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        drawAdvancedCards(response)
    })
}

function grabEntriesNeverResponded() {
    let query = `/api/entries/neverresponded`
    console.log(query)
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        drawAdvancedCards(response)
    })
}

function deleteEntry(id) {
    $.ajax({
        url: `/delete/process`,
        method: "POST",
        data: {
            id: id
        }
    }).then(function (response) {
        console.log(response)
        console.log('Sent delete request.')
    })
}