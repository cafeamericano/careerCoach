function prefillJobLevelValue() {
    let x = $('#jobLevel').attr('data-existing')
    switch (x) {
        case 'Internship':
            return $('#jobLevel_internship').attr('selected', 'selected');
        case 'Entry Level':
            return $('#jobLevel_entryLevel').attr('selected', 'selected');
        case 'Mid Level':
            return $('#jobLevel_midLevel').attr('selected', 'selected');
        case 'Senior Level':
            return $('#jobLevel_seniorLevel').attr('selected', 'selected');
        default:
            return $('#jobLevel_notIndicated').attr('selected', 'selected');
    }
};
function prefillFourYearDegreeValue() {
    let x = $('#fourYearDegreeRequired').attr('data-existing')
    console.log('Four year degree val: ' + x)
    switch (x) {
        case 'Yes':
            return $('#fourYearDegreeRequired_yes').attr('selected', 'selected');
        case 'No':
            return $('#fourYearDegreeRequired_no').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillProgressValue() {
    let x = $('#progress').attr('data-existing')
    switch (x) {
        case 'Application Submitted':
            return $('#progress_applicationSubmitted').attr('selected', 'selected');
        case 'Resume Reviewed':
            return $('#progress_resumeReviewed').attr('selected', 'selected');
        case 'Portfolio Referenced':
            return $('#progress_portfolioReferenced').attr('selected', 'selected');
        case 'Interview Offered':
            return $('#progress_interviewOffered').attr('selected', 'selected');
        case 'Interview Completed':
            return $('#progress_interviewCompleted').attr('selected', 'selected');
        case 'Job Offered':
            return $('#progress_jobOffered').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillMajorCorporationValue() {
    let x = $('#majorCorporation').attr('data-existing')
    switch (x) {
        case 'Yes':
            return $('#majorCorporation_yes').attr('selected', 'selected');
        case 'No':
            return $('#majorCorporation_no').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillLocationOfPostingValue() {
    let x = $('#locationOfPosting').attr('data-existing')
    switch (x) {
        case 'LinkedIn':
            return $('#locationOfPosting_linkedIn').attr('selected', 'selected');
        case 'Glassdoor':
            return $('#locationOfPosting_glassdoor').attr('selected', 'selected');
        case 'Indeed':
            return $('#locationOfPosting_indeed').attr('selected', 'selected');
        case 'Monster':
            return $('#locationOfPosting_monster').attr('selected', 'selected');
        case 'Company Website':
            return $('#locationOfPosting_companyWebsite').attr('selected', 'selected');
        case 'Other':
            return $('#locationOfPosting_other').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillLocationOfSubmissionValue() {
    let x = $('#locationOfSubmission').attr('data-existing')
    switch (x) {
        case 'LinkedIn':
            return $('#locationOfSubmission_linkedIn').attr('selected', 'selected');
        case 'Glassdoor':
            return $('#locationOfSubmission_glassdoor').attr('selected', 'selected');
        case 'Indeed':
            return $('#locationOfSubmission_indeed').attr('selected', 'selected');
        case 'Monster':
            return $('#locationOfSubmission_monster').attr('selected', 'selected');
        case 'Company Website':
            return $('#locationOfSubmission_companyWebsite').attr('selected', 'selected');
        case 'Other':
            return $('#locationOfSubmission_other').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillEasyApplyValue() {
    let x = $('#easyApply').attr('data-existing')
    switch (x) {
        case 'Yes':
            return $('#easyApply_yes').attr('selected', 'selected');
        case 'No':
            return $('#easyApply_no').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillStackTypeValue() {
    let x = $('#stackType').attr('data-existing')
    switch (x) {
        case 'Front End':
            return $('#stackType_frontEnd').attr('selected', 'selected');
        case 'Back End':
            return $('#stackType_backEnd').attr('selected', 'selected');
        case 'Full Stack':
            return $('#stackType_fullStack').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillPreferredDegreeValue() {
    let x = $('#preferredDegreeHeld').attr('data-existing')
    switch (x) {
        case 'Yes':
            return $('#preferredDegreeHeld_yes').attr('selected', 'selected');
        case 'No':
            return $('#preferredDegreeHeld_no').attr('selected', 'selected');
        case 'Not Applicable':
            return $('#preferredDegreeHeld_notApplicable').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillProgressValue() {
    let x = $('#progress').attr('data-existing')
    switch (x) {
        case 'Application Submitted':
            return $('#progress_applicationSubmitted').attr('selected', 'selected');
        case 'Resume Reviewed':
            return $('#progress_resumeReviewed').attr('selected', 'selected');
        case 'Portfolio Referenced':
            return $('#progress_portfolioReferenced').attr('selected', 'selected');
        case 'Interview Offered':
            return $('#progress_interviewOffered').attr('selected', 'selected');
        case 'Interview Completed':
            return $('#progress_interviewCompleted').attr('selected', 'selected');
        case 'Job Offered':
            return $('#progress_jobOffered').attr('selected', 'selected');
        default:
            return;
    }
};
function prefillClosureValue() {
    let x = $('#closure').attr('data-existing')
    switch (x) {
        case 'Outstanding':
            return $('#closure_outstanding').attr('selected', 'selected');
        case 'Accepted':
            return $('#closure_accepted').attr('selected', 'selected');
        case 'Denied':
            return $('#closure_denied').attr('selected', 'selected');
        case 'Withdrawn':
            return $('#closure_withdrawn').attr('selected', 'selected');
        case 'Application Lost':
            return $('#closure_applicationLost').attr('selected', 'selected');
        case 'Never Responded':
            return $('#closure_neverResponded').attr('selected', 'selected');
        default:
            return;
    }
};

prefillJobLevelValue()
prefillFourYearDegreeValue()
prefillProgressValue()
prefillMajorCorporationValue()
prefillLocationOfPostingValue()
prefillLocationOfSubmissionValue()
prefillEasyApplyValue()
prefillStackTypeValue()
prefillPreferredDegreeValue()
prefillProgressValue()
prefillClosureValue()
