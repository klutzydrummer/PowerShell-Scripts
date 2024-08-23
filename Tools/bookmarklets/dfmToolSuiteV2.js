javascript:(async ()=>{
    if (!window.customMethods) window.customMethods = {};
    if (!window.customData) window.customData = {};
    if (window.customData.watcherInterval) clearInterval(window.customData.watcherInterval);
    if (!window.customData.current) window.customData.current = {};
    if (!window.customData.previous) window.customData.previous = {};
    if (!window.customData.observers) window.customData.observers = {};
    if (!window.customData.modalMenus) window.customData.modalMenus = {};
    if (!window.customData.cache) window.customData.cache = {};
    if (!window.customData.cache.icmCases) window.customData.cache.icmCases = [];
    if (!window.customData.icmIgnoreList) window.customData.icmIgnoreList = ['521569962', '530255719', '508302265', '493942016'];
    if (!window.customData.icmCaseLinkPrefill) window.customData.icmCaseLinkPrefill = {"2403250040011261":["493942016","530875666"],"2402020040005877":["508302265"],"2406270050004742":["521569962","530255719","534802138","534806928"],"2405130010004264":["523584742"],"2408140030008247":["534811045"],"2403180040012580":["535170649"]};
    if (!window.customData.icmCaseLinkPrefillApplied) window.customData.icmCaseLinkPrefillApplied = false;
    if (!window.customData.signals) window.customData.signals = {};

    window.customData.enhancementActive = false;
    window.customData.dataHarvestActive = false;
    window.customData.slaAlarmAcknowledged = false;
    window.customData.slaAlarmSilenceCounter = 0;
    window.customData.alarmSound = new Audio('data:audio/mp3;base64,SUQzBAA...');

    customMethods.waitForElementHelper = async function waitForElementHelper(checkFunction, retryInterval, maxTimeout) {
        const startTime = Date.now();
    
        const checkCondition = () => {
            return new Promise(resolve => {
                const result = checkFunction();
                if (result) {
                    resolve(result);
                } else if (Date.now() - startTime > maxTimeout) {
                    resolve(null);
                } else {
                    setTimeout(() => resolve(checkCondition()), retryInterval);
                }
            });
        };
    
        return await checkCondition();
    };

    customMethods.waitForElementWithRetry = async function waitForElementWithRetry(context, selector, retryInterval = 500, maxTimeout = 10000) {
        return await customMethods.waitForElementHelper(
            () => context.querySelector(selector),
            retryInterval,
            maxTimeout
        );
    };

    customMethods.waitForAllElementsWithRetry = async function waitForAllElementsWithRetry(context, selector, retryInterval = 500, maxTimeout = 10000) {
        return await customMethods.waitForElementHelper(
            () => {
                const elements = context.querySelectorAll(selector);
                return elements.length > 0 ? Array.from(elements) : null;
            },
            retryInterval,
            maxTimeout
        );
    };

    customMethods.emitSignal = (signal, data) => {
        if (customData.signals[signal]) {
            customData.signals[signal].forEach(callback => callback(data));
        }
    };

    customMethods.connectSignal = (signal, callback) => {
        if (!customData.signals[signal]) {
            customData.signals[signal] = [];
        }
        customData.signals[signal].push(callback);
    };

    /* Utility Functions */
    customMethods.updateInfo = function updateInfo(key, data) {
        customData.previous[key] = customData.current[key] || {};
        customData.current[key] = { ...data };
        customMethods.emitSignal(`update:${key}`, data);
    };
    
    customMethods.getInfo = function getInfo(key) {
        return {
            'previous': customData.previous[key] || null,
            'current': customData.current[key] || null
        }
    };

    customMethods.getPreviousAddressBar = function getPreviousAddressBar() {
        return customMethods.getInfo('url').previous;
    };

    customMethods.updateAddressBar = function updateAddressBar() {
        const currentAddress = window.location.href;
        const currentStoredAddress = customMethods.getInfo('url').current;
        if (currentStoredAddress !== currentAddress) {
            customMethods.updateInfo('url', { 'url': currentAddress });
        };

    };

    customMethods.getCurrentAddressBar = function getCurrentAddressBar() {
        const currentAddress = window.location.href;
        const currentStoredAddress = customMethods.getInfo('url').current;
        if (currentStoredAddress !== currentAddress) customMethods.updateAddressBar();
        return currentAddress;
    };

    customMethods.checkForPageChange = async function checkForPageChange() {
        const currentPageType = await customMethods.getPageType();
        const previousPageType = customMethods.getPreviousPageType();
        const emitSignal = (signalData) => customMethods.emitSignal('pageChanged', signalData);
    
        if (currentPageType !== previousPageType) {
            customMethods.updatePageType(currentPageType);
            emitSignal({ previousPageType, currentPageType });
            return;
        }
    
        switch (currentPageType) {
            case 'dashboard':
                const currentDashboardName = await customMethods.getDashboardName();
                const previousDashboardName = customData.previous.dashboardName || null;
                if (currentDashboardName !== previousDashboardName) {
                    customMethods.updateInfo('dashboardName', { dashboardName: currentDashboardName });
                    emitSignal({ pageType: currentPageType, previousDashboardName, currentDashboardName });
                }
                break;
            case 'case':
                const currentCaseNumber = customMethods.getPageCaseNumber().current?.caseNumber;
                const previousCaseNumber = customMethods.getPageCaseNumber().previous?.caseNumber;
                if (currentCaseNumber !== previousCaseNumber) {
                    emitSignal({ pageType: currentPageType, previousCaseNumber, currentCaseNumber });
                }
                break;
            case 'email':
                const currentEmailCaseNumber = customMethods.getRecentEmailCaseNumber()?.caseNumber;
                const previousEmailCaseNumber = customMethods.getPageCaseNumber().previous?.caseNumber;
                if (currentEmailCaseNumber !== previousEmailCaseNumber) {
                    emitSignal({ pageType: currentPageType, previousEmailCaseNumber, currentEmailCaseNumber });
                }
                break;
            default:
                break;
        }
    };

    customMethods.setupPageChangeWatcher = function setupPageChangeWatcher() {
        customMethods.connectSignal('pageChanged', customMethods.headerEnhancer);
        customMethods.checkForPageChange();
        customData.watcherInterval = setInterval(customMethods.checkForPageChange, 1000);
    };

    customMethods.updatePageType = function updatePageType(pageType) {
        customMethods.updateInfo('pageType', { pageType });
    };

    customMethods.getPreviousPageType = function getPreviousPageType() {
        return customMethods.getInfo('pageType').previous;
    };

    customMethods.updatePageCaseNumber = function updatePageCaseNumber(caseNumber) {
        customMethods.updateInfo('case', {'caseNumber': caseNumber});
    };

    customMethods.getPageCaseNumber = function getPageCaseNumber() {
        return customMethods.getInfo('case').current;
    };

    customMethods.getPreviousPageCaseNumber = function getPageCaseNumber() {
        return customMethods.getInfo('case').previous;
    };

    customMethods.getRecentEmailCaseNumber = function getRecentEmailCaseNumber() {
        return customMethods.getInfo('email').current;
    };

    customMethods.setRecentEmailCaseNumber = function setRecentEmailCaseNumber(caseNumber) {
        customMethods.updateInfo('email', {'caseNumber': caseNumber});
    };

    customMethods.getPageType = async function getPageType() {
        const pageTypes = [
            ['email', '[title="Email"]'],
            ['case', '[aria-label="Case Form"]'],
            ['dashboard', '[id^="Dashboard_Selector_"]']
        ];
        const currentPage = (
            await Promise.all(
                pageTypes.map(async ([type, selector]) => {
                    const element = await customMethods.waitForElementWithRetry(document, selector);
                    return element ? type : null;
                })
            )
        ).filter(Boolean);
        return currentPage.length > 0 ? currentPage[0] : null;
    };

    customMethods.getDashboardName = async function getDashboardName() {
        const dashboardNameElement = await customMethods.waitForElementWithRetry(document, '[id^="Dashboard_Selector_"]');
        const dashboardName = (!dashboardNameElement) ? null : dashboardNameElement.textContent.trimEnd();
        return dashboardName;
    };

    customMethods.textContentFixer = function textContentFixer(text) {
        const textHalfwayPoint = Math.floor(text.length / 2);
        const firstHalf = text.slice(0, textHalfwayPoint);
        const secondHalf = text.slice(textHalfwayPoint);
        
        return firstHalf === secondHalf ? firstHalf : text;
    };    

    customMethods.copyToClipboard = function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.value = text.replace("\n","\r\n");
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Text copied to clipboard: " + text);
    };

    customMethods.add30DaysAndStringify = function add30DaysAndStringify() {
        const currentDate = new Date();
        const newDate = customMethods.addToDate(currentDate, { days: 30 });
        return customMethods.emailDateStringify(newDate);
    };

    customMethods.addToDate = function addToDate(date, { seconds = 0, minutes = 0, hours = 0, days = 0, weeks = 0, months = 0, years = 0 } = {}) {
        const newDate = new Date(date);
        newDate.setSeconds(newDate.getSeconds() + seconds);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        newDate.setHours(newDate.getHours() + hours);
        newDate.setDate(newDate.getDate() + days + (weeks * 7));
        newDate.setMonth(newDate.getMonth() + months);
        newDate.setFullYear(newDate.getFullYear() + years);
        return newDate;
    };

    customMethods.emailDateStringify = function emailDateStringify(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    customMethods.sleep = function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    customMethods.createModal = function createModal(message) {
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

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        `;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.cssText = `
            margin-top: 10px;
            padding: 5px 10px;
            cursor: pointer;
        `;

        okButton.addEventListener('click', () => document.body.removeChild(modal));
        
        modalContent.appendChild(messageParagraph);
        modalContent.appendChild(okButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        okButton.focus();

        return modal;
    };

    customMethods.showModalSettings = async function showModalSettings(message, settings) {
        let modal = document.getElementById('modal-settings');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-settings';
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

        if (!window.modalSettings) {
            window.modalSettings = {};
        }

        modal.textContent = '';
        const messageElement = document.createElement('h2');
        messageElement.textContent = message;
        modal.appendChild(messageElement);

        settings.forEach(setting => {
            if (!window.modalSettings.hasOwnProperty(setting.name)) {
                window.modalSettings[setting.name] = setting.value;
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
                    input.value = window.modalSettings[setting.name];
                    break;
                case 'Boolean':
                    input = document.createElement('input');
                    input.type = 'checkbox';
                    input.checked = window.modalSettings[setting.name];
                    break;
                case 'radio':
                    input = document.createElement('div');
                    window.modalSettings.radioFields = window.modalSettings.radioFields || {};
                    window.modalSettings.radioFields[setting.name] = setting.available_values;
                    setting.available_values.forEach(value => {
                        const radioDiv = document.createElement('div');
                        radioDiv.style.marginBottom = '5px';
                        const radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.name = setting.name;
                        radioInput.value = value;
                        radioInput.checked = value === window.modalSettings[setting.name];
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
        submitButton.onclick = async function() {
            for (const setting of settings) {
                const settingDiv = document.getElementById(`setting-container-${setting.name}`);
                if (setting.type === 'String') {
                    const input = await customMethods.waitForElementWithRetry(settingDiv, 'input[type="text"]');
                    if (input) {
                        window.modalSettings[setting.name] = input.value;
                    }
                } else if (setting.type === 'Boolean') {
                    const input = await customMethods.waitForElementWithRetry(settingDiv, 'input[type="checkbox"]');
                    if (input) {
                        window.modalSettings[setting.name] = input.checked;
                    }
                } else if (setting.type === 'radio') {
                    const selectedRadio = await customMethods.waitForElementWithRetry(settingDiv, 'input[type="radio"]:checked');
                    if (selectedRadio) {
                        window.modalSettings[setting.name] = selectedRadio.value;
                    }
                }
            }
            console.log('Updated settings:', window.modalSettings);
            customMethods.createModal('Updated settings.');
        };

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = () => modal.style.display = 'none';

        const buttonDiv = document.createElement('div');
        buttonDiv.style.marginTop = '20px';
        buttonDiv.appendChild(submitButton);
        buttonDiv.appendChild(closeButton);
        modal.appendChild(buttonDiv);
        modal.style.display = 'block';
    };

    customMethods.initializeSettings = function initializeSettings(settingsList) {
        if (!window.modalSettings) window.modalSettings = {};
        settingsList.forEach(setting => {
            if (!window.modalSettings.hasOwnProperty(setting.name)) {
                window.modalSettings[setting.name] = setting.value;
            }
        });
    };

    customMethods.setupDropdown = function setupDropdown(items, id, overrideButton=null) {
        const button = overrideButton || customMethods.createDropdownButton(id);
        const modal = customMethods.createModalFromItems(items, id);

        button.addEventListener('click', () => {
            if (modal.style.display === 'none') {
                modal.style.display = 'block';
                const rect = button.getBoundingClientRect();
                modal.style.top = `${rect.bottom}px`;
                modal.style.left = `${rect.left}px`;
            } else {
                modal.style.display = 'none';
            }
        });

        window.addEventListener('click', event => {
            if (event.target !== button && !modal.contains(event.target)) {
                modal.style.display = 'none';
            }
        });

        if (!overrideButton) document.body.removeChild(button);
        return button;
    };

    customMethods.createDropdownButton = function createDropdownButton(id) {
        const button = document.createElement('button');
        button.setAttribute('data-custom-dropdown', id);
        button.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        `;
        button.appendChild(document.createTextNode('\u25BC')); // Downward arrow
        document.body.appendChild(button);
        return button;
    };

    customMethods.createModalFromItems = function createModalFromItems(items, id) {
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

    customMethods.getNavBar = async function getNavBar() {
        const pageType = await customMethods.getPageType()();
        let output;
        switch (pageType) {
            case 'case':
            case 'email':
                output = await customMethods.waitForElementWithRetry(document, '[data-id="form-header"]');
                break;
            case 'dashboard':
                output = await customMethods.waitForElementWithRetry(document, '[data-id="DashboardStandardHeader"]');
                break;
            default:
                output = null;
                break;
        }
        return output;
    };

    // Expand timeline elements method with callback support
    customMethods.expandTimelineElements = async function expandTimelineElements(callback) {
        const timelineElements = customMethods.getTimelineElements();
        const promises = timelineElements.map(element => customMethods.processElement(element));

        await Promise.all(promises);

        if (typeof callback === 'function') {
            callback();
        } else {
            alert("All timeline elements expanded.");
        }
    };

    // Last Case Import String method
    customMethods.lastCaseImportString = async function lastCaseImportString() {
        const results = [];

        await customMethods.expandTimelineElements(async () => {
            const timelineElements = customMethods.getTimelineElements();
            for (const timelineElement of timelineElements) {
                customMethods.checkForData(timelineElement, results);
            }
            
            if (results.length > 0) {
                customMethods.copyToClipboard(results[0].replace(":End Compressed Base64Encoded JSON", ""));
            } else {
                alert("No matching data found.");
            }
        });
    };

    // Method to get timeline elements
    customMethods.getTimelineElements = async function getTimelineElements() {
        const  timelineElementsParent = await customMethods.waitForElementWithRetry(document, '[data-id="notescontrol-unPinnedAccordion-incident"]');
        if (!timelineElementsParent) return [];
        const timelineElements = await waitForAllElementsWithRetry(timelineElementsParent, 'li');
        if (!timelineElements) return [];
        return Array.from(timelineElements);
    };

    // Process individual timeline element
    customMethods.processElement = async function processElement(timelineElement) {
        const moreButton = await customMethods.waitForElementWithRetry(timelineElement, '[aria-label="View more Collapse"]');
        const lessButton = await customMethods.waitForElementWithRetry(timelineElement, '[aria-label="View less Expand"]');

        if (moreButton) {
            moreButton.click();
            await customMethods.sleep(2000); // Wait 2 seconds for expansion
        }
    };

    // Check for data within a timeline element
    customMethods.checkForData = function checkForData(timelineElement, results) {
        const dataMatch = timelineElement.textContent.match(/Compressed Base64Encoded JSON:\s*(H4sIA[^\s<]+):End Compressed Base64Encoded JSON/g);
        if (dataMatch && dataMatch.length > 0) {
            results.push(dataMatch[0]);
        }
    };

    // Corrected getAndStoreIcmCases method
    customMethods.getAndStoreIcmCases = async function getAndStoreIcmCases(update = false) {
        if (!customData.cache.icmCases) customData.cache.icmCases = [];
        
        const currentPageType = await customMethods.getPageType()();
        const cacheEmpty = customData.cache.icmCases.length === 0;
        const oldUpdate = update;
        
        update = cacheEmpty ? true : update;

        if ((cacheEmpty || update) && currentPageType !== 'dashboard') {
            customMethods.createModal("An update has been triggered. When updating, you must call this function from the dashboard.");
            return;
        }

        const icmCases = await customMethods.dataCache(
            'icmCases',
            customMethods.getIcmCases,
            update,
            'id',
            ['linkedCase']
        );

        if (!icmCases) {
            customMethods.createModal("Something went wrong!");
            return;
        }

        if (!customData.icmCaseLinkPrefillApplied) {
            const caseNumbers = Object.keys(customData.icmCaseLinkPrefill);
            caseNumbers.forEach(caseNumber => {
                customMethods.updateIcmLinkedCase(caseNumber, customData.icmCaseLinkPrefill[caseNumber]);
            });
            customData.icmCaseLinkPrefillApplied = true;
        }

        return icmCases;
    };

    customMethods.dashboardViewHeaderEnhancer = async function dashboardViewHeaderEnhancer() {
        const navBar = await customMethods.getNavBar();
        if (!navBar) return;
    
        const dashViewHeader = navBar.childNodes[0]?.childNodes[0];
        if (!dashViewHeader) return;
    
        const pageType = await customMethods.getPageType()();
        const markerClassName = 'dashboard-view-enhanced-marker';
        const markerCheck = await customMethods.waitForElementWithRetry(body, `.${markerClassName}`);
        const markerParent = dashViewHeader;
    
        if (pageType === 'dashboard' && !markerCheck) {
            const dashViewHeaderDock = customMethods.createDock(dashViewHeader, "pa-fh pa-fi pa-ao pa-ap pa-fj pa-ba pa-fk pa-bp pa-at pa-bq pa-fl flexbox");
            
            customMethods.addDockButton(dashViewHeaderDock, "Get case csv", "get-case-csv-button", () => {
                customMethods.generateCaseCSV();
            });
    
            customMethods.addDockButton(dashViewHeaderDock, "Display IcM cases", "icm-data-button", async () => {
                await customMethods.displayIcmCases();
            });
    
            const modalMessage = customMethods.createModal("Gathering case load data.\nElements may fullscreen and page may scroll automatically.");
            try {
                if (!customData.cache['icm_cases'] || customData.cache['icm_cases'].length === 0) {
                    await customMethods.getAndStoreIcmCases(true);
                }
            } catch (error) {
                console.error("Error gathering IcM cases:", error);
            } finally {
                document.body.removeChild(modalMessage);
            }
    
            customMethods.createInvisibleMarker(markerClassName, markerParent);
        }
    };
    

    customMethods.enhanceCaseViewHeader = async function enhanceCaseViewHeader() {
        const caseViewHeader = await customMethods.waitForElementWithRetry(document, '[data-id="form-header"]');
        if (!caseViewHeader) return;
    
        const pageType = await customMethods.getPageType()();
        const markerClassName = 'case-view-enhanced-marker';
        const markerCheck = await customMethods.waitForElementWithRetry(body, `.${markerClassName}`);
        const markerParent = await customMethods.waitForElementWithRetry(document, '[data-id="Primary_contact_section"]');
    
        if (pageType === 'case' && !markerCheck) {
            const caseViewHeaderDock = customMethods.createDock(caseViewHeader, "pa-a pa-st flexbox");
    
            const caseInfoHeaderParts = await customMethods.getCaseInfoElements(caseViewHeader);
            const caseNumberMatch = caseInfoHeaderParts.caseNumberElement.textContent.match(/(\d{16})/);
            const caseNumber = caseNumberMatch ? caseNumberMatch[0] : '';
    
            customMethods.updatePageCaseNumber(caseNumber);
            const recentEmailCaseNumber = customMethods.getRecentEmailCaseNumber();
            const lastPageType = customMethods.getPreviousPageType();
    
            if (recentEmailCaseNumber && recentEmailCaseNumber !== caseNumber && lastPageType === 'email') {
                customMethods.createModal("Be careful! This is not the case you just sent an email for!");
            }
    
            customMethods.setupClickToCopy(caseInfoHeaderParts.caseNumberElement, caseNumber);
            customMethods.setupClickToCopy(caseInfoHeaderParts.caseSeverityElement, `Severity ${caseInfoHeaderParts.caseSeverityElement.textContent.replace('Severity', '')}`);
            customMethods.setupClickToCopy(caseInfoHeaderParts.caseStatusElement, caseInfoHeaderParts.caseStatusElement.textContent.replace('Status reason', ''));
            customMethods.setupClickToCopy(caseInfoHeaderParts.caseTitleElement, caseInfoHeaderParts.caseTitleElement.textContent.replace('- Saved', ''));
    
            customMethods.addDockButton(caseViewHeaderDock, "CSAM/IM Chat Title", "csam-im-group-chat-title-button", () => {
                customMethods.copyToClipboard(`${caseNumber} | ${caseInfoHeaderParts.caseTitleElement.textContent.replace('- Saved', '')}`);
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Copy Primary/CSAM/IM Email", "primary-csam-im-email-copy-button", async () => {
                await customMethods.setupContactCopyMenu(caseViewHeaderDock);
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Display IcM cases", "icm-data-button", async () => {
                await customMethods.displayIcmCases({ linked_case: caseNumber });
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Expand Timeline", "expand-timeline-button", () => {
                customMethods.expandTimelineElements();
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "New Notes Import String", "new-notes-import-button", async () => {
                const caseStatus = caseInfoHeaderParts.caseStatusElement.textContent.replace('Status reason', '');
                const caseContacts = await customMethods.getAndStoreCaseContacts();
                const customerStatement = await customMethods.getCustomerStatement();
                const primaryContact = caseContacts.find(contact => contact.role === 'Primary') || { email: '' };
                const notesObject = {
                    caseContactTextBox: primaryContact.email,
                    caseStatusComboBox: caseStatus,
                    problemDescriptionTextArea: customerStatement,
                    nextActionTextArea: ""
                };
                const base64EncodedJsonString = customMethods.compressAndBase64Encode(JSON.stringify(notesObject));
                customMethods.copyToClipboard(base64EncodedJsonString);
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Last Note Import", "last-note-import-button", () => {
                customMethods.lastCaseImportString();
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Enter case note", "scroll-notes-button", async () => {
                customMethods.scrollToCaseNotes();
            });
    
            customMethods.addDockButton(caseViewHeaderDock, "Open notes folder", "local-notes-button", () => {
                customMethods.copyToClipboard(`explorer "${customData.BASE_NOTES_PATH}${caseNumber}"`);
            });
    
            await customMethods.updateCaseIcmIds(caseNumber);
            await customMethods.getAndStoreCaseContacts(await customMethods.waitForElementWithRetry(document, '[id="Copilot_summary_section_10"]'));
    
            customMethods.createInvisibleMarker(markerClassName, markerParent);
        }
    };
    
    customMethods.emailViewHeaderEnhancer = async function enhanceEmailViewHeader() {
        const emailViewHeader = await customMethods.getNavBar();
        if (!emailViewHeader) return;
    
        const pageType = await customMethods.getPageType()();
        const markerClassName = 'email-view-enhanced-marker';
        const markerCheck = await customMethods.waitForElementWithRetry(body, `.${markerClassName}`);
        const markerParent = await customMethods.waitForElementWithRetry(document, '[id^="Email_section"]');
    
        if (pageType === 'email' && !markerCheck) {
            const caseNumber = await customMethods.getCaseNumberFromEmailSubject() || customMethods.getCurrentCaseNumber();
            if (caseNumber) customMethods.setRecentEmailCaseNumber(caseNumber);
    
            const emailViewHeaderDock = customMethods.createDock(emailViewHeader, "pa-a pa-st flexbox");
            const items = customMethods.getEmailMenuItems();
            
            customMethods.addDockButton(emailViewHeaderDock, "Templates", "email-template-button", () => {
                customMethods.addMenu("email_modal", items, emailViewHeaderDock);
            });
    
            customMethods.createInvisibleMarker(markerClassName, markerParent);
        }
    };
    
    /* Helper Functions */
    customMethods.createDock = function createDock(parentElement, className) {
        const dock = document.createElement('div');
        dock.className = className;
        parentElement.insertAdjacentElement('afterend', dock);
        return dock;
    };
    
    customMethods.addDockButton = function addDockButton(dock, text, id, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.id = id;
        button.onclick = onClick;
        if (!document.getElementById(id)) dock.appendChild(button);
    };
    
    customMethods.setupClickToCopy = function setupClickToCopy(element, text) {
        element.onclick = () => customMethods.copyToClipboard(text);
    };
    
    customMethods.getCaseInfoElements = async function getCaseInfoElements(caseViewHeader) {
        const headerControlsList = await customMethods.waitForElementWithRetry(caseViewHeader, '[id^="headerControlsList"]');
        if (!headerControlsList) return null;
        const caseInfoHeaderPartsElements = await customMethods.waitForAllElementsWithRetry(headerControlsList, '[data-preview_orientation="column"]');
        const caseInfoHeaderParts = Array.from(caseInfoHeaderPartsElements);
        return {
            caseNumberElement: caseInfoHeaderParts[0],
            caseSeverityElement: caseInfoHeaderParts[1],
            caseStatusElement: caseInfoHeaderParts[2],
            caseAssignedToElement: caseInfoHeaderParts[3],
            caseTitleElement: await customMethods.waitForElementWithRetry(caseViewHeader, '[data-id="header_title"]')
        };
    };
    
    customMethods.setupContactCopyMenu = async function setupContactCopyMenu(dock) {
        const items = [
            { text: 'Primary Contact', onClick: async () => customMethods.copyEmailByRole('primary') },
            { text: 'CSAM', onClick: async () => customMethods.copyEmailByRole('csam') },
            { text: 'IM', onClick: async () => customMethods.copyEmailByRole('incident manager') },
            { text: 'CSAM/IM', onClick: async () => customMethods.copyEmailByRoles(['csam', 'incident manager']) },
            { text: 'Primary/CSAM/IM', onClick: async () => customMethods.copyEmailByRoles(['primary', 'csam', 'incident manager']) }
        ];
        customMethods.addMenu("case_view", items, dock);
    };
    
    customMethods.copyEmailByRole = async function copyEmailByRole(role) {
        const caseContacts = await customMethods.getAndStoreCaseContacts();
        const emails = caseContacts
            .filter(contact => roles.includes(contact.role.toLowerCase()))
            .map(contact => contact.email)
            .join("; ");
        if (emails) {
            customMethods.copyToClipboard(emails);
        } else {
            window.alert("Error.");
        }
    };
    
    customMethods.getCaseNumberFromEmailSubject = async function getCaseNumberFromEmailSubject() {
        const emailSubjectElement = await customMethods.waitForElementWithRetry(document, '[aria-label="Subject"]');
        if (!emailSubjectElement) return null;
        const emailSubject = emailSubjectElement.getAttribute('title');
        const caseNumberMatch = emailSubject.match(/(\d{16})/);
        return caseNumberMatch ? caseNumberMatch[0] : null;
    };

    customMethods.getScrollableCaseElement = async function getScrollableCaseElement() {
        const mainContentContainer = await customMethods.waitForElementWithRetry(document, '[id^="mainContentContainer"]');
        return (mainContentContainer) ? mainContentContainer.childNodes[1] : null;
    };
    
    customMethods.scrollToCaseNotes = async function scrollToCaseNotes() {
        const caseElement = await customMethods.getScrollableCaseElement();
        if (!caseElement) caseElement.scrollTo(0, 0);
        const noteControlElement = await customMethods.waitForElementWithRetry(document, '[data-id="notescontrol-timeline_wall_container"]');
        const noteScrollTarget = await customMethods.waitForElementWithRetry(noteControlElement, '[id="create_module_placeholdernotescontrol"]');
        if (noteScrollTarget) noteScrollTarget.scrollIntoViewIfNeeded();
    };
    
    customMethods.updateCaseIcmIds = async function updateCaseIcmIds(caseNumber) {
        const caseIcmIds = await customMethods.getCaseIcmIds();
        customMethods.updateIcmLinkedCase(caseNumber, caseIcmIds);
    };
    
    customMethods.createInvisibleMarker = function createInvisibleMarker(className, parentElement) {
        customMethods.createInvisibleElement('', className, parentElement);
    };

    // Function to get case IcM IDs
    customMethods.getCaseIcmIds = async function getCaseIcmIds() {
        const maxTry = 10;
        const icmContainer = await customMethods.waitForElementWithRetry(document, '[data-id="IcMs_section"]');
        if (!icmContainer) return [];

        await customMethods.tryLoop(async () => {
            const icmContainer = await customMethods.waitForElementWithRetry(document, '[data-id="IcMs_section"]');
            if (icmContainer) icmContainer.scrollIntoViewIfNeeded();
        }, 5);

        const caseIcmElement = await customMethods.waitForElementWithRetry(icmContainer, '[data-id="grid-container"]');
        if (!caseIcmElement) return [];

        const rowCountElement = await customMethods.waitForElementWithRetry(caseIcmElement, '[class^="statusTextContainer"]');
        if (!rowCountElement) return [];

        const rowCount = Number(rowCountElement.innerText.replace('Rows: ', ''));
        const icmNumbers = Array.from(await customMethods.waitForAllElementsWithRetry(caseIcmElement, '[col-id="msdfm_icmid"]')).map(element => element.innerText);
        return icmNumbers.slice(1);
    };

    // Function to update IcM linked cases
    customMethods.updateIcmLinkedCase = function updateIcmLinkedCase(linkedCase, ids) {
        customData.cache.icmCases.forEach(item => {
            if (ids.includes(item.id)) {
                item.linkedCase = linkedCase;
            }
        });
    };

    // Function to create invisible markers for enhanced elements
    customMethods.createInvisibleMarker = function createInvisibleMarker(className, parentElement) {
        const marker = document.createElement('div');
        marker.className = className;
        marker.style.visibility = 'hidden';
        parentElement.appendChild(marker);
    };

    // Function to handle retry logic in loops
    customMethods.tryLoop = async function tryLoop(callback, maxTry) {
        let currentTry = 0;
        let success = false;
        let output;
        while (!success) {
            try {
                output = await callback();
                success = true;
            } catch {
                currentTry++;
                await customMethods.sleep(1000);
                if (currentTry > maxTry) return null;
            }
        }
        return output;
    };

    customMethods.getCaseContacts = async function getCaseContacts() {
        const pageType = await customMethods.getPageType()();
        if (pageType !== 'case') return null;
    
        const ensureDocumentActive = () => new Promise(resolve => {
            if (document.hidden) {
                document.addEventListener('visibilitychange', function onVisibilityChange() {
                    if (!document.hidden) {
                        document.removeEventListener('visibilitychange', onVisibilityChange);
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    
        await ensureDocumentActive();
    
        const contactsElement = await customMethods.waitForElementWithRetry(document, '[data-id^="ref_pan_Summary_tab_section"]');
        const viewport = contactsElement?.querySelector('[class="ag-center-cols-viewport"]');
        if (!viewport) return null;
    
        await customMethods.sleep(500);
        viewport.requestFullscreen();
    
        const rowsElements = await customMethods.waitForAllElementsWithRetry(viewport, '[role="row"]');
        const columnMappings = {
            'record2roleid': 'role',
            'record2id': 'id',
            'contactAlias.emailaddress1': 'email',
            'contactAlias.msdfm_internationalphonenumber': 'phone',
            'contactAlias.preferredcontactmethodcode': 'modality',
            'contactAlias.parentcustomerid': 'company',
            'contactAlias.msdfm_authenticated': 'authenticated',
            'description': 'description'
        };
    
        const output = await Promise.all(
            Array.from(rowsElements).map(async (row) => {
                const rowData = {};
                for (const [colId, key] of Object.entries(columnMappings)) {
                    const cell = await customMethods.waitForElementWithRetry(row, `[col-id="${colId}"]`);
                    rowData[key] = customMethods.textContentFixer(cell?.innerText || '');
                }
                return rowData;
            })
        );
    
        document.exitFullscreen();
    
        output.forEach(contact => {
            if (contact.id.includes('\n')) {
                contact.id = contact.id.split('\n')[1];
            }
            if (!customMethods.isValidEmail(contact.email)) {
                contact.email = '';
            }
        });
    
        await customMethods.sleep(1500);
        return output;
    };
    

    // Function to store and retrieve case contacts
    customMethods.getAndStoreCaseContacts = async function getAndStoreCaseContacts(parentElement) {
        const data = await customMethods.getAndStoreArrayOfObjects(customMethods.getCaseContacts, 'case_contact_storage_element', parentElement);
        return data;
    };

    // Function to get and store array of objects
    customMethods.getAndStoreArrayOfObjects = async function getAndStoreArrayOfObjects(callback, className, parentElement) {
        const classSelector = `[class="${className}"]`;
        const storeCheckAll = Array.from(await customMethods.waitForAllElementsWithRetry(document, classSelector));
        const storeCheck = storeCheckAll.length > 0 ? storeCheckAll[0] : null;

        storeCheckAll.slice(1).forEach(element => element.remove());

        let data;
        let createElement = false;

        if (storeCheck) {
            try {
                data = JSON.parse(storeCheck.textContent);
            } catch {
                storeCheck.remove();
                data = await fetchData(callback);
                createElement = data !== null;
            }
        } else {
            data = await fetchData(callback);
            createElement = data !== null;
        }

        if (createElement) {
            customMethods.createInvisibleElement(data, className, parentElement);
        }

        return data;

        async function fetchData(callback) {
            const result = await callback();
            return result ? JSON.stringify(result) : null;
        }
    };

    // Function to create an invisible element for storing data
    customMethods.createInvisibleElement = function createInvisibleElement(text, className, parentElement = null) {
        const element = document.createElement('div');
        element.innerText = text;
        element.className = className;
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
        element.style.left = '-9999px';

        if (!parentElement) {
            document.body.appendChild(element);
        } else {
            parentElement.appendChild(element);
        }

        return element;
    };

    // Function to update and cache data
    customMethods.dataCache = async function dataCache(dataKey, callback, update = false, idKey = 'id', updateIgnoreKeys = []) {
        let data;
        if (!customData.cache) customData.cache = {};

        if (Object.keys(customData.cache[dataKey] || {}).length === 0 || update) {
            console.log(`Updating cache: ${dataKey}`);
            data = await callback();
            if (!data) return data;
            if (!customData.cache[dataKey]) customData.cache[dataKey] = data;
            customMethods.updateData(customData.cache[dataKey], data, idKey, updateIgnoreKeys);
        } else {
            console.log(`Returning cached results for: ${dataKey}`);
            data = customData.cache[dataKey];
        }
        return data;
    };

    // Function to update data structures (arrays or objects)
    customMethods.updateData = function updateData(target, source, idKey = 'id', updateIgnoreKeys = []) {
        if (Array.isArray(target) && Array.isArray(source)) {
            customMethods.updateArrayOfObjects(target, source, idKey, updateIgnoreKeys);
        } else if (typeof target === 'object' && typeof source === 'object') {
            customMethods.updateObjectProperties(target, source, updateIgnoreKeys);
        } else {
            throw new Error('Invalid input: target and source must be either both objects or both arrays of objects.');
        }
    };

    // Function to update an array of objects
    customMethods.updateArrayOfObjects = function updateArrayOfObjects(targetArray, sourceArray, idKey = 'id', updateIgnoreKeys = []) {
        sourceArray.forEach(sourceObj => {
            const targetObj = targetArray.find(obj => obj[idKey] === sourceObj[idKey]);
            if (targetObj) {
                Object.keys(sourceObj).forEach(key => {
                    if (!updateIgnoreKeys.includes(key)) targetObj[key] = sourceObj[key];
                });
            } else {
                targetArray.push(sourceObj);
            }
        });
    };

    // Function to update properties of an object
    customMethods.updateObjectProperties = function updateObjectProperties(target, source, updateIgnoreKeys = []) {
        Object.keys(source).forEach(key => {
            if (!updateIgnoreKeys.includes(key)) target[key] = source[key];
        });
    };

    customMethods.headerEnhancer = async function headerEnhancer(pageType) {
        if (customData.enhancementActive) return;
        customData.enhancementActive = true;
        try {
            switch (pageType) {
                case 'case':
                    await customMethods.enhanceCaseViewHeader();
                    break;
                case 'email':
                    await customMethods.emailViewHeaderEnhancer();
                    break;
                case 'dashboard':
                    await customMethods.dashboardViewHeaderEnhancer();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        } finally {
            customData.enhancementActive = false;
        }
    };

    customMethods.setupIntervalRunner = function setupIntervalRunner(intervalId, callable, seconds) {
        if (!customData.intervals) customData.intervals = {};
        if (customData.intervals[intervalId]) {
            clearInterval(customData.intervals[intervalId]);
            delete customData.intervals[intervalId];
        }
        customData.intervals[intervalId] = setInterval(callable, seconds * 1000);
    };

    customMethods.autoPendingSlaAlarm = function autoPendingSlaAlarm(seconds, sleepCounter) {
        customMethods.setupIntervalRunner('autoSlaAlarm', () => customMethods.pendingSlaAlarm(seconds, sleepCounter), seconds);
    };

    customMethods.autoPendingSlaAlarm(5, 12);
    customMethods.setupPageChangeWatcher();
})();
