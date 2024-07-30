javascript: (function () {
    var allLabels = document.getElementsByTagName('label');
    var caseNumbers = ['Case_Number,Updates_this_Week,Called_this_Week'];
    for (let each of allLabels) {
        var labelText = each.getAttribute('aria-label');
        if (/^\d{16}$/.test(labelText)) {
            labelText = "'" + labelText + ',0' + ',FALSE';
            caseNumbers.push(labelText);
        }
    }
    var csv_content = caseNumbers.join('\n');
    console.log(csv_content);

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