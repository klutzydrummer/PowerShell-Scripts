javascript:(function(){
    var copyToClipboard = function(text){
        var textarea = document.createElement("textarea");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.value = text.replace("\n","\r\n");
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Text copied to clipboard: " + text);
    };

    var timelineElements = Array.from(document.querySelector('[data-id="notescontrol-unPinnedAccordion-incident"]').querySelectorAll('li'));
    var results = [];
    var completedCount = 0;

    var checkForData = function(timelineElement) {
        var dataMatch = timelineElement.textContent.match(/Compressed Base64Encoded JSON:\s*(H4sIA[^\s<]+):End Compressed Base64Encoded JSON/g);
        if (dataMatch && dataMatch.length > 0) {
            results.push(dataMatch[0]);
        };
    };

    var processElement = function(timelineElement, index) {
        var moreButton = timelineElement.querySelector('[aria-label="View more Collapse"]');
        var lessButton = timelineElement.querySelector('[aria-label="View less Expand"]');

        if (moreButton !== null) {
            moreButton.click();

            /* Wait for expansion to complete */;
            setTimeout(function(){
                checkForData(timelineElement);
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
            if (results.length > 0) {
                copyToClipboard(results[0].replace(":End Compressed Base64Encoded JSON", ""));
            } else {
                alert("No matching data found.");
            }
        }
    };

    timelineElements.forEach(processElement);

})();
