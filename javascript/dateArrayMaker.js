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