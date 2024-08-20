javascript:(()=>{
function insertCopyButton(element, id, textToCopy) {
    if (!window._my_custom_data) window._my_custom_data = {};
    window._my_custom_data[id] = textToCopy;
    /* Create the button element */;
    const button = document.createElement('button');
    button.textContent = 'Copy Text';
    button.id = id;
    button.className = 'custom-copy-button';

    const isExist = element.parentElement.querySelector(`[id="${button.id}"]`);
    if (isExist !== null) return;
    /* Insert the button adjacent to the element as a sibling */;
    element.insertAdjacentElement('afterend', button);

    /* Add the click event listener to the button */;
    button.addEventListener('click', () => {
        /* Create a temporary textarea to hold the text */;
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = window._my_custom_data[id];

        /* Append the textarea to the document */;
        document.body.appendChild(tempTextarea);

        /* Select the text in the textarea */;
        tempTextarea.select();

        /* Execute the copy command */;
        document.execCommand('copy');

        /* Remove the temporary textarea */;
        document.body.removeChild(tempTextarea);

        /* Optionally, provide feedback to the user */;
        alert('Text copied to clipboard!');
    });
};
var titleInputElement = document.querySelector('[data-testid="escalation-form-title-text-field"]');
var issueDescriptionInputElement = document.querySelector('[data-testid="escalation-form-issue-description-text-field"]');
var reproInputElement = document.querySelector('[data-testid="escalation-form-repro-text-field"]');

var json_string = window.prompt("Enter IcM Json String");
var icm_data = JSON.parse(json_string);
visual_sections = [
    [
        "title"
    ],
    [
        "affected_tenants",
        "description",
        "impact",
        "troubleshooting",
        "workarounds",
        "questions",
        "similar_bugs",
        "additional_info"
    ],
    [
        "repro_steps",
        "repro_results",
        "expected_results",
        "repro_frequency",
        "in_house_repro_available",
        "in_house_repro_results",
        "build_number"
    ],
];

result_label_map = [
    {"label":"Case Number:", "key": "case_number"},
    {"label":"Title:", "key": "title"},
    {"label":"Affected Tenants:", "key": "affected_tenants"},
    {"label":"Issue /Problem Description:", "key": "description"},
    {"label":"Business Impact:", "key": "impact"},
    {"label":"Troubleshooting:", "key": "troubleshooting"},
    {"label":"Workarounds:", "key": "workarounds"},
    {"label":"List of questions:", "key": "questions"},
    {"label":"Similar bugs:", "key": "similar_bugs"},
    {"label":"Additional Information:", "key": "additional_info"},
    {"label":"Repro Steps:", "key": "repro_steps"},
    {"label":"Repro Results:", "key": "repro_results"},
    {"label":"Expected Results:", "key": "expected_results"},
    {"label":"How often does it repro?:", "key": "repro_frequency"},
    {"label":"In-house repro available?:", "key": "in_house_repro_available"},
    {"label":"If Yes - Can you share or Demo the in-house repro?:", "key": "in_house_repro_results"},
    {"label":"Build Number:", "key": "build_number"}
];
var indent = ' '.repeat(4);
var section_seperator = "==========================================\n\n";

var compiled_sections = visual_sections.map(section_list => {
    var section_string = section_list.map(section=>{
        var label_search = result_label_map.filter(element=>element.key==section);
        var label = label_search.length > 0 ? label_search[0].label : null;
        var data = icm_data[section];
        var output;
        switch (label) {
            case 'Title:':
                output = icm_data[section];
                break;
            case 'Build Number:':
                output = `${section_seperator}${label}\n${data}`;
                break;
            default:
                output = `${label}\n${data}`;
                break;
        }
        return output;
    }).join("\n\n");
    console.log(section_string);
    return section_string;
});

var title_string = compiled_sections[0];
var issue_description_string = compiled_sections[1];
var repro_string = compiled_sections[2];
if (!window._my_custom_data) window._my_custom_data = {};

window._my_custom_data['title'] = visual_sections[0];
window._my_custom_data['issueDescription'] = visual_sections[1];
window._my_custom_data['repro'] = visual_sections[2];

insertCopyButton(titleInputElement, 'title', title_string);
insertCopyButton(issueDescriptionInputElement, 'issueDescription', issue_description_string);
insertCopyButton(reproInputElement, 'repro', repro_string);
})()