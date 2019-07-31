export function drawAllCards() {
    emptyRecordsContainer()
    let queryURL = 'http://localhost:4000/entries'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)

        //FOR EACH ENTRY
        for (j = 0; j < response.data.length; j++) {

            //OBJECT KEY/VALUE ANALYSIS
            let fields = (Object.keys(response.data[j]))
            let values = (Object.values(response.data[j]))

            //CARD DRAW
            let card = $(`<div class='card m-2 shadow' style='border-radius: 20px;'></div>`)
            let dataHolder = $(`<div class='jobDescriptionTable row' style='display: none'></div>`)
            let col1 = $(`<div class='col-6'></div>`)
            let col2 = $(`<div class='col-6'></div>`)

            $('#specialModal').empty()
            for (i = 0; i < fields.length; i++) {
                $('#specialModal').append(`<p style='font-size: 11px'><strong>${fields[i]}</strong>: ${values[i]} </p>`)
            }

            $('#selectedRecordInformationModal').append(col1)
            $('#selectedRecordInformationModal').append(col2)

            $(card).prepend(`<button style='width: 70px' class='deleteRecordButton text-right' id='${response.data[j]._id}'>Delete</button>`)
            //$(card).prepend(`<h4 class='cardRevealControl'>${response.data[j].companyName}</h4>`)
            $(card).prepend(`<small>Applied: ${response.data[j].applicationSubmissionDate}</small>`)
            $(card).prepend(`<h4 class='cardRevealControl'>${response.data[j].companyName}</h4>`)

            $('#recordsContainer').addClass('row')
            $(card).addClass('col-4 p-3 recordPreviewCard')
            $(card).attr('data-id', response.data[j]._id)
            $(card).attr('data-toggle', 'modal')
            $(card).attr('data-target', '#selectedRecordModal')
            $('#recordsContainer').append(card)
        }

        printAvgDesireLevel(response.data)
        printAvgConfidenceLevel(response.data)
        printOutstandingCount(response.data)
        printApplicationsPerDay(response.data)

    });
}