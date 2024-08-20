var runDirect = false;
var base64_flag = false;
var addMenu = true;
var specifiedFormat = 'markdown';
var removeScript = false;
((runDirect, base64_flag, addMenu, specifiedFormat, removeScript)=>{
if (removeScript == true) {
    if (window.hasOwnProperty("_my_custom_methods") && window._my_custom_methods.hasOwnProperty("deleteMenu") && window._my_custom_methods.hasOwnProperty("getMenu")) window._my_custom_methods.deleteMenu(window._my_custom_methods.getMenu());
    if (window._my_custom_methods) delete window._my_custom_methods;
    if (window._my_custom_data) delete window._my_custom_data;
    if (window._my_modal_settings) delete window._my_modal_settings;
    return;
};
if (!window._my_custom_methods) window._my_custom_methods = {};
if (!window._my_custom_data) window._my_custom_data = {};
if (!window._my_modal_settings) window._my_modal_settings = {};
window._my_custom_data.indent = 2;
window._my_custom_data.indent_String = ' '.repeat(window._my_custom_data.indent);
window._my_custom_methods.itemtype_mappings = function itemtype_mappings(itemtype) {
    const mappings = {
        "http://schema.skype.com/Emoji": "emoji",
        "http://schema.skype.com/AMSImage": "image",
        "http://schema.skype.com/Mention": "mention"
    };
    return (mappings.hasOwnProperty(itemtype)) ? mappings[itemtype] : null;
};

window._my_custom_methods.copyToClipboard = function copyToClipboard(text) {
    var tempInput = document.createElement('textarea');
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('Copy');
    document.body.removeChild(tempInput);
};

window._my_custom_methods.TeamsAutoBackupSelector = function TeamsAutoBackupSelector(element, cssSelector) {
    let replace_mapper = ["ChatMessage", "ChatMyMessage"];
    var target = element.querySelector(cssSelector);
    if (target == null) {
        target = element.querySelector(cssSelector.replace(replace_mapper[0], replace_mapper[1]));
    };
    return target;
};

window._my_custom_methods.getOffsetForTimezone = function getOffsetForTimezone(timeZone, date) {
    /* Convert to UTC */;
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

    /* Convert to the target time zone */;
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));

    /* Calculate the offset in milliseconds */;
    const offset = utcDate.getTime() - tzDate.getTime();

    return offset;
};

window._my_custom_methods.parseDateTimeWithTimeZone = function parseDateTimeWithTimeZone(dateTimeString, timeZone = 'America/Chicago') {
    const date = new Date(dateTimeString);

    /* Convert to the target time zone by getting the offset */;
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000; /*Offset in milliseconds */;

    /* Calculate the offset for the specified time zone */;
    const targetOffset = window._my_custom_methods.getOffsetForTimezone(timeZone, date);

    /* Adjust the time by the difference between local and target offsets */;
    const targetTime = new Date(localTime + localOffset - targetOffset);
    
    return targetTime;
};

window._my_custom_methods.toJSONFriendlyFormat = function toJSONFriendlyFormat(date) {
    return (typeof date != null) ? date.toISOString() : "";
};

window._my_custom_methods.domToHtml = function domToHtml(node, banList = []) {
    /* Helper function to check if the node should be replaced or ignored */;
    const checkBanList = (node) => {
        if (typeof node.getAttribute !== 'function') return null;

        for (const object of banList) {
            const attributeValue = node.getAttribute(object.attribute);
            if (attributeValue == object.value && object.hasOwnProperty('replaceValue')) {
                return object.replaceValue;
            }
        }
        return null;
    };

    /* Function to recursively create and append elements */;
    const createHtmlElement = (node) => {
        /* Check if the node is in the banList and should be replaced */;
        const banListCheck = checkBanList(node);
        if (banListCheck !== null) {
            return banListCheck instanceof Node ? banListCheck.cloneNode(true) : document.createTextNode(String(banListCheck));
        }

        if (node.nodeType === Node.TEXT_NODE) {
            return document.createTextNode(node.textContent);
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return document.createTextNode('');
        }

        const newElement = document.createElement(node.tagName.toLowerCase());

        /* Handle specific tags like 'a', 'img', etc. */
        switch (newElement.tagName) {
            case 'a':
                newElement.href = node.getAttribute('href');
                break;
            case 'img':
                if (node.hasAttribute('src')) {
                    newElement.src = node.getAttribute('src');
                }
                if (node.hasAttribute('alt')) {
                    newElement.alt = node.getAttribute('alt');
                }
                break;
            default:
                /* Copy over other attributes if necessary */
                for (const attr of node.attributes) {
                    newElement.setAttribute(attr.name, attr.value);
                }
                break;
        }

        /* Recursively append child nodes */
        for (const child of node.childNodes) {
            const childElement = createHtmlElement(child);
            newElement.appendChild(childElement);
        }

        return newElement;
    };

    /* Start with a div as the root element */
    const rootElement = document.createElement('div');
    rootElement.appendChild(createHtmlElement(node));

    return rootElement;
};

window._my_custom_methods.TeamsChatMessageExtractor = function TeamsChatMessageExtractor() {
    window._my_custom_methods.extractChatMessageDetails = function extractChatMessageDetails(chatElement) {
        let referenceAuthorToken = "<REFERENCE_AUTHOR>";
        let referenceTimeToken = "<REFERENCE_TIME>";
        let referenceBodyToken = "<REFERENCE_BODY>";
        let divider = chatElement.querySelector('[class^="fui-Divider"]');
        let controlMessage = window._my_custom_methods.TeamsAutoBackupSelector(chatElement, '[data-tid="control-message-renderer"]');
        if (divider !== null) {
            return null;
        };
        if (controlMessage !== null) {
            let chatTime = null;
            let chatAuthor = "System";
            let chatBodyString = Array.from(controlMessage.childNodes[0].childNodes).map((item) => item?.textContent).join("");
            let chatBodyElement = document.createElement('span');
            chatBodyElement.textContent = chatBodyString;
            let chatBody = window._my_custom_methods.domToHtml(chatBodyElement);
            let referencedMessage = null;
            let reactionCounts = null;
            return {
                time: chatTime,
                author: chatAuthor,
                message: chatBody,
                referencedMessages: referencedMessage,
                reactions: reactionCounts,
                isEdited: null
            }
        };
        let chatBodyElement = chatElement.querySelector('[data-tid="chat-pane-message"]').querySelector('div');
        let chatTime = window._my_custom_methods.TeamsAutoBackupSelector(chatElement, '[class^="fui-ChatMessage__timestamp"]')?.dateTime;
        let chatAuthor = chatElement?.querySelector('[data-tid="message-author-name"]')?.textContent || "Unknown Author";
        let referenceWrappers = chatElement?.querySelectorAll('[data-track-module-name="messageQuotedReply"]');
        var hasReference = false;
        let reference_info = [];
        if (referenceWrappers !== null) {
            hasReference = true;
            for (referenceWrapper of referenceWrappers) {
                let referenceAuthor;
                let referenceTime;
                let referenceBody;
                let referenceSpans = referenceWrapper.querySelectorAll('span');
                if (referenceSpans.length >= 3) {
                    referenceAuthor = referenceSpans[0]?.textContent.trim();
                    referenceTime = window._my_custom_methods.toJSONFriendlyFormat(window._my_custom_methods.parseDateTimeWithTimeZone(referenceSpans[1]?.textContent.trim()));
                    referenceBody = referenceSpans[2]?.textContent.trim();
                };
                reference_info.push({referenceAuthor, referenceTime, referenceBody});
            }
        };
        
        var referenceReplacementValue = document.createElement('div');
        referenceReplacementValue.setAttribute('custom-data-track-module-name', 'messageQuotedReply');
        referenceReplacementValue.textContent = '<REFERENCE>';

        let banList = [
            { 'attribute': 'data-tid',               'value': 'url-preview' },
            { 'attribute': 'data-tid',               'value': 'atp-safelink' },
            { 'attribute': 'data-track-module-name', 'value': 'messageQuotedReply', 'replaceValue': referenceReplacementValue }
        ];

        let chatBody = window._my_custom_methods.domToHtml(node=chatBodyElement, banList=banList);
        
        let referencedMessages = (hasReference) 
            ? reference_info
            : null;
    
        let reactionCountsElements = [...chatElement.querySelectorAll('[data-tid$="-count"]')];
        let reactionCounts = reactionCountsElements.length > 0 
        ? reactionCountsElements.reduce((counts, each) => {
            counts[each.getAttribute('data-tid').replace('-count', '')] = each.textContent;
            return counts;
        }, {})
        : null;
    
        let output = {
            time: chatTime,
            author: chatAuthor,
            message: chatBody,
            referencedMessages: referencedMessages,
            reactions: reactionCounts,
            isEdited: null
        };
        return output;
    };
    
    
    
    var chat_pane = document.getElementById("chat-pane-list");
    var chatElements = chat_pane.children;
    var targetIndex = chatElements.length;
    var each = chatElements[targetIndex];
    var chatElement = each;
    var banned_character_codes = [55357, 56897];
    var chatElementsArray = Array.from(chatElements);
    var pre_output = chatElementsArray.map(item => window._my_custom_methods.extractChatMessageDetails(item))
    console.log(pre_output);
    pre_output = pre_output.filter(item => item !== null).filter(item => item?.author !== null);
    var output = pre_output;
    return output;
};

window._my_custom_methods.image_to_base64 = function image_to_base64(img_element) { 
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
};

window._my_custom_methods.domToMarkdown = function domToMarkdown(node, indentLevel = 0, banList = [], base64_flag = false) {
    /* Check if the node is in the ban list and should be replaced */;
    const replacementValue = window._my_custom_methods.getReplacementValueFromBanList(node=node, banList=banList);
    if (replacementValue !== null) {
        return replacementValue;
    }
    const parentNodeNewlineExclusions = ['p', 'span', '#text'];
    /* Handle text nodes */;
    /* if (node.nodeType === Node.TEXT_NODE) { */;
    if (node.nodeName == '#text') {
        return node.textContent;
    }

    /* Handle non-element nodes */;
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
    }
    let further_processing = null;
    let result = '';
    const tagName = node.nodeName.toLowerCase();

    /* Helper function to handle lists (ul, ol) */;
    function listToMarkdown(listElement, indentLevel) {
        if (!(listElement instanceof HTMLElement) || (listElement.tagName !== 'UL' && listElement.tagName !== 'OL')) {
            throw new Error('Invalid input: The element must be a <ul> or <ol>');
        }
        const indent_token = '<INDENT>';

        function removeAllTrailingNewline(str) {
            return str.replace(/\n+$/, '');
        };

        function parseList(element, level = 0) {
            let markdown = '';
            const listItems = element.children;

            for (let i = 0; i < listItems.length; i++) {
                const listItem = listItems[i];
                if (listItem.tagName !== 'LI') {
                    itemContent += domToMarkdown(node=listItem, indentLevel=level, banList=banList, base64_flag=base64_flag);
                }
    
                const prefix = element.tagName === 'UL' ? '- ' : `${i + 1}. `;
                const indent = indent_token.repeat(level);
                let conditional_newline = "";
                /* Extract the text content and any nested lists */;
                let itemContent = '';
                listItem.childNodes.forEach(node => {
                    if (node.nodeName === 'UL' || node.nodeName === 'OL') {
                        /* Recursively parse nested lists */;
                        itemContent += `\n${parseList(node, level + 1)}`;
                    } else if (node.nodeName == '#text') {
                        itemContent += removeAllTrailingNewline(node.textContent);
                    } else if (node.nodeName == 'BR') {
                        itemContent += "";
                    } else {
                        /* Include the text of other elements, if any */;
                        itemContent += domToMarkdown(node=node, indentLevel=level, banList=banList, base64_flag=base64_flag);
                    };
                });
                itemContent = removeAllTrailingNewline(itemContent).split("\n");
                if (itemContent.length != 1) {
                    /* Apply the operation to the first element */;
                    itemContent[0] = `${indent}${prefix}${removeAllTrailingNewline(itemContent[0])}`;

                    /* Apply the operation to the rest of the elements */;
                    for (let i = 1; i < itemContent.length; i++) {
                        itemContent[i] = itemContent[i].includes(indent_token) ?  removeAllTrailingNewline(itemContent[i]) : `${indent}${removeAllTrailingNewline(itemContent[i])}`;
                    };
                    markdown += `${itemContent.join("\n")}\n`;
                } else {
                    markdown += `${indent}${prefix}${itemContent[0]}\n`;
                }
            }
    
            return removeAllTrailingNewline(markdown);
        }
        let output = parseList(element=listElement, level=indentLevel).replaceAll(indent_token, window._my_custom_data.indent_String).replaceAll("\r\n","\n");
        return output;
    };

    /* Handle different element tags */;
    switch (tagName) {
        case 'i':
            return `*${node.textContent}*`;
        case 'strong':
            return `**${node.textContent}**`;
        case 'a':
            result += `[${node.textContent}](${node.getAttribute('href')})`;
            return result;
        case 'br':
            return '';
        case 'blockquote':
            further_processing = ((text)=>{
                return text.split("\n").map(line=>`>${line}`).join("\n");
            });
        case 'p':
        case 'div':
            result += Array.from(node.childNodes)
                .map(child => domToMarkdown(child, indentLevel, banList, base64_flag))
                .join('');
            if (further_processing != null) result = further_processing(result);
            var nodeParent = node?.parentNode;
            console.log(nodeParent)
            nodeParent = nodeParent !== null ? nodeParent.nodeName.toLowerCase() : 'null';
            var suffix = parentNodeNewlineExclusions.includes(nodeParent) ? '': '\n';
            return result + suffix;
        /* case 'li': */;
        case 'ul':
        case 'ol':
            return listToMarkdown(node);
        case 'img':
            return window._my_custom_methods.handleImageNode(node=node, indentLevel=indentLevel, base64_flag=base64_flag);
        default:
            result += Array.from(node.childNodes)
                .map(child => domToMarkdown(child, indentLevel, banList, base64_flag))
                .join('');
            return result;
    }
}

/* Helper function to check for ban list replacement values */;
window._my_custom_methods.getReplacementValueFromBanList = function getReplacementValueFromBanList(node, banList) {
    if (typeof node.getAttribute === 'undefined') return null;

    for (const object of banList) {
        const elementAttribute = node.getAttribute(object.attribute);
        if (elementAttribute === object.value && object.hasOwnProperty('replaceValue')) {
            return object.replaceValue;
        }
    }
    return null;
};

/* Helper function to handle image nodes */;
window._my_custom_methods.handleImageNode = function handleImageNode(node, indentLevel, base64_flag) {
    const itemType = node.getAttribute("itemtype");
    const handleId = window._my_custom_methods.itemtype_mappings(itemType) || "default";
    let imageOutput;

    switch (handleId) {
        case 'emoji':
            imageOutput = node.alt;
            break;
        case 'image':
            imageOutput = base64_flag ? `![image](${window._my_custom_methods.image_to_base64(node)})` : "📷";
            break;
        default:
            imageOutput = node.alt || node.src || '';
            break;
    }
    return `${'  '.repeat(indentLevel)}${imageOutput}\n`;
};

window._my_custom_methods.processMessage = function processMessage(message) {
    const parseDateTime = (dateTimeString) => {
    if (!dateTimeString) return null;
    const date = new Date(dateTimeString);
    return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
    };

    const time = parseDateTime(message.time);
    const references = message.referencedMessages ? message.referencedMessages.map(ref => ({
    author: ref.referenceAuthor,
    time: parseDateTime(ref.referenceTime),
    body: ref.referenceBody ? ref.referenceBody.trim() : ''
    })) : [];

    return {
        time: time,
        author: message.author,
        message_body: message.message,
        references: references,
        reactions: message.reactions,
        is_edited: message.isEdited
    };
};

window._my_custom_methods.formatMarkdown = function formatMarkdown(messageData) {
    const header = messageData.author && messageData.time ? 
    `${messageData.author} - ${messageData.time}  ` : 
    `${messageData.author}  `;

    let body = (messageData.message_body.replace("\r\n", "\n") || '').split("\n").map(line => `${line}  `).join("\n");

    messageData.references.forEach(ref => {
    const refBody = ref.body.split('\n').map(line => `>${line}  `).join('\n');
    const refHeader = `>${ref.author} - ${ref.time}  `;
    body = body.replace('<REFERENCE>', `${refHeader}\n${refBody}\n`);
    });

    const reactions = messageData.reactions ? 
    Object.entries(messageData.reactions).map(([name, count]) => `${name}: ${count}`).join('; ') : 
    '';

    const footer = `${reactions}` + `${messageData.is_edited ? '\nEdited' : ''}`;

    return `${header}\n${body}\n${footer}`.trim().replaceAll(/\u00a0/g, ' ');
};

window._my_custom_methods.formatHtml = function formatHtml(messageData) {
    const removeAllAttributes = (element) => {
        while (element.attributes.length > 0) {
            element.removeAttribute(element.attributes[0].name);
        }
    };
    const setNewAttributes = (element, attributes) => {
        removeAllAttributes(element);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }; 
    }
    window._my_custom_methods.setNewAttributesAll = function setNewAttributesAll(element, attributes, banList=[]) {
        for (banListEntry of banList) {
            if (!(element.hasAttribute(banListEntry.attribute) && element.getAttribute(banListEntry.attribute) === banListEntry.value)) {
                setNewAttributes(element, attributes);
            }
        }
    
        element.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                window._my_custom_methods.setNewAttributesAll(child, attributes);
            }
        });
    }
    const createElement = (tag, className, content) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content !== undefined && content !== null) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }
        return element;
    };

    window._my_custom_methods.processMessageBody = (bodyElement, references) => {
        const quoteElements = bodyElement.querySelectorAll('[custom-data-track-module-name="messageQuotedReply"]');
        
        quoteElements.forEach((quoteElement, index) => {
            if (index < references.length) {
                const refElement = createReferenceElement(references[index]);
                quoteElement.replaceWith(refElement);
                setNewAttributes(refElement, {'class': 'message-body.quote'});
            }
        });

        const mentionElements = bodyElement.querySelectorAll('[itemtype="http://schema.skype.com/Mention"]');
        mentionElements.forEach((mentionElement, index) => {
            if (index <= references.length) {
                const mentionParent = mentionElement.parentElement;
                mentionParent.replaceWith(mentionElement);
                setNewAttributes(mentionElement, {'class': 'message-body.mention'});
            }
        });
        var banList = [
            { 'attribute': 'class', 'value': 'message-body' },
            { 'attribute': 'class', 'value': 'message-body.mention' },
            { 'attribute': 'class', 'value': 'message-body.quote' }
        ];
        window._my_custom_methods.setNewAttributesAll(bodyElement, {'class': 'message-body'}, banList=banList);

        return bodyElement;
    };

    const createReferenceElement = (ref) => {
        const refElement = createElement('blockquote', 'message-reference');
        const refHeader = createElement('div', 'reference-header', `${ref.author} - ${ref.time}`);
        refElement.appendChild(refHeader);

        const refBody = createElement('div', 'reference-body');
        ref.body.split('\n').forEach(line => {
            const lineElement = createElement('div', 'reference-line', line);
            refBody.appendChild(lineElement);
        });
        refElement.appendChild(refBody);

        return refElement;
    };

    const header = createElement('div', 'message-header', `${messageData.author} - ${messageData.time}`);
    const bodyElement = window._my_custom_methods.processMessageBody(messageData.message_body, messageData.references);

    const container = createElement('div', 'message-container');
    container.appendChild(header);
    container.appendChild(bodyElement);

    if (messageData.reactions) {
        const reactionsContainer = createElement('div', 'message-reactions');
        for (const [reaction, count] of Object.entries(messageData.reactions)) {
            reactionsContainer.appendChild(createElement('span', null, `${reaction}: ${count}`));
            reactionsContainer.appendChild(document.createElement('br'));
        }
        container.appendChild(reactionsContainer);
    }

    if (messageData.is_edited) {
        container.appendChild(createElement('div', 'message-edited', 'Edited'));
    }

    return container.outerHTML;
};

window._my_custom_methods.process_messages = function process_messages(messages, base64_flag=true) {
    const chosen_format = (window.hasOwnProperty("_my_modal_settings") && window._my_modal_settings.hasOwnProperty("Output Format")) ? window._my_modal_settings["Output Format"] : 'markdown';
    const preprocessed_messages = messages.map(message=>window._my_custom_methods.processMessage(message));
    let postprocessed_messages;
    let seperator;
    switch (chosen_format) {
        case 'json':
            seperator = null;
            postprocessed_messages = JSON.stringify(preprocessed_messages.map(message=>{message.message_body = window._my_custom_methods.domToMarkdown(node=message.message_body, indentLevel=0, banList=[], base64_flag=base64_flag); return window._my_custom_methods.formatMarkdown(message)}));
            break;
        case 'markdown':
            seperator = "\n\n---\n\n";
            postprocessed_messages = preprocessed_messages.map(message=>{message.message_body = window._my_custom_methods.domToMarkdown(node=message.message_body, indentLevel=0, banList=[], base64_flag=base64_flag); return window._my_custom_methods.formatMarkdown(message)}).join(seperator);
            break;
        case 'html':
            seperator = "\n\n<br><br><hr><br><br>\n\n";
            postprocessed_messages = preprocessed_messages.map(message=>{return window._my_custom_methods.formatHtml(message)});
            postprocessed_messages = "<html>\n<body>\n"+postprocessed_messages.join(seperator)+"\n</body></html>";
            break;
        default:
            throw new Error(`Specified format "${chosen_format}" invalid.`);
    };

    return (postprocessed_messages);
};

window._my_custom_methods.showModal = function showModal(message) {
    /* Create modal container */;
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
  
    /* Create modal content */;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    `;
  
    /* Create message paragraph */;
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
  
    /* Create OK button */;
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
      margin-top: 10px;
      padding: 5px 10px;
      cursor: pointer;
    `;
  
    /* Add click event listener to OK button */;
    okButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  
    /* Assemble modal */;
    modalContent.appendChild(messageParagraph);
    modalContent.appendChild(okButton);
    modal.appendChild(modalContent);
  
    /* Add modal to the DOM */;
    document.body.appendChild(modal);

    /* Focus the OK button */;
    okButton.focus();
};

window._my_custom_methods.showModalSettings = function showModalSettings(message, settings) {
    let modal = document.getElementById('my-modal-settings');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'my-modal-settings';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#f0f0f0';
        modal.style.padding = '20px';
        modal.style.border = '1px solid #888';
        modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

        document.body.appendChild(modal);
    }

    if (!window._my_modal_settings) {
        window._my_modal_settings = {};
    }

    modal.textContent = '';

    const messageElement = document.createElement('h2');
    messageElement.textContent = message;
    modal.appendChild(messageElement);

    settings.forEach(setting => {
        if (!window._my_modal_settings.hasOwnProperty(setting.name)) {
            window._my_modal_settings[setting.name] = setting.value;
        }

        const settingDiv = document.createElement('div');
        settingDiv.style.marginBottom = '20px';
        settingDiv.id = `setting-container-${setting.name}`;

        const label = document.createElement('label');
        label.textContent = `${setting.name}: ${setting.description}`;
        label.style.display = 'block';
        label.style.marginBottom = '5px';
        settingDiv.appendChild(label);

        let input;

        switch (setting.type) {
            case 'String':
                input = document.createElement('input');
                input.type = 'text';
                input.value = window._my_modal_settings[setting.name];
                break;
            case 'Boolean':
                input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = window._my_modal_settings[setting.name];
                break;
            case 'radio':
                if (!Array.isArray(setting.available_values) || setting.available_values.length === 0) {
                    throw new Error(`Radio setting "${setting.name}" must have non-empty available_values array`);
                }
                if (!setting.available_values.includes(setting.value)) {
                    throw new Error(`Value "${setting.value}" for setting "${setting.name}" is not in available_values`);
                }
                if (!window._my_modal_settings.hasOwnProperty("radio_fields")) {
                    window._my_modal_settings.radio_fields = {};
                };
                input = document.createElement('div');
                window._my_modal_settings.radio_fields[setting.name] = setting.available_values;
                setting.available_values.forEach((value, index) => {
                    const radioDiv = document.createElement('div');
                    radioDiv.style.marginBottom = '5px';
                    
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = setting.name;
                    radioInput.value = value;
                    radioInput.checked = value === window._my_modal_settings[setting.name];
                    
                    const radioLabel = document.createElement('label');
                    radioLabel.textContent = value;
                    radioLabel.style.marginLeft = '5px';
                    
                    radioDiv.appendChild(radioInput);
                    radioDiv.appendChild(radioLabel);
                    input.appendChild(radioDiv);
                });
                break;
            default:
                throw new Error(`Unknown setting type: ${setting.type}`);
        }

        settingDiv.appendChild(input);
        modal.appendChild(settingDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
        settings.forEach(setting => {
            const settingDiv = document.getElementById(`setting-container-${setting.name}`);
            if (setting.type === 'String') {
                const input = settingDiv.querySelector('input[type="text"]');
                window._my_modal_settings[setting.name] = input.value;
            } else if (setting.type === 'Boolean') {
                const input = settingDiv.querySelector('input[type="checkbox"]');
                window._my_modal_settings[setting.name] = input.checked;
            } else if (setting.type === 'radio') {
                const selectedRadio = settingDiv.querySelector('input[type="radio"]:checked');
                if (selectedRadio) {
                    window._my_modal_settings[setting.name] = selectedRadio.value;
                }
            }
        });
        console.log('Updated settings:', window._my_modal_settings);
        window._my_custom_methods.showModal('Updated settings.');
    };

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    const buttonDiv = document.createElement('div');
    buttonDiv.style.marginTop = '20px';
    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(closeButton);
    modal.appendChild(buttonDiv);

    modal.style.display = 'block';
};

/* Create the dropdown button */;
window._my_custom_methods.createDropdownButton = function createDropdownButton(id) {
    const button = document.createElement('button');
    button.setAttribute('data-custom-dropdown', id);
    const arrow = document.createTextNode('\u25BC'); /* Downward arrow character */;
    button.appendChild(arrow);
    button.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    `;
    document.body.appendChild(button);
    return button;
};

/* Create the modal */;
window._my_custom_methods.createModal = function createModal(items, id) {
    const modal = document.createElement('div');
    modal.setAttribute('data-custom-modal', id);
    modal.style.cssText = `
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
    `;

    items.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item.text;
    element.style.cssText = `
        padding: 8px 0;
        cursor: pointer;
    `;
    element.addEventListener('click', item.onClick);
    modal.appendChild(element);
    });

    document.body.appendChild(modal);
    return modal;
};

window._my_custom_methods.setupDropdown = function setupDropdown(items, id) {
    const button = window._my_custom_methods.createDropdownButton(id);
    const modal = window._my_custom_methods.createModal(items, id);

    button.addEventListener('click', () => {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
        /* Position the modal below the button */;
        const rect = button.getBoundingClientRect();
        modal.style.top = `${rect.bottom}px`;
        modal.style.left = `${rect.left}px`;
    } else {
        modal.style.display = 'none';
    }
    });

    /* Close the modal when clicking outside */;
    window.addEventListener('click', (event) => {
    if (event.target !== button && !modal.contains(event.target)) {
        modal.style.display = 'none';
    }
    });

    /* Remove the button from the body (it was added in window._my_custom_methods.createDropdownButton) */;
    document.body.removeChild(button);

    return button;
};
window._my_custom_data.custom_id = "my_modal_trigger";
window._my_custom_data.custom_id_css_selector_dropdown = '[data-custom-dropdown="'+window._my_custom_data.custom_id+'"]';
window._my_custom_data.custom_id_css_selector_modal = '[data-custom-modal="'+window._my_custom_data.custom_id+'"]';
window._my_custom_methods.get_nav_bar = function get_nav_bar(){return document.querySelector('[data-tid="app-layout-area--header"]')};
window._my_custom_methods.getMenu = function getMenu() {
    return {
        "dropdown": document.querySelector(window._my_custom_data.custom_id_css_selector_dropdown),
        "modal": document.querySelector(window._my_custom_data.custom_id_css_selector_modal)
    };
};
window._my_custom_methods.deleteMenu = function deleteMenu(modal_elements) {
    if (modal_elements.dropdown !== null) {
        modal_elements.dropdown.parentElement.removeChild(modal_elements.dropdown);
    };
    if (modal_elements.modal !== null) {
        modal_elements.modal.parentElement.removeChild(modal_elements.modal);
    };
};
window._my_custom_methods.addMenu_func = function addMenu_func(items) {
    const menu_check = window._my_custom_methods.getMenu();
    if (menu_check.modal != null || menu_check.dropdown != null) window._my_custom_methods.deleteMenu(menu_check);
    const dropdown = window._my_custom_methods.setupDropdown(items, window._my_custom_data.custom_id);
    window._my_custom_methods.get_nav_bar().childNodes[0].prepend(dropdown);
};
/* Check if the observerRegistry already exists in the global scope */;
if (!window.observerRegistry) {
    window.observerRegistry = new Map();
};
window._my_custom_methods.getObserver = function getObserver(observerId) {
    return window.observerRegistry.get(observerId);
};
window._my_custom_methods.removeObserver = function removeObserver(observerId) {
    if (window.observerRegistry.has(observerId)) {
    const { observer } = window.observerRegistry.get(observerId);
    observer.disconnect();
    window.observerRegistry.delete(observerId);
    console.log(`Observer '${observerId}' removed.`);
    return true;
    }
    console.warn(`Observer '${observerId}' not found.`);
    return false;
};

window._my_custom_methods.createMutationObserver = function createMutationObserver(element, callback, observerId) {
    /* Check if the parameters are valid */;
    if (!(element instanceof Element) || typeof callback !== 'function' || typeof observerId !== 'string') {
        throw new Error('Invalid parameters');
    }

    /* Check if an observer with this ID already exists */;
    if (window.observerRegistry.has(observerId)) {
        console.warn(`Observer with ID '${observerId}' already exists. Removing the existing one.`);
        window._my_custom_methods.removeObserver(observerId);
    }

    /* Create a new MutationObserver */;
    const observer = new MutationObserver((mutations) => {
        callback(mutations);
    });

    /* Configure the observer */;
    const config = {
    attributes: true,
    childList: false,
    subtree: false,
    characterData: false
    };

    /* Start observing the target element */;
    observer.observe(element, config);

    /* Store the observer in the registry */;
    window.observerRegistry.set(observerId, { observer, element });

    console.log(`Observer '${observerId}' created and started.`);

    /* Return the observer ID for reference */;
    return observerId;
};

window._my_custom_methods.settings_list = function settings_list(){
    return [
        {
            "name": "Output Format",
            "description": "Choose from available output formats.",
            "type": "radio",
            "value": "markdown",
            "available_values": ["json", "markdown", "html"]
        }
    ];
}
window._my_custom_methods.initialize_settings = function initialize_settings(settings_list) {
    if (!window._my_modal_settings) {
        window._my_modal_settings = {};
    }
    settings_list.forEach(setting=>{
        if (!(window._my_modal_settings.hasOwnProperty(setting.name))) {
            window._my_modal_settings[setting.name] = setting.value;
        }
    });
};
window._my_custom_methods.initialize_settings(window._my_custom_methods.settings_list());
if (!window._my_custom_menu) {
    window._my_custom_menu = {};
};
window._my_custom_methods.setting_click = (() => {
    window._my_custom_methods.showModalSettings("Settings", window._my_custom_methods.settings_list());
});
window._my_custom_methods.copyTeamsMessages = ((base64_flag, modal_message) => {
    try {
        var extractedMessages = window._my_custom_methods.TeamsChatMessageExtractor();
        var chosen_format = (window._my_modal_settings.hasOwnProperty("Output Format")) ? window._my_modal_settings["Output Format"] : 'markdown'
        var formatted_messages = window._my_custom_methods.process_messages(extractedMessages, base64_flag=base64_flag);
        window._my_custom_methods.copyToClipboard(formatted_messages);
        window._my_custom_methods.showModal(modal_message+`"${chosen_format}"`+'.');
    } catch (error) {
        console.error("Error in window._my_custom_methods.TeamsChatMessageExtractor:", error);
    }
});
window._my_custom_menu.items = [
    {text: 'Settings', onClick: window._my_custom_methods.setting_click},
    {text: 'Copy Teams Messages with images', onClick: ()=>{window._my_custom_methods.copyTeamsMessages(base64_flag=true, modal_message='Chat messages copied with images to clipboard as ')}},
    {text: 'Copy Teams Messages without images', onClick: ()=>{window._my_custom_methods.copyTeamsMessages(base64_flag=false, modal_message='Chat messages copied without images to clipboard as ')}}
];
if (addMenu == true) {
    window._my_custom_methods.mutation_runner = (()=>{
        var menu_check = window._my_custom_methods.getMenu()
        if (!(menu_check.dropdown && menu_check.modal)) {
            var items = (()=>{return window._my_custom_menu.items})()
            window._my_custom_methods.addMenu_func(items);
        };
    });
    window._my_custom_methods.mutation_runner();
    window._my_custom_methods.createMutationObserver(
        document.body,
        window._my_custom_methods.mutation_runner,
        'my_observer'
    );
};
if (runDirect == true) {
    let old_format = (window.hasOwnProperty("_my_modal_settings") && window._my_modal_settings.hasOwnProperty("Output Format")) ? window._my_modal_settings["Output Format"] : "markdown";
    window._my_modal_settings["Output Format"] = specifiedFormat;
    let modal_message = (base64_flag == true) ? 'Chat messages copied with images to clipboard as ' : 'Chat messages copied without images to clipboard as ';
    window._my_custom_methods.copyTeamsMessages(base64_flag=base64_flag, modal_message=modal_message);
    window._my_modal_settings["Output Format"] = old_format;
};
})(runDirect=runDirect, base64_flag=base64_flag, addMenu=addMenu, specifiedFormat=specifiedFormat, removeScript=removeScript);