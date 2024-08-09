var runDirect = false;
var base64_flag = true;
var addMenu = true;
var specifiedFormat = 'json';
((runDirect, base64_flag, addMenu, specifiedFormat)=>{
    if (!window.hasOwnProperty('_my_custom_methods')) {
        window._my_custom_methods = {};
    };

    window._my_custom_methods.TeamsChatMessageExtractor = ((base64_flag=true)=>{
        function toJSONFriendlyFormat(date) {
            var output;
            if (typeof date != null) {
                output = date.toISOString();
            } else {
                output = "";
            };
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
                /* For paragraphs, concatenate all child content without newlines */;
                result = Array.from(node.childNodes)
                    .map(child => domToMarkdown(child, indentLevel, banList))
                    .join('')
                    .trim();
                return '  '.repeat(indentLevel) + result + '\n';
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
        
        window._my_custom_methods.copyToClipboard = function copyToClipboard(text) {
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
        var pre_output = chatElementsArray.map(item => extractChatMessageDetails(item)).filter(item => item !== null);
        var json_string = JSON.stringify(pre_output).replace(/\\\\"/g, '\\"').replace(/\\\\/g, '\\\\');
        var output = JSON.parse(json_string);
        
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
    
        if (typeof window._my_modal_settings === 'undefined') {
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
    window._my_custom_methods.setupDropdown = function setupDropdown(items, id) {
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
    var custom_id = "my_modal_trigger";
    var custom_id_css_selector_dropdown = '[data-custom-dropdown="'+custom_id+'"]';
    var custom_id_css_selector_modal = '[data-custom-modal="'+custom_id+'"]';
    window._my_custom_methods.get_nav_bar = (()=>{return document.querySelector('[data-tid="app-layout-area--header"]')});
    var get_nav_bar = window._my_custom_methods.get_nav_bar;
    var nav_bar = window._my_custom_methods.get_nav_bar();
    
    function processMessage(message) {
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
          
    function formatMarkdown(messageData) {
        const header = messageData.author && messageData.time ? 
        `${messageData.author} - ${messageData.time}  \n` : 
        `${messageData.author}  \n`;
    
        let body = messageData.message_body || '';
    
        messageData.references.forEach(ref => {
        const refBody = ref.body.split('\n').map(line => `>${line}  `).join('\n');
        const refHeader = `>${ref.author} - ${ref.time}  `;
        body = body.replace('<REFERENCE>', `\n${refHeader}\n${refBody}\n`);
        });
    
        const reactions = messageData.reactions ? 
        Object.entries(messageData.reactions).map(([name, count]) => `${name}: ${count}`).join('\n') : 
        '';
    
        const footer = `${reactions}  ${messageData.is_edited ? '\nEdited' : ''}`;
    
        return `${header}\n${body}\n${footer}`.trim();
    }
        
    function formatHtml(messageData) {
        const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        };
    
        const header = messageData.author && messageData.time ? 
        `<b>${escapeHtml(messageData.author)}</b> - <i>${escapeHtml(messageData.time)}</i><br>` : 
        `<b>${escapeHtml(messageData.author)}</b><br>`;
    
        let body = escapeHtml(messageData.message_body || '');
    
        messageData.references.forEach(ref => {
        const refBody = ref.body.split('\n').map(line => `<span>${escapeHtml(line)}</span><br>`).join('');
        const refHeader = `<b>${escapeHtml(ref.author)}</b> - <i>${escapeHtml(ref.time)}</i>`;
        body = body.replace('<REFERENCE>', `<blockquote><br>${refHeader}<br>${refBody}<br></blockquote>`);
        });
    
        const reactions = messageData.reactions ? 
        Object.entries(messageData.reactions).map(([name, count]) => `${escapeHtml(name)}: ${count}`).join('<br>') : 
        '';
    
        const footer = `${reactions}${messageData.is_edited ? '<br>Edited' : ''}`;
    
        return `<div>${header}${body}${footer}</div>`.trim();
    };

    function generate_html(messages) {
        return messages.map((messages)=>{return formatHtml(messages)});
    };

    function generate_markdown(messages) {
        return messages.map((messages)=>{return formatMarkdown(messages)});
    };

    window._my_custom_methods.process_messages = function process_messages(messages) {
        var chosen_format;
        if (window._my_modal_settings.hasOwnProperty("Output Format")) {
            chosen_format = window._my_modal_settings["Output Format"];
        };
        var preprocessed_messages = messages.map((message)=>{return processMessage(message)});
        var postprocessed_messages;
        switch (chosen_format) {
            case 'json':
                postprocessed_messages = JSON.stringify((window.hasOwnProperty("debugjsonstuff")) ? preprocessed_messages : messages);
                break;
            case 'markdown':
                var seperator = "\n\n---\n\n";
                postprocessed_messages = generate_markdown(preprocessed_messages).join(seperator);
                break;
            case 'html':
                var seperator = "<br><br><hl><br><br>";
                postprocessed_messages = generate_html(preprocessed_messages).join(seperator);
                postprocessed_messages = "<html>\n<body>\n"+postprocessed_messages+"\n</body></html>";
                break;
            default:
                throw new Error(`Specified format "${chosen_format}" invalid.`);
        }

        window._my_custom_methods.copyToClipboard(postprocessed_messages);
    };

    window._my_custom_methods.getMenu = function getMenu() {
        return {
            "dropdown": document.querySelector(custom_id_css_selector_dropdown),
            "modal": document.querySelector(custom_id_css_selector_modal)
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
        var menu_check = window._my_custom_methods.getMenu();
        if (menu_check.modal != null || menu_check.dropdown != null) window._my_custom_methods.deleteMenu(menu_check);
        var dropdown = window._my_custom_methods.setupDropdown(items, custom_id);
        window._my_custom_methods.get_nav_bar().childNodes[0].prepend(dropdown);
    };
  
    /* Check if the observerRegistry already exists in the global scope */;
    if (!window.observerRegistry) {
        window.observerRegistry = new Map();
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

    window._my_custom_methods.getObserver = function getObserver(observerId) {
        return window.observerRegistry.get(observerId);
    };

    if (!window.hasOwnProperty("_my_custom_menu")) {
        window._my_custom_menu = {};
    };
    window._my_custom_menu.items = [
        {text: 'Settings', onClick: () => {
            window._my_custom_methods.showModalSettings("Settings", [
                    {
                        "name": "Output Format",
                        "description": "Choose from available output formats.",
                        "type": "radio",
                        "value": "json",
                        "available_values": ["json", "markdown", "html"]
                    }
                ]);
            }
        },
        {text: 'Copy Teams Messages with images', onClick: () => {
            try {
                var extractedMessages = window._my_custom_methods.TeamsChatMessageExtractor(true);
                var chosen_format = (window._my_modal_settings.hasOwnProperty("Output Format")) ? window._my_modal_settings["Output Format"] : 'json'
                window._my_custom_methods.process_messages(extractedMessages);
                window._my_custom_methods.showModal(`Chat messages copied to clipboard as "${chosen_format}".`);
            } catch (error) {
                console.error("Error in TeamsChatMessageExtractor:", error);
            }
        }},
        {text: 'Copy Teams Messages without images', onClick: () => {
            try {
                var extractedMessages = window._my_custom_methods.TeamsChatMessageExtractor(false);
                var chosen_format = (window._my_modal_settings.hasOwnProperty("Output Format")) ? window._my_modal_settings["Output Format"] : 'json'
                window._my_custom_methods.process_messages(extractedMessages);
                window._my_custom_methods.showModal(`Chat messages copied to clipboard as "${chosen_format}".`);
            } catch (error) {
                console.error("Error in TeamsChatMessageExtractor:", error);
            }
        }},
    ];
    if (addMenu == true) {
        window._my_custom_methods.addMenu_func(window._my_custom_menu.items);
        window._my_custom_methods.createMutationObserver(
            document.body,
            ((monitor_element)=>{
                return (()=>{
                    var nav_bar = window._my_custom_methods.get_nav_bar();
                    if (monitor_element != nav_bar) {
                        monitor_element = nav_bar;
                        var items = (()=>{return window._my_custom_menu.items})()
                        window._my_custom_methods.addMenu_func(items);
                    };
                })
            })(nav_bar),
            'my_observer'
        );
    };
    if (runDirect == true) {
        return window._my_custom_methods.TeamsChatMessageExtractor(base64_flag);
    };
})(runDirect, base64_flag, addMenu, specifiedFormat)
