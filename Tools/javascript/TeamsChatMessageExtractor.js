
var chat_pane = document.getElementById("chat-pane-list");
var chatElements = chat_pane.children;
var targetIndex = 14;
var each = chatElements[targetIndex];
var chatElement = each;

function TeamsAutoBackupSelector(element, cssSelector) {
    let replace_mapper = ["ChatMessage", "ChatMyMessage"];
    var target = element.querySelector(cssSelector);
    if (target == null) {
        target = element.querySelector(cssSelector.replace(replace_mapper[0], replace_mapper[1]));
    };
    return target;
};

function domToMarkdown(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
    }

    let result = '';
    let inlineContent = '';

    for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'a')) {
            inlineContent += domToMarkdown(child);
        } else {
            if (inlineContent) {
                result += inlineContent + '\n';
                inlineContent = '';
            }
            result += domToMarkdown(child);
        }
    }

    if (inlineContent) {
        result += inlineContent + '\n';
    }

    switch (node.tagName.toLowerCase()) {
        case 'a':
            return `[${node.textContent}](${node.getAttribute('href')})`;
        case 'p':
            return result.trim() + '\n';
        case 'br':
            return '\n';
        case 'div':
            return result;
        default:
            return result;
    }
}

function extractChatMessageDetails(chatElement, stripLeadingDivs = false) {
    let referenceAuthorToken = "<REFERENCE_AUTHOR>";
    let referenceTimeToken = "<REFERENCE_TIME>";
    let referenceBodyToken = "<REFERENCE_BODY>";
    let divider = chatElement.querySelector('[class^="fui-Divider"]');
    let controlMessage = TeamsAutoBackupSelector(chatElement, '[data-tid="control-message-renderer"]');
    if (divider !== null) {
        return null;
    };
    if (controlMessage !== null) {
        let chatTime = null;
        let chatAuthor = "System";
        let chatBody = [...controlMessage.children[0].childNodes].map((item) => item?.textContent).join("");
        let referencedMessage = null;
        let reactionCounts = null;
        return {
            time: chatTime,
            author: chatAuthor,
            message: chatBody,
            referencedMessage: referencedMessage,
            reactions: reactionCounts,
            isEdited: null
        }
    };
    let chatBodyElement = chatElement.querySelector('[data-tid="chat-pane-message"]').querySelector('div');
    let chatTime = TeamsAutoBackupSelector(chatElement, '[class^="fui-ChatMessage__timestamp"]')?.dateTime;
    let chatAuthor = chatElement?.querySelector('[data-tid="message-author-name"]')?.textContent || "Unknown Author";
    let referenceWrapper = chatElement?.querySelector('[data-track-module-name="messageQuotedReply"]');
    let referenceAuthor;
    let referenceTime;
    let referenceBody;
    var hasReference = false;
    if (referenceWrapper !== null) {
        hasReference = true;
        let referenceSpans = referenceWrapper.querySelectorAll('span');
        if (referenceSpans.length >= 3) {
            referenceAuthor = referenceSpans[0]?.textContent.trim();
            referenceTime = referenceSpans[1]?.textContent.trim();
            referenceBody = referenceSpans[2]?.textContent.trim();
        };
    } else {};
    
    let banList = [
        { attribute: 'data-tid', value: 'url-preview' },
        { attribute: 'aria-label', value: 'Reaction summary' },
        { attribute: 'class', value: 'fui-ChatMessage__avatar' }
    ];

    let chatBody = domToMarkdown(chatBodyElement);
    
    /* var isEdited = false; */;
    
    let referencedMessage = referenceAuthor && referenceTime && referenceBody 
        ? { referenceAuthor, referenceTime, referenceBody }
        : null;

    let reactionCountsElements = [...chatElement.querySelectorAll('[data-tid$="-count"]')];
    if (reactionCountsElements.length > 0) {
        var reactionCounts = {};
        for (each of reactionCountsElements) {
            var key = each.getAttribute('data-tid').replace('-count', '');
            var value = each.textContent;
            reactionCounts[key] = value;
        };
    } else {
        var reactionCounts = null;
    }

    let output = {
        time: chatTime,
        author: chatAuthor,
        message: chatBody,
        referencedMessage: referencedMessage,
        reactions: reactionCounts,
        isEdited: null
    };
    return output;
}
var chatElementsArray = [...chatElements]
/* chatElementsArray = chatElementsArray.slice(chatElementsArray.length - 1, chatElementsArray.length) */;
var output = chatElementsArray.map(item => extractChatMessageDetails(item, stripLeadingDivs = false)).filter(item => item !== null);
var json_string = JSON.stringify(output).replace(/\\\\"/g, '\\"').replace(/\\\\/g, '\\\\');
console.log(json_string);
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

copyToClipboard(json_string);
output;