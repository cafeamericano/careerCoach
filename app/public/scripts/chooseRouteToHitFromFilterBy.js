function chooseRouteToHitFromFilterBy() {
    console.log('FILTER BY: ' + filter.by)
    console.log('SORT COLUMN: ' + sort.column)
    console.log('SORT ORDER: ' + sort.order)

    switch (filter.by) {
        case 'all':
            grabAllEntries(sort.column, sort.order);
            return;
        case 'outstanding':
            grabEntriesOutstanding(sort.column, sort.order);
            return;
        case 'interview':
            grabEntriesInterviews(sort.column, sort.order);
            return;
        case 'concluded':
            grabEntriesConcluded(sort.column, sort.order);
            return;
        case 'neverResponded':
            grabEntriesNeverResponded(sort.column, sort.order);
            return;
        default:
            return;
    }
}