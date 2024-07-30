javascript:(function () {
    var allCells = document.querySelectorAll('[class^="ag-cell"]');
    var caseNumberStartIdx = 0;
    var caseNumberEndIdx = 0;
    for (let i = 0; i < allCells.length; i++) {
        var each = allCells[i];
        var fullText = each.textContent;
        var midpoint = Math.floor(fullText.length / 2);
        var text = fullText.substring(midpoint);
        if (/^\d{16}$/.test(text)) {
            if (caseNumberStartIdx == 0) {
                caseNumberStartIdx = i;
            } else {
                caseNumberEndIdx = i;
                break;
            }
        }
    }
    var num_col = caseNumberEndIdx - caseNumberStartIdx;
    var index = 0;
    var row_count = 0;
    var objectStorage = {0: []};
    for (var each of allCells) {
        var fullText = each.textContent;
        var midpoint = Math.floor(fullText.length / 2);
        var text = fullText.substring(midpoint).replaceAll('"', "'");
        objectStorage[row_count].push(text);
        index++;
        if (index >= num_col) {
            index = 0;
            row_count++;
            objectStorage[row_count] = [];
        }
    }
    var output = ["Case_Number,Case_Title,Updates_this_Week,Called_this_Week"];
    var finalObject = {};
    for (var row of Object.keys(objectStorage)) {
        if (objectStorage[row].length == 0) {
            continue;
        }
        finalObject[row] = objectStorage[row].slice(2, 4);
        finalObject[row].push(...[0, 'FALSE']);
        for (let i = 0; i < finalObject[row].length; i++) {
            if (/^\d{16}$/.test(finalObject[row][i])) {
                continue;
            }
            finalObject[row][i] = '"' + finalObject[row][i] + '"';
        }
        var case_number = finalObject[row][0];
        finalObject[row][0] = case_number + "'";
    }
    for (var row of Object.keys(finalObject)) {
        output.push(finalObject[row].join(","));
    }
    var csv_content = output.join('\n');

    function copyToClipboard(text) {
        var tempInput = document.createElement('textarea');
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('Copy');
        document.body.removeChild(tempInput);
    }

    copyToClipboard(csv_content);
    alert('Case tracker csv copied to clipboard');
})();