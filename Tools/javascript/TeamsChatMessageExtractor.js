var runDirect = false;
var base64_flag = true;
var addMenu = true;
((runDirect, base64_flag, addMenu)=>{
    var TeamsChatMessageExtractor = ((base64_flag=true)=>{
    
    function toJSONFriendlyFormat(date) {
        var output;
        if (typeof date != null) {
            output = date.toISOString();
        } else {
            output = "";
        };
        //console.log(output);
        return output;
    };
    
    function parseDateTimeWithTimeZone(dateTimeString, timeZone = 'America/Chicago') {
        const date = new Date(dateTimeString);
    
        /* Convert to the target time zone by getting the offset */;
        const localTime = date.getTime();
        const localOffset = date.getTimezoneOffset() * 60000; /*Offset in milliseconds */;
    
        /* Calculate the offset for the specified time zone */;
        const targetOffset = getOffsetForTimezone(timeZone, date);
    
        /* Adjust the time by the difference between local and target offsets */;
        const targetTime = new Date(localTime + localOffset - targetOffset);
        
        return targetTime;
    };
    
    function getOffsetForTimezone(timeZone, date) {
        /* Convert to UTC */;
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    
        /* Convert to the target time zone */;
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    
        /* Calculate the offset in milliseconds */;
        const offset = utcDate.getTime() - tzDate.getTime();
    
        return offset;
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
    
    function domToMarkdown(node, indentLevel = 0, banList = []) {
        let banListCheck = (typeof node.getAttribute !== 'undefined') ? banList.map(object => {
            let elementAttribute = node?.getAttribute(object.attribute);
            return (elementAttribute == object.value && object.hasOwnProperty('replaceValue')) ? object.replaceValue : null;
        }).filter(element => element !== null) : [];
        if (banListCheck.length > 0) {
            return banListCheck[0];
        };
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        };
    
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        };
    
        let result = '';
        const tagName = node.tagName.toLowerCase();
        const isListItem = tagName === 'li';
        const isUnorderedList = tagName === 'ul';
        const isParagraph = tagName === 'p';
    
        if (isListItem) {
            result += '  '.repeat(indentLevel) + '- ';
        };
    
        if (isParagraph) {
            // For paragraphs, concatenate all child content without newlines
            result = Array.from(node.childNodes)
                .map(child => domToMarkdown(child, indentLevel, banList))
                .join('')
                .trim();
            return '  '.repeat(indentLevel) + result + '\n\n';
        }
    
        for (const child of node.childNodes) {
            const childTag = child.nodeType === Node.ELEMENT_NODE ? child.tagName.toLowerCase() : null;
            
            if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && ['a', 'strong', 'em', 'code', 'span'].includes(childTag))) {
                result += domToMarkdown(child, indentLevel, banList);
            } else {
                result += domToMarkdown(child, isUnorderedList ? indentLevel + 1 : indentLevel, banList);
            };
        };
    
        switch (tagName) {
            case 'a':
                return `[${node.textContent}](${node.getAttribute('href')})`;
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
                    };
                    switch (handle_id) {
                        case 'emoji':
                            image_output = node.alt;
                            break;
                        case 'image':
                            if (base64_flag == true) {
                                var base64 = image_to_base64(node);
                                image_output = "![image](" + String(base64) + ")";
                            } else {
                                image_output = "📷";
                            };
                            break;
                        default:
                            if (node.hasAttribute("alt")) {
                                image_output = node.alt;
                                break;
                            };
                            if (node.hasAttribute("src")) {
                                image_output = node.src;
                                break;
                            };
                            break;
                    };
                    return '  '.repeat(indentLevel) + image_output + '\n';
                default:
                return result;
        };
    };
    
    function extractChatMessageDetails(chatElement) {
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
                referencedMessages: referencedMessage,
                reactions: reactionCounts,
                isEdited: null
            }
        };
        let chatBodyElement = chatElement.querySelector('[data-tid="chat-pane-message"]').querySelector('div');
        let chatTime = TeamsAutoBackupSelector(chatElement, '[class^="fui-ChatMessage__timestamp"]')?.dateTime;
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
                    referenceTime = toJSONFriendlyFormat(parseDateTimeWithTimeZone(referenceSpans[1]?.textContent.trim()));
                    referenceBody = referenceSpans[2]?.textContent.trim();
                };
                reference_info.push({referenceAuthor, referenceTime, referenceBody});
            }
        };
        
        let banList = [
            /*{ attribute: 'data-tid', value: 'url-preview' },
            { attribute: 'aria-label', value: 'Reaction summary' },
            { attribute: 'class', value: 'fui-ChatMessage__avatar' },*/
            { attribute: 'data-track-module-name', value: 'messageQuotedReply', replaceValue: '<REFERENCE>' }
        ];
    
        let chatBody = domToMarkdown(chatBodyElement, 0, banList);
            
        
        /* var isEdited = false; */;
        
        let referencedMessages = (hasReference) 
            ? reference_info
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
            referencedMessages: referencedMessages,
            reactions: reactionCounts,
            isEdited: null
        };
        return output;
    };
    
    var itemtype_mappings = {
        "http://schema.skype.com/Emoji": "emoji",
        "http://schema.skype.com/AMSImage": "image"
    }
    
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
    
    var chat_pane = document.getElementById("chat-pane-list");
    var chatElements = chat_pane.children;
    var targetIndex = chatElements.length;
    var each = chatElements[targetIndex];
    var chatElement = each;
    var banned_character_codes = [55357, 56897];
    var chatElementsArray = [...chatElements];
    /* chatElementsArray = chatElementsArray.slice(chatElementsArray.length - 1, chatElementsArray.length) */;
    var output = chatElementsArray.map(item => extractChatMessageDetails(item)).filter(item => item !== null);
    var json_string = JSON.stringify(output).replace(/\\\\"/g, '\\"').replace(/\\\\/g, '\\\\');
    console.log(json_string);
    
    copyToClipboard(json_string);
    
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
    };
    return output;
    });

    function showModal(message) {
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
      };

    /* Create the dropdown button */;
    function createDropdownButton(id) {
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
    function createModal(items, id) {
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
    
    /* Main function to set up the dropdown */;
    function setupDropdown(items, id) {
        const button = createDropdownButton(id);
        const modal = createModal(items, id);
  
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
    
        /* Remove the button from the body (it was added in createDropdownButton) */;
        document.body.removeChild(button);
    
        return button;
    };
  
  var items = [
    {text: 'Copy Teams Messages with images', onClick: () => {
            TeamsChatMessageExtractor(true);
            showModal("Chat Messages, copied to clipboard as JSON.")
        }
    },
    {text: 'Copy Teams Messages without images', onClick: () => {
            TeamsChatMessageExtractor(false);
            showModal("Chat Messages, copied to clipboard as JSON.")
        }
    },
  ];
  if (addMenu == true) {
    var custom_id = "my_modal_trigger";
    var custom_id_css_selector_dropdown = '[data-custom-dropdown="'+custom_id+'"]';
    var custom_id_css_selector_modal = '[data-custom-modal="'+custom_id+'"]';
    var dropdown_exist = document.querySelector(custom_id_css_selector_dropdown);
    var modal_exist = document.querySelector(custom_id_css_selector_modal);
    if (dropdown_exist !== null) {
        dropdown_exist.parentElement.removeChild(dropdown_exist);
    };
    if (modal_exist !== null) {
        modal_exist.parentElement.removeChild(modal_exist);
    };
    var dropdown = setupDropdown(items, custom_id);
    document.querySelector('[data-shortcut-context="chat-messages-list"]').childNodes[0].prepend(dropdown);
  };
  if (runDirect == true) {
    return TeamsChatMessageExtractor(base64_flag)
  };
})(runDirect, base64_flag, addMenu)