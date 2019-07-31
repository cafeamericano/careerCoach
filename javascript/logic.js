let card = {
    drawAll: function() {
        recordContainer.empty()
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
    
            statistics.printAvgDesireLevel(response.data)
            statistics.printAvgConfidenceLevel(response.data)
            statistics.printOutstandingCount(response.data)
            graph.applicationsPerDay(response.data)
    
        });
    },
    pullRecordSpecifics: function(id) {
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
    
                $(card).prepend(`<button style='width: 70px' class='deleteRecordButton text-right' id='${response.data[j]._id}'>Delete</button>`)
                //$(card).prepend(`<h4 class='cardRevealControl'>${response.data[j].companyName}</h4>`)
                $(card).prepend(`<small>Applied: ${response.data[j].applicationSubmissionDate}</small>`)
                $(card).prepend(`<h4 class='cardRevealControl'>${response.data[j].companyName}</h4>`)
    
                $('#recordsContainer').addClass('row')
                $(card).addClass('col-4 p-3 recordPreviewCard')
                $('#recordsContainer').append(card)
            }
    
        });
    }
}

let statistics = {
    printAvgDesireLevel: function(resObj) {
        let x = 0;
        let recordCount = resObj.length
        for (i = 0; i < recordCount; i++) {
            x += parseInt(resObj[i].desireLevel)
        }
        let avgDesireLevel = (x / (recordCount)).toFixed(1);
        $('statsbox').append(`<p>Average Desire Level: ${avgDesireLevel}</p>`)
    },
    printAvgConfidenceLevel: function(resObj) {
        let x = 0;
        let recordCount = resObj.length
        for (i = 0; i < recordCount; i++) {
            x += parseInt(resObj[i].confidenceLevel)
        }
        let avgConfidenceLevel = (x / (recordCount)).toFixed(1);
        $('statsbox').append(`<p>Average Confidence Level: ${avgConfidenceLevel}</p>`)
    },
    printOutstandingCount: function(resObj) {
        let x = 0;
        let recordCount = resObj.length
        for (i = 0; i < recordCount; i++) {
            if (resObj[i].applicationWithdrawn == 'false' && resObj[i].deniedJob == 'false' && resObj[i].neverResponded == 'false') {
                x += 1
            }
        }
        $('statsbox').append(`<p>Outstanding/Total Ratio: ${x} out of ${recordCount}</p>`)
    }
}

let graph = {
    applicationsPerDay: function(resObj) {
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
        console.log(last60DaysArray)
        console.log(compValsArr)
    
        //Create the new chart
        var ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: last60DaysArray,
                datasets: [{
                    label: 'Share Value',
                    data: compValsArr,
                    backgroundColor:
                        'rgba(13, 193, 175, 0.5)'
                    ,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                }
            }
        });
    
    }
}

let recordContainer = {
    empty: function() {
        $('#recordsContainer').empty()
    }
}

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
    console.log(idToFind)
    let queryURL = `http://localhost:4000/findentry?id=${idToFind}`
    console.log(queryURL)

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
})

card.drawAll()

