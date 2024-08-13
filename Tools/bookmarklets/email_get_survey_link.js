javascript:(()=>{var emailSubjectElement = document.querySelector('[aria-label="Subject"]');
    var emailSubject = emailSubjectElement.getAttribute('title');
    var caseNumberMatch = emailSubject.match(/(\d{16})/);
    var caseNumber = (caseNumberMatch.length > 0) ? caseNumberMatch[0] : "";
    var surveyLink = `https://admin.microsoft.com/adminportal/home#/support/feedback/${caseNumber}`;
    var copyToClipboard = (text)=>{
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
    copyToClipboard(surveyLink);
})()