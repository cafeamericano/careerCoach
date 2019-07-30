// ************************* CRUD OPERATIONS *************************

// Read All Records ////////////////////////////
function drawAllCards() {
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
            let card = $(`<div class='card mt-3 mb-3 p-2'></div>`)
            let table = $(`<table class='table jobDescriptionTable' style='display: none'></table>`)
            for (i = 0; i < fields.length; i++) {
                let row = $('<tr>')
                row.append(`<td>${fields[i]}</td>`)
                row.append(`<td>${values[i]}</td>`)
                $(table).append(row)
            }
            $(card).append(table)
            $(card).prepend(`<button style='width: 70px' class='deleteRecordButton text-right' id='${response.data[j]._id}'>Delete</button>`)
            $(card).prepend(`<h4 class='cardRevealControl'>${response.data[j].companyName}</h4>`)
            $('#recordsContainer').append(card)
        }

        printAvgDesireLevel(response.data)
        printAvgConfidenceLevel(response.data)
        printOutstandingCount(response.data)
        printApplicationsPerDay(response.data)

    });
}

// Add a New Record ////////////////////////////
$(document).on('submit', '#addRecordForm', function () {
    event.preventDefault()
    let queryURL = 'http://localhost:4000/add'

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            companyName: $('#companyName').val(),
            jobTitle: $('#jobTitle').val(),
            jobDescription: $('#jobDescription').val(),
            jobLevel: $('#jobLevel').val(),
            minimumYearsExperience: $('#minimumYearsExperience').val(),
            desireLevel: $('#desireLevel').val(),
            confidenceLevel: $('#confidenceLevel').val(),
            applicationSubmissionDate: $('#applicationSubmissionDate').val(),
            dateOfFirstResponse: $('#dateOfFirstResponse').val(),
            fourYearDegreeRequired: $('#fourYearDegreeRequired').val(),
            csDegreePreferred: $('#csDegreePreferred').is(':checked'),
            majorCorporation: $('#majorCorporation').is(':checked'),
            essentialSkills: $('#essentialSkills').val(),
            locationOfPosting: $('#locatinoOfPosting').val(),
            locationOfSubmission: $('#locationOfSubmission').val(),
            easyApply: $('#easyApply').is(':checked'),
            stackType: $('#stackType').val(),
            yearsExperienceAtTimeOfApplication: $('#yearsExperienceAtTimeOfApplication').val(),
            numberOfFeaturedProjectsAtTimeOfApplication: $('#numberOfFeaturedProjectsAtTimeOfApplication').val(),
            applicationWithdrawn: $('#applicationWithdrawn').is(':checked'),
            neverResponded: $('#neverResponded').is(':checked'),
            interviewGranted: $('#interviewGranted').is(':checked'),
            deniedJob: $('#deniedJob').is(':checked'),
            offeredJob: $('#offeredJob').is(':checked')
        }
    }).then(function (response) {
        console.log('Sent add request.')
    })
    drawAllCards()
})

// Delete Record ////////////////////////////
$(document).on('click', '.deleteRecordButton', function () {
    event.preventDefault()
    let idToDelete = $(this).attr('id')
    let queryURL = `http://localhost:4000/delete?id=${idToDelete}`

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log('Delete request sent.')

    })

    $(this).parent().fadeOut()
})

// ************************* UI MANIPULATION *************************

//Toggle Expanded Card
$(document).on("click", ".cardRevealControl", function () {
    $(this).siblings().toggle()
})

//Empty the Records Container
function emptyRecordsContainer() {
    $('#recordsContainer').empty()
}

// ************************* STATS *************************

function printAvgDesireLevel(resObj) {
    let x = 0;
    let recordCount = resObj.length
    for (i = 0; i < recordCount; i++) {
        x += parseInt(resObj[i].desireLevel)
    }
    let avgDesireLevel = (x / (recordCount)).toFixed(1);
    $('statsbox').append(`<p>Average Desire Level: ${avgDesireLevel}</p>`)
}

function printAvgConfidenceLevel(resObj) {
    let x = 0;
    let recordCount = resObj.length
    for (i = 0; i < recordCount; i++) {
        x += parseInt(resObj[i].confidenceLevel)
    }
    let avgConfidenceLevel = (x / (recordCount)).toFixed(1);
    $('statsbox').append(`<p>Average Confidence Level: ${avgConfidenceLevel}</p>`)
}

function printOutstandingCount(resObj) {
    let x = 0;
    let recordCount = resObj.length
    for (i = 0; i < recordCount; i++) {
        if (resObj[i].applicationWithdrawn == 'false' && resObj[i].deniedJob == 'false' && resObj[i].neverResponded == 'false') {
            x += 1
        }
    }
    $('statsbox').append(`<p>Outstanding/Total Ratio: ${x} out of ${recordCount}</p>`)
}

function printApplicationsPerDay(resObj) {
    let x = 0;
    let last60DaysArray = pullLast60Days()
    let recordCount = resObj.length
    let compValsArr = []
    for (i = 0; i < last60DaysArray.length; i++) {
        let valueToInsert = 0;
        for (j = 0; j < recordCount; j++) {
            if (last60DaysArray[i] === resObj[j].applicationSubmissionDate) {
                valueToInsert += 1
            }
        }
        compValsArr.push(valueToInsert)
    }
    console.log(compValsArr)
}

// ************************* RUN PROGRAM *************************

drawAllCards()
console.log(pullLast60Days()) //Loaded in from a previous JS file in the HTML