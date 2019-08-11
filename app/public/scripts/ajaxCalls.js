////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  ENSURE USER IS AUTHORIZED   ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function authorizeUser() {
    let query = `/authorize_user`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log('should redirect')
        console.log(response)
        if (response.length === 0) {
            console.log('now attempting redirect')
            window.location.replace('/')
        }
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  GRAB FILTERED DATA FROM API   ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function grabAllEntries(sortColumn, sortOrder, forBadge) {
    authorizeUser()
    let query = `/api/entries/all`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder,
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge) {
            if (response.data.length !== 0) {
                $('#allApplicationsBadgeValue').text(response.data.length)
            }
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesOutstanding(sortColumn, sortOrder, forBadge) {
    authorizeUser()
    let query = `/api/entries/outstanding`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder,
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge) {
            if (response.data.length !== 0) {
                $('#outstandingBadgeValue').text(response.data.length)
            }
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesInterviews(sortColumn, sortOrder, forBadge) {
    authorizeUser()
    let query = `/api/entries/interviews`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder,
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge) {
            if (response.data.length !== 0) {
                $('#interviewsBadgeValue').text(response.data.length)
            }
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesConcluded(sortColumn, sortOrder, forBadge) {
    authorizeUser()
    let query = `/api/entries/concluded`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder,
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge) {
            if (response.data.length !== 0) {
                $('#concludedBadgeValue').text(response.data.length)
            }
        } else {
            drawAdvancedCards(response)
        }
    })
}

function grabEntriesNeverResponded(sortColumn, sortOrder, forBadge) {
    authorizeUser()
    let query = `/api/entries/neverresponded`
    console.log(query)
    $.ajax({
        url: query,
        method: "POST",
        data: {
            sortColumn: sortColumn,
            sortOrder: sortOrder,
            token: localStorage.getItem("active-user")
        }
    }).then(function (response) {
        console.log(response.data)
        if (forBadge) {
            if (response.data.length !== 0) {
                $('#neverRespondedBadgeValue').text(response.data.length)
            }
        } else {
            drawAdvancedCards(response)
        }
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  OPEN RECORD FOR EDITING   /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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