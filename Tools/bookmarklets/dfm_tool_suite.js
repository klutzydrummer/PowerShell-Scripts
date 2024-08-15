javascript:(()=>{
if (!window._my_custom_methods) window._my_custom_methods = {};
if (!window._my_custom_data) window._my_custom_data = {};
if (!window._my_custom_data.intervals) window._my_custom_data.intervals = {};
window._my_custom_methods.copyToClipboard = function copyToClipboard (text) {
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

function dfm_dash_refresh () {
    var targetTitle = "MY NEW DASHBOARD";
    var dashboardTitleElement = document.querySelector('[id^="Dashboard_Selector"]');
    var dashboardTitle = dashboardTitleElement != null ? dashboardTitleElement.textContent.trim() : "";
    var refreshButton = document.querySelector('[id="RefreshDashboard-button"]');
    if (refreshButton != null && dashboardTitle == targetTitle) refreshButton.click();
};
function setup_interval_runner(interval_id, callable, seconds) {
    if (window._my_custom_data.intervals[interval_id]) {
        clearInterval(window._my_custom_data.intervals[interval_id]);
        delete window._my_custom_data.intervals[interval_id];
    };
    window._my_custom_data.intervals[interval_id] = setInterval(callable, (seconds * 1000));
};
function dfm_dash_refresh_auto(seconds) {
    setup_interval_runner(interval_id='myDashboardInterval', callable=dfm_dash_refresh, seconds=seconds);
};
function make_contacts_click_copy() {
    var contactsElement = document.querySelector('[data-id^="ref_pan_Summary_tab_section"]');
    var rowsElements = Array.from(contactsElement.querySelector('[class="ag-center-cols-viewport"]').querySelectorAll('[role="row"]'));
    var rowsOfCells = rowsElements.map(row=>Array.from(row.querySelectorAll('[class^="ag-cell"]')).map(cell=>cell.querySelector('[class^="ms-TooltipHost"]')));
    rowsOfCells.forEach(row=>row.forEach(cell=>{
        if (cell !== null) cell.onclick = ()=>{
            console.log('testclicked');
            var textToCopy = cell.textContent;
            var textHalfwayPoint = Math.floor(textToCopy.length / 2);
            textToCopy = (textToCopy.slice(0,textHalfwayPoint) == textToCopy.slice(textHalfwayPoint, textToCopy.length)) ? textToCopy.slice(0,textHalfwayPoint) : textToCopy;
            window._my_custom_methods.copyToClipboard(textToCopy);
        };
    }));
    console.log("added helper function to contacts cells.");
};
function make_contacts_click_copy_auto(seconds) {
    setup_interval_runner(interval_id='myContactsCopyable', callable=(()=>{if (document.querySelector('[data-id^="ref_pan_Summary_tab_section"]') !== null) make_contacts_click_copy()}), seconds=seconds);
};
dfm_dash_refresh_auto(seconds=10);
make_contacts_click_copy_auto(seconds=10);
})();
