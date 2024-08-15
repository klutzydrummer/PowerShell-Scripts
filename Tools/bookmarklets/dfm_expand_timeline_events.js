javascript:(function(){
    var timelineElements = Array.from(document.querySelector('[data-id="notescontrol-unPinnedAccordion-incident"]').querySelectorAll('li'));
    var results = [];
    var completedCount = 0;

    var processElement = function(timelineElement, index) {
        var moreButton = timelineElement.querySelector('[aria-label="View more Collapse"]');
        var lessButton = timelineElement.querySelector('[aria-label="View less Expand"]');

        if (moreButton !== null) {
            moreButton.click();

            /* Wait for expansion to complete */;
            setTimeout(function(){
                finalize();
            }, 2000); /* 2 seconds delay to allow for expansion */;
        } else if (lessButton !== null) {
            checkForData(timelineElement);
            finalize();
        } else {
            finalize();
        }
    };

    var finalize = function() {
        completedCount++;
        if (completedCount === timelineElements.length) {
            alert("All timeline elements expanded.");
        }
    };

    timelineElements.forEach(processElement);
})();
