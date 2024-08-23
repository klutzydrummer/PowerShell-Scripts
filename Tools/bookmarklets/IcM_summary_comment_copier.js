javascript:(()=>{
function icm_contact_extract(element){
    if (typeof element.tagName == 'undefined') return element.textContent;
    var output = (element.tagName.toLowerCase() == 'icm-contact') ? element.getAttribute('aria-label').replace("Contact: ", "").trimRight() : element.textContent;
    return output;
};

var icmComments = (Array.from(document.querySelectorAll(".ms-List-page")).map(element=>Array.from(element.querySelectorAll('.ms-List-cell')))).flat().reverse();
var icmComments_text = icmComments.map(icmComment=>{
    var commentPieces = [...icmComment.childNodes[0].childNodes[0].childNodes[1].childNodes];
    var header = commentPieces[0];
    var commentUserElement = header.querySelector('icm-contact');
    var commentUser = commentUserElement.getAttribute('aria-label').replace("Contact: ", "");
    commentUser = (commentUser !== 'undefined') ? commentUser : commentUserElement.getAttribute('alias');
    var body = commentPieces[1];
    var footer = commentPieces[2];
    var commentTime = header.childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent;
    var visibleBodyElements = body.querySelector('icm-rich-text')?.shadowRoot?.childNodes;
    if (!(typeof visibleBodyElements == 'undefined')) {
        visibleBodyElements = Array.from(visibleBodyElements).filter(node => node?.style?.display !== "none");    
        visibleBodyElements = (visibleBodyElements.length == 1 && visibleBodyElements[0].hasChildNodes() == true) ? Array.from(visibleBodyElements[0].childNodes) : visibleBodyElements;
        var bodyText = visibleBodyElements.map(elements=>icm_contact_extract(elements)).filter(line=>line!=="").join("");
    } else {
        var bodyText = body.textContent;
    };
    /* footer; '[aria-label="Like"]'; '[aria-label="Dislike"]' */;
    return {
        'user': commentUser,
        'time': commentTime,
        'comment': bodyText
    };
});
function process_icm_comments(icmComments) {
    return icmComments.map(icmComment=>{
        var header = `${icmComment.user} - ${icmComment.time}  \n`;
        var body = icmComment.comment.split("\n").map(line=>line.replaceAll(/\u00a0/g, '')+"  ").join("\n");
        var footer = '';
        return header + body + footer;
    }).join("\n\n--\n\n");
}
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
icmComments_text;
copyToClipboard(process_icm_comments(icmComments_text));
})()