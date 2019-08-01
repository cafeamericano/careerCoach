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


let card = {
    drawAll: function () {
        $('#recordsContainer').empty()
        let queryURL = 'http://localhost:4000/entries'
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

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

            statistics.printAvgDesireLevel(response.data)
            statistics.printAvgConfidenceLevel(response.data)
            statistics.printOutstandingCount(response.data)
            graph.applicationsPerDay(response.data)

        });
    }
}

let statistics = {
    printAvgDesireLevel: function (resObj) {
        let x = 0;
        let recordCount = resObj.length
        for (i = 0; i < recordCount; i++) {
            x += parseInt(resObj[i].desireLevel)
        }
        let avgDesireLevel = (x / (recordCount)).toFixed(1);
        $('statsbox').append(`<p>Average Desire Level: ${avgDesireLevel}</p>`)
    },
    printAvgConfidenceLevel: function (resObj) {
        let x = 0;
        let recordCount = resObj.length
        for (i = 0; i < recordCount; i++) {
            x += parseInt(resObj[i].confidenceLevel)
        }
        let avgConfidenceLevel = (x / (recordCount)).toFixed(1);
        $('statsbox').append(`<p>Average Confidence Level: ${avgConfidenceLevel}</p>`)
    },
    printOutstandingCount: function (resObj) {
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
    applicationsPerDay: function (resObj) {
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
                    label: 'Applications Submitted',
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