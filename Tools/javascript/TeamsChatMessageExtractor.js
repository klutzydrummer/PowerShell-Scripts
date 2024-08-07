var chat_pane = document.getElementById("chat-pane-list");
var chatElements = chat_pane.children;
var targetIndex = 14;
var each = chatElements[targetIndex];
var chatElement = each;
var banned_character_codes = [55357, 56897];

var itemtype_mappings = {
    "http://schema.skype.com/Emoji": "emoji",
    "http://schema.skype.com/AMSImage": "image"
}

function image_to_base64(img_element) { 
    const img = img_element;
    if (!img) {
      alert('Image not found');
      return;
    }
  
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    return canvas.toDataURL('image/png');;
}

function unicode_cleaner(in_string) {
    var output = [];
    for (let i = 0; i < in_string.length -1; i++) {
        var plain_character = in_string.charAt(i);
        var unicode_character = in_string.charCodeAt(i);
        if (banned_character_codes.includes(unicode_character)) continue;
        output.push(plain_character);
        if (in_string.charCodeAt(i) == null) {
            console.log("null character code detected: " + String(plain_character));
        } else if (String(unicode_character) === "") {
            console.log("empty character detected when casting charCode to string");
        };
    };
    return output.join("");
};

function unicode_char_mapper_csv(in_string)  {
    var output = ['"character", "unicode_code"'];
    for (let i = 0; i < in_string.length -1; i++) {
        var plain_character = in_string.charAt(i);
        var unicode_character = in_string.charCodeAt(i);
        if (banned_character_codes.includes(unicode_character)) continue;
        output.push(String('"'+plain_character) + '","' + String(unicode_character)+'"');
        if (in_string.charCodeAt(i) == null) {
            console.log("null character code detected: " + String(plain_character));
        } else if (String(unicode_character) === "") {
            console.log("empty character detected when casting charCode to string");
        };
    };
    return output.join("\n");
};

function TeamsAutoBackupSelector(element, cssSelector) {
    let replace_mapper = ["ChatMessage", "ChatMyMessage"];
    var target = element.querySelector(cssSelector);
    if (target == null) {
        target = element.querySelector(cssSelector.replace(replace_mapper[0], replace_mapper[1]));
    };
    return target;
};

function getDirectTextContent(element) {
    return Array.from(element.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent.trim())
      .join(' ');
};

function domToMarkdown(node, indentLevel = 0) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
    }

    let result = '';
    let inlineContent = '';
    const tagName = node.tagName.toLowerCase();
    const isListItem = tagName === 'li';
    const isUnorderedList = tagName === 'ul';

    if (isListItem) {
        result += '  '.repeat(indentLevel) + '- ';
    }

    for (const child of node.childNodes) {
        const childTag = child.nodeType === Node.ELEMENT_NODE ? child.tagName.toLowerCase() : null;
        
        if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && ['a', 'strong', 'em', 'code'].includes(childTag))) {
            inlineContent += domToMarkdown(child, indentLevel);
        } else {
            if (inlineContent) {
                result += inlineContent + (isListItem ? '' : '\n');
                inlineContent = '';
            }
            result += domToMarkdown(child, isUnorderedList ? indentLevel + 1 : indentLevel);
        }
    }

    if (inlineContent) {
        result += inlineContent + (isListItem ? '' : '\n');
    }

    switch (tagName) {
        case 'a':
            return `[${node.textContent}](${node.getAttribute('href')})`;
        case 'p':
            return '  '.repeat(indentLevel) + result.trim() + '\n\n';
        case 'br':
            return '\n' + '  '.repeat(indentLevel);
        case 'div':
            return result;
        case 'li':
            return result.trimEnd() + '\n';
        case 'ul':
            return result + (indentLevel > 0 ? '\n' : '');
        case 'img':
            var itemtype = node.getAttribute("itemtype");
            var handle_id;
            var image_output;
            if (itemtype_mappings.hasOwnProperty(itemtype)) {
                handle_id = itemtype_mappings[itemtype];
            } else {
                handle_id = "default"
            }
            switch (handle_id) {
                case 'emoji':
                    image_output = node.alt;
                    break;
                case 'image':
                    var base64 = image_to_base64(node);
                    image_output = "![image](" + String(base64) + ")";
                    break;
                default:
                    if (node.hasAttribute("alt")) {
                        image_output = node.alt;
                    }
                    break;
            }
            return '  '.repeat(indentLevel) + image_output + '\n';
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
    var hasReference = false;
    let referenceAuthor;
    let referenceTime;
    let referenceBody;
    if (referenceWrapper !== null) {
        hasReference = true;
        let referenceSpans = referenceWrapper.querySelectorAll('span');
        if (referenceSpans.length >= 3) {
            referenceAuthor = referenceSpans[0]?.textContent.trim();
            referenceTime = referenceSpans[1]?.textContent.trim();
            referenceBody = referenceSpans[2]?.textContent.trim();
        };
    };
    
    /* "Deprecated, but still keeping in case I want to re-implement later"
    let banList = [
        { attribute: 'data-tid', value: 'url-preview' },
        { attribute: 'aria-label', value: 'Reaction summary' },
        { attribute: 'class', value: 'fui-ChatMessage__avatar' }
    ]; */;
    let chatBody;
    if (banned_character_codes.length == 0) {
        chatBody = domToMarkdown(chatBodyElement);
    } else {
        chatBody = unicode_cleaner(domToMarkdown(chatBodyElement));
    }
    
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
};
var chatElementsArray = [...chatElements];
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

var are_you_having_json_decode_error = false;
if (are_you_having_json_decode_error === true) {
    var debug_char_map_output = [];
    for (message of output) {
        var debug_object = {sender: message.author, message_csv: unicode_char_mapper_csv(message.message)};
        debug_char_map_output.push(debug_object);
    };
    console.log("Get char map csv of desired message by indexing against: debug_char_map_output\nExample, most recent message can be accessed as such: debug_char_map_output[debug_char_map_output.length - 1]");
    var target_message = debug_char_map_output[debug_char_map_output.length - 1];
    console.log(target_message);
}
