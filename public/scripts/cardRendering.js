////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  DRAW THE CARDS   ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pickColorFromClosureIndicator(closure) {
    switch (closure) {
        case 'Outstanding':
            return 'yellow';
        case 'Accepted':
            return 'rgb(122, 173, 62)'
        case 'Denied':
            return 'rgb(207, 86, 50)';
        case 'Withdrawn':
            return '#474747';
        case 'Never Responded':
            return 'rgb(207, 86, 50)';
        default:
            return 'gray';
    }
}

function pickProgressPercentage(progress) {
    switch (progress) {
        case 'Application Submitted':
            return '17%'
        case 'Resume Reviewed':
            return '33%'
        case 'Portfolio Referenced':
            return '50%'
        case 'Interview Offered':
            return '67%'
        case 'Interview Completed':
            return '83%'
        case 'Job Offered':
            return '100%'
        default:
            return;
    }
}

function pickProgressColor(closure) {
    switch (closure) {
        case 'Outstanding':
            return 'success';
        case 'Accepted':
            return 'success'
        case 'Denied':
            return 'danger';
        case 'Withdrawn':
            return 'secondary';
        case 'Never Responded':
            return 'danger';
        default:
            return 'secondary';
    }
}

function drawAdvancedCards(response) {
    for (i = 0; i < response.data.length; i++) {
        $('#recordsContainer').append(
            `
                <div class="col-xl-4 col-lg-6 col-md-12  animated bounceInUp">
                    <div class="card mb-3 deflated" style="max-width: 540px; cursor: pointer">
                        <div class="row no-gutters">
                            <div class="col">
                                <form method='post' action='/edit_prompt' class='openCardDetails'>
                                    <input style='display: none' name='id' value='${response.data[i]._id}'/>
                                    <div class="card-body" data-id=''>
                                        <span style='font-size: 1.4em !important; font-weight: bolder' class="card-title">${response.data[i].companyName}</span>
                                        <br/>
                                        <span class="card-text ml"><small class="text-muted">${response.data[i].applicationSubmissionDate}</small></span> <span class="card-text ml"><small class="text-muted">(${daysSince(response.data[i].applicationSubmissionDate)} days ago)</small></span>
                                        <p class="card-text">${response.data[i].jobTitle}</p>
                                        <div class="progress">
                                            <div class="progress-bar bg-${pickProgressColor(response.data[i].closure)}" role="progressbar" style="width: ${pickProgressPercentage(response.data[i].progress)}" ></div>
                                        </div>
                                        <span class="card-text"><small class="text-muted">${response.data[i].progress}</small></span> | <span class="card-text"><small class="text-muted">${response.data[i].closure}</small></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                `
        )
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  CALCULATE DAYS FROM PRESENT  ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function daysSince(date){
    var then = date;
    var today = moment();
    return today.diff(then, 'days')
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  MOUSEOVER EFFECTS   //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Card mouseover effect
$(document).on("mouseover", ".card", function () {
    $(this).removeClass('deflated');
    $(this).addClass('inflated');
});

//Card mouseout effect
$(document).on("mouseout", ".card", function () {
    $(this).removeClass('inflated');
    $(this).addClass('deflated');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////   OPEN FOR EDITING   //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".openCardDetails", function () {
    $(this).submit()
});