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
    card.drawAll()
})

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

$(document).on("click", "#captureNewEntryModalButton", function () {
    $('.modal').modal('toggle')
})

$(document).on("click", ".recordPreviewCard", function () {
    event.preventDefault()
    let idToFind = $(this).attr('data-id')
    let queryURL = `http://localhost:4000/findentry?id=${idToFind}`
    prepareTheReadOnlyModal(queryURL)
})

$(document).on('click', '.editRecordButton', function () {
    event.preventDefault()
    let idToEdit= $(this).attr('id')
    let queryURL = `http://localhost:4000/findentry?id=${idToEdit}`
    prepareTheEditModal(queryURL)
})

function prepareTheReadOnlyModal(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        $('#specialModal').empty()
        let fields = (Object.keys(response.data))
        console.log(fields)
        let values = (Object.values(response.data))
        console.log(values)
        for (i = 0; i < fields.length; i++) {
            $('#specialModal').append(`<p style='font-size: 11px'><strong>${fields[i]}</strong>: ${values[i]} </p>`)
        }
    })
}

let postObj = {}

function prepareTheEditModal(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        $('#editRecordModalBody').empty()
        let fields = (Object.keys(response.data))
        console.log(fields)
        let values = (Object.values(response.data))
        console.log(values)
        let form = $(`<form data-id='${response.data._id}' class='updateRecordForm'></form>`)
        for (i = 1; i < fields.length; i++) { //Start at one to skip id field
            $(form).append(`<strong>${fields[i]}</strong>: <input id='${fields[i]}_${response.data._id}' value='${values[i]}'/><br>`)
            let objProp = `${fields[i]}`
            postObj[objProp] = ''
        }
        $(form).append(`<button type='submit'>Submit</button>`)
        $('#editRecordModalBody').append(form)
    })
}

function postEditedForm(queryURL, postObject) {
    $.ajax({
        url: queryURL,
        method: "POST",
        data: postObject
    }).then(function (response) {
        console.log('Sent edit request.')
    })
}
$(document).on('submit', '.updateRecordForm', function () {
    event.preventDefault()
    let idToEdit= $(this).attr('data-id')
    alert(idToEdit)
    let queryURL = `http://localhost:4000/edit`
    alert(queryURL)
    let inputValsToGrab = Object.keys(postObj)
    for (i = 0; i < inputValsToGrab.length; i++) {
        let elementName = '#' + `${inputValsToGrab[i]}_${idToEdit}`
        console.log(elementName)
        console.log(inputValsToGrab[i])
        let x = (inputValsToGrab[i])
        postObj[x] = $(elementName).val()
    }
    console.log(postObj)
    postEditedForm(queryURL, postObj)
})