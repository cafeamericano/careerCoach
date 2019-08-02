function pickColorFromStatusIndicator(status) {
    switch (status) {
        case 'Application Not Yet Submitted':
            return 'gray';
        case 'Awaiting Response':
            return 'yellow';
        case 'Interview Granted':
            return 'lime';
        case 'Denied With Interview Granted':
            return 'orange';
        case 'Denied Without Interview Granted':
            return 'red';
        case 'Job Offered':
            return 'green';
        case 'Withdrawn':
            return '#474747';
        default:
            return 'gray';
    }
}

function grabEntries() {
    $.ajax({
        url: `/entries`,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        drawBasicCards(response)
    })
}

function deleteEntry(id) {
    $.ajax({
        url: `/delete`,
        method: "POST",
        data: {
            id: id
        }
    }).then(function (response) {
        console.log(response)
        console.log('Sent delete request.')
    })
}

function drawBasicCards(response) {
    for (i = 0; i < response.data.length; i++) {
        let block = $(`<div>`)
        $(block).append(response.data[i].companyName + '<br/>')
        $(block).append(response.data[i].applicationSubmissionDate + '<br/>')
        $(block).append(response.data[i].status + '<br/>')
        $(block).append(`<button id=${response.data[i]._id} class='btn btn-secondary deleteRecordButton'>Delete</button>`)
        $(block).append('<br/><hr>')
        $('#recordsContainer').append(block)
    }
}

function drawFancyCards(response) {

    //For each entry
    for (j = 0; j < response.data.length; j++) {

        ////////////CARD//////////
        let card = $(`<div data-id='${response.data[j]._id}'class='card m-2 shadow col-lg-5 col-md-12 recordPreviewCard'></div>`)

        ////////////HEADER//////////
        let header = $(`<div class='card-header'></div>`)
        //Fill the card header
        $(header).append(`<h3>${response.data[j].companyName}</h3>`)

        ////////////BODY//////////
        let body = $(`<div class='card-body'></div>`)
        //Fill the card body
        let statusIndicator = pickColorFromStatusIndicator(response.data[j].status)
        $(body).append(`<div style='height: 20px; background: ${statusIndicator}'></div>`)
        $(body).append(`<small class='p-3'>Position: ${response.data[j].jobTitle}</small><br/>`)
        $(body).append(`<small class='p-3'>Applied: ${response.data[j].applicationSubmissionDate}</small><br/>`)
        $(body).append(`<small class='p-3'>Status: ${response.data[j].status}</small><br/>`)

        ////////////FOOTER//////////
        let footer = $(`<div class='card-footer text-right'></div>`)
        //Fill the card footer
        $(footer).prepend(`<div class='deleteRecordButton text-center' id='${response.data[j]._id}'><i class="material-icons">delete</i></div>`)
        $(footer).prepend(`<div class='editRecordButton text-center' data-toggle='modal' data-target='#editRecordModal' id='${response.data[j]._id}'><i class="material-icons">edit</i></div>`)
        $(footer).prepend(`<div class='viewRecordButton text-center' data-toggle='modal' data-target='#viewRecordModal' id='${response.data[j]._id}'><i class="material-icons">zoom_in</i></div>`)

        ////////////COMPILATION//////////
        $(card).append(header)
        $(card).append(body)
        $(card).append(footer)

        ////////////DOM PLACEMENT//////////
        $('#recordsContainer').append(card)
    }
}

$(document).on('click', '.deleteRecordButton', function () {
    let idToDelete = $(this).attr('id')
    deleteEntry(idToDelete)
    $(this).parent().fadeOut()
})

grabEntries()