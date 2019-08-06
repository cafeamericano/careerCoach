function pullLast60Days() {
    var startPoint = moment().subtract(2, 'months')
    var endPoint = moment().startOf('startPoint');

    var datesArr = [];

    while (startPoint <= endPoint) {
        datesArr.push(startPoint.format('YYYY-MM-DD'));
        startPoint = startPoint.clone().add(1, 'd');
    }

    return datesArr
}

function applicationsPerDay(resObj) {
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
                        stepSize: 1,
                        max: 5
                    }
                }]
            }
        }
    });

}

function pullEntryDataForChart() {
    let queryURL = 'http://localhost:4000/api/entries'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        applicationsPerDay(response.data)
    });
}

pullEntryDataForChart()
