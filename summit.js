// $$$$$ GLOBAL VARIABLES   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ GLOBAL VARIABLES   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// Create an object to store selected files globally
const fileSelections = {};
// Validate email format using regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const keywordColors = {
    // JS Core
    "function": "#0074D9",
    "const": "#FFDC00",
    "let": "#FF4136",
    "return": "#FF69B4",
    "new": "#FF1493",
    "if": "#FF6347",
    "else": "#FF6347",
    "true": "#00FA9A",
    "false": "#00FA9A",
    "null": "#B0BEC5",
    "undefined": "#B0BEC5",
    "await": "#E91E63",
    "async": "#E91E63",
    "class": "#F1C40F",
    "match": "#1ABC9C",
    "case": "#40E0D0",
    "default": "#DDA0DD",
    "typeof": "#9C27B0",
    "switch": "#29B6F6",
  
    // Python
    "def": "#00CED1",
    "return": "#FF69B4",
    "if": "#FF6347",
    "elif": "#FF6347",
    "else": "#FF6347",
    "with": "#00CED1",
    "as": "#00CED1",
    "try": "#EF5350",
    "except": "#EF5350",
    "finally": "#EF5350",
    "pass": "#90A4AE",
    "print": "#FFD700",
    "import": "#BA68C8",
    "from": "#BA68C8",
    "in": "#F06292",
    "is": "#F06292",
    
  
    // Decorators
    "@app": "#00CED1",
    "route": "#00CED1",
    "methods=['POST'])": "#00CED1",
  
    // HTML tags
    "div": "#00BCD4",
    "span": "#00BCD4",
    "form": "#00BCD4",
    "input": "#00BCD4",
    "select": "#00BCD4",
    "option": "#00BCD4",
    "button": "#00BCD4",
    "ul": "#00BCD4",
    "li": "#00BCD4",
    "p": "#00BCD4",
    "h1": "#00BCD4",
    "h2": "#00BCD4",
    "h3": "#00BCD4",
    "a": "#00BCD4",
    "<body": "#00BCD4",
    "</body>": "#00BCD4",
    "<div": "#00BCD4",
    "</div>": "#00BCD4",
    "meta": "#00BCD4",
    "title": "#00BCD4",
    "head": "#00BCD4"
};
  

function highlightCode(codeText) {
    const wrapper = document.createElement("span");
    const words = codeText.split(/(\s+|[{}()[\];,.])/); // split by space and symbols

    words.forEach(word => {
        const span = document.createElement("span");
        const keyword = word.trim();
        const color = keywordColors[keyword];

        if (color) {
            span.style.color = color;
            span.textContent = word;
            wrapper.appendChild(span);
        } else {
            wrapper.appendChild(document.createTextNode(word));
        }
    });

    return wrapper.innerHTML;
}


function highlightAllSnippets() {
    document.querySelectorAll("pre code").forEach(codeBlock => {
        const raw = codeBlock.textContent; // plain text
        const highlighted = highlightCode(raw);
        codeBlock.innerHTML = highlighted; // now safe to use innerHTML
    });
}

function testJsonOnly() {
    // list of the ids of elements you want to include
    let formElements = ["username", "email"];
    let { data, responseType } = ajax_package(formElements, 'json_only', 'json_1');
    ajax_request(data, responseType);
}

function showLoader() {
    // If it already exists, remove it first to allow re-insertion
    const existing = document.getElementById("global_overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "global_overlay";

    const spinner = document.createElement("div");
    spinner.className = "loader";

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
}

function hideLoader() {
    const overlay = document.getElementById("global_overlay");
    if (overlay) {
        overlay.remove();
    }
}


// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// Creates any element of your choice
function createAndAppendElement(type, attributes, parentElement) {
    const element = document.createElement(type);
    for (const key in attributes) {
        if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else if (key === 'dataSiteKey') {
            element.setAttribute('data-sitekey', attributes[key]);
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    parentElement.appendChild(element);
    return element;
}
// Function to append html elements stored as a string to a specified parent element
function appendHtmlToParent(htmlString, parentElement) {
    // Check if the parent exists in the DOM
    if (parentElement) {
        // Insert the HTML string as the last child of the parent element
        parentElement.insertAdjacentHTML('beforeend', htmlString);
    } else {
        // Log an error if the parent does not exist
        console.error('The parent element does not exist.');
    }    
}
// Sets the entire centered_block to an empty string
function clearCenteredBlock(component) {
    if (component) {
        component.innerHTML = ''
    }
}
function clearDynamicHeadElements() {
    const elements = document.head.querySelectorAll('*');
    elements.forEach(element => {
        // Check if the element has the data-static attribute set to true
        if (element.dataset && element.dataset.static !== "true") {
            document.head.removeChild(element);
        }
    });
}
function titleAndMeta(headBlock, titleContent, metaContent) {
    // Head data
    createAndAppendElement('title', {
        innerHTML: titleContent,
        id: 'titleElement'
    }, headBlock);
    createAndAppendElement('meta', {
        name: 'description',
        id: 'metaElementMain',
        content: metaContent
    }, headBlock);
    return headBlock
}
function startOffAPage(titleContent, metaContent) {
    const outerBlock = document.getElementById('outer_block')
    clearCenteredBlock(outerBlock);
    div(outerBlock, {id: 'centered_block'});
    // Clear head except for data-static = 'true'
    clearDynamicHeadElements();
    let headBlock = document.getElementById('index_head');
    // Adds title and meta to head
    titleAndMeta(headBlock, titleContent, metaContent);
}
function standardTopOfPage2(wrapper, html1, html2) {
    const heroSection2 = div(wrapper, { class: "hero-section2" });
    h1(heroSection2, { innerHTML: html1, id: 'mainTitle'});
    p(heroSection2, { innerHTML: html2 });
}

function buildNavBar(which_type) {

    // Create sticky side nav (desktop) or burger-toggle nav (mobile)
    const sideNav = div(document.getElementById("outer_block"), { class: "side-nav" });
  
    const logo = div(sideNav, { class: "side-logo" });
    img(logo, {
      src: "/static/images/summit.png",
      alt: "Summit Logo",
      class: "side-logo-img"
    });
    h2(logo, { innerHTML: "Summit", class: "side-brand" });
    
    if (which_type === 'main') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Login",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });
    }
    else if (which_type === 'dashboard') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });
    }
    else if (which_type === 'docs') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Login",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });

        a(linkContainer, { href: "#1__State_Management___Routing", innerHTML: "Routing", class: "side-link" });
        a(linkContainer, { href: "#2__Page_Lifecycle_Functions", innerHTML: "Lifecycle", class: "side-link" });
        a(linkContainer, { href: "#4__SPA_Structure__index_html_", innerHTML: "Structure", class: "side-link" });
        a(linkContainer, { href: "#5__Element_Creation", innerHTML: "Elements", class: "side-link" });
        a(linkContainer, { href: "#6A__AJAX_Concepts", innerHTML: "AJAX Concepts", class: "side-link" });
        a(linkContainer, { href: "#6B__Full_AJAX_Pipeline", innerHTML: "AJAX Pipeline", class: "side-link" });
    }
    
    const burger = div(document.getElementById("outer_block"), { class: "burger" });
    burger.innerHTML = "☰";
    burger.onclick = () => {
      sideNav.classList.toggle("active");
    };

}


function buildFooter() {
    // Footer
    const footer = div(document.getElementById("outer_block"), { class: "footer-centered" });
    h2(footer, { innerHTML: "Summit", class: "footer-brand" });
    p(footer, { innerHTML: "Getting you to the Summit.", class: "footer-tagline" });
  
    p(footer, {
      innerHTML: "&copy; 2025 Summit. All rights reserved.",
      class: "footer-copy"
    });
}

// Helper functions to avoid repetition
function row(container, attributes = {}) {
    attributes.class = `row ${attributes.class || ''}`;
    return createAndAppendElement('div', attributes, container);
}
function col(parent, attributes = {}) {
    attributes.class = `col ${attributes.class || ''}`;
    return createAndAppendElement('div', attributes, parent);
}
function h1(parent, attributes = {}) {
    return createAndAppendElement('h1', attributes, parent)
}
function h2(parent, attributes = {}) {
    return createAndAppendElement('h2', attributes, parent)
}
function h3(parent, attributes = {}) {
    return createAndAppendElement('h3', attributes, parent)
}
function h4(parent, attributes = {}) {
    return createAndAppendElement('h4', attributes, parent)
}
function h5(parent, attributes = {}) {
    return createAndAppendElement('h5', attributes, parent)
}
function h6(parent, attributes = {}) {
    return createAndAppendElement('h6', attributes, parent)
}
function a(parent, attributes = {}) {
    return createAndAppendElement('a', attributes, parent)
}
function section(parent, attributes = {}) {
    return createAndAppendElement('section', attributes, parent)
}
function img(parent, attributes = {}) {
    return createAndAppendElement('img', attributes, parent);
}
function p(parent, attributes = {}) {
    return createAndAppendElement('p', attributes, parent);
}
function form(parent, attributes = {}) {
    return createAndAppendElement('form', attributes, parent);
}
function div(parent, attributes = {}) {
    return createAndAppendElement('div', attributes, parent);
}
function input(parent, attributes = {}) {
    return createAndAppendElement('input', attributes, parent);
}
function label(parent, attributes = {}) {
    return createAndAppendElement('label', attributes, parent);
}
function canvas(parent, attributes = {}) {
    return createAndAppendElement('canvas', attributes, parent);
}
function button(parent, attributes = {}) {
    return createAndAppendElement('button', attributes, parent);
}
function audio(parent, attributes = {}) {
    return createAndAppendElement('audio', attributes, parent)
}
function source(parent, attributes = {}) {
    return createAndAppendElement('source', attributes, parent)
}
function ul(parent, attributes = {}) {
    return createAndAppendElement('ul', attributes, parent);
}
function ol(parent, attributes = {}) {
    return createAndAppendElement('ol', attributes, parent);
}
function li(parent, attributes = {}) {
    return createAndAppendElement('li', attributes, parent);
}
function table(parent, attributes = {}) {
    return createAndAppendElement('table', attributes, parent);
}
function tr(parent, attributes = {}) {
    return createAndAppendElement('tr', attributes, parent);
}
function td(parent, attributes = {}) {
    return createAndAppendElement('td', attributes, parent);
}
function th(parent, attributes = {}) {
    return createAndAppendElement('th', attributes, parent);
}
function tbody(parent, attributes = {}) {
    return createAndAppendElement('tbody', attributes, parent);
}
function thead(parent, attributes = {}) {
    return createAndAppendElement('thead', attributes, parent);
}
function tfoot(parent, attributes = {}) {
    return createAndAppendElement('tfoot', attributes, parent);
}
function span(parent, attributes = {}) {
    return createAndAppendElement('span', attributes, parent);
}
function nav(parent, attributes = {}) {
    return createAndAppendElement('nav', attributes, parent);
}
function header(parent, attributes = {}) {
    return createAndAppendElement('header', attributes, parent);
}
function footer(parent, attributes = {}) {
    return createAndAppendElement('footer', attributes, parent);
}
function article(parent, attributes = {}) {
    return createAndAppendElement('article', attributes, parent);
}
function aside(parent, attributes = {}) {
    return createAndAppendElement('aside', attributes, parent);
}
function iframe(parent, attributes = {}) {
    return createAndAppendElement('iframe', attributes, parent);
}
function video(parent, attributes = {}) {
    return createAndAppendElement('video', attributes, parent);
}
function svg(parent, attributes = {}) {
    return createAndAppendElement('svg', attributes, parent);
}
function path(parent, attributes = {}) {
    return createAndAppendElement('path', attributes, parent);
}
function code(parent, attributes = {}) {
    return createAndAppendElement('code', attributes, parent);
}
function textarea(parent, attributes = {}) {
    return createAndAppendElement('textarea', attributes, parent);
}
function select(parent, attributes = {}) {
    return createAndAppendElement('select', attributes, parent);
}
function option(parent, attributes = {}) {
    return createAndAppendElement('option', attributes, parent);
}
function strong(parent, attributes = {}) {
    return createAndAppendElement('strong', attributes, parent);
}
function em(parent, attributes = {}) {
    return createAndAppendElement('em', attributes, parent);
}
function br(parent) {
    return createAndAppendElement('br', {}, parent);
}
function hr(parent, attributes = {}) {
    return createAndAppendElement('hr', attributes, parent);
}
function map(parent, attributes = {}) {
    return createAndAppendElement('map', attributes, parent);
}
function area(parent, attributes = {}) {
    return createAndAppendElement('area', attributes, parent);
}
function link(parent, attributes = {}) {
    return createAndAppendElement('link', attributes, parent);
}
function meta(parent, attributes = {}) {
    return createAndAppendElement('meta', attributes, parent);
}
function title(parent, attributes = {}) {
    return createAndAppendElement('title', attributes, parent);
}
function style(parent, attributes = {}) {
    return createAndAppendElement('style', attributes, parent);
}
function base(parent, attributes = {}) {
    return createAndAppendElement('base', attributes, parent);
}
function head(parent, attributes = {}) {
    return createAndAppendElement('head', attributes, parent);
}
function body(parent, attributes = {}) {
    return createAndAppendElement('body', attributes, parent);
}
function main(parent, attributes = {}) {
    return createAndAppendElement('main', attributes, parent);
}
function b(parent, attributes = {}) {
    return createAndAppendElement('b', attributes, parent);
}
function i(parent, attributes = {}) {
    return createAndAppendElement('i', attributes, parent);
}
function small(parent, attributes = {}) {
    return createAndAppendElement('small', attributes, parent);
}
function cite(parent, attributes = {}) {
    return createAndAppendElement('cite', attributes, parent);
}
function q(parent, attributes = {}) {
    return createAndAppendElement('q', attributes, parent);
}
function code(parent, attributes = {}) {
    return createAndAppendElement('code', attributes, parent);
}
function pre(parent, attributes = {}) {
    return createAndAppendElement('pre', attributes, parent);
}
function blockquote(parent, attributes = {}) {
    return createAndAppendElement('blockquote', attributes, parent);
}
function address(parent, attributes = {}) {
    return createAndAppendElement('address', attributes, parent);
}
function figure(parent, attributes = {}) {
    return createAndAppendElement('figure', attributes, parent);
}
function figcaption(parent, attributes = {}) {
    return createAndAppendElement('figcaption', attributes, parent);
}
function mark(parent, attributes = {}) {
    return createAndAppendElement('mark', attributes, parent);
}
function time(parent, attributes = {}) {
    return createAndAppendElement('time', attributes, parent);
}
function ins(parent, attributes = {}) {
    return createAndAppendElement('ins', attributes, parent);
}
function del(parent, attributes = {}) {
    return createAndAppendElement('del', attributes, parent);
}
function kbd(parent, attributes = {}) {
    return createAndAppendElement('kbd', attributes, parent);
}
function samp(parent, attributes = {}) {
    return createAndAppendElement('samp', attributes, parent);
}
function varElement(parent, attributes = {}) {
    return createAndAppendElement('var', attributes, parent);
}
function sup(parent, attributes = {}) {
    return createAndAppendElement('sup', attributes, parent);
}
function sub(parent, attributes = {}) {
    return createAndAppendElement('sub', attributes, parent);
}
function progress(parent, attributes = {}) {
    return createAndAppendElement('progress', attributes, parent);
}
function meter(parent, attributes = {}) {
    return createAndAppendElement('meter', attributes, parent);
}
function output(parent, attributes = {}) {
    return createAndAppendElement('output', attributes, parent);
}
function details(parent, attributes = {}) {
    return createAndAppendElement('details', attributes, parent);
}
function summary(parent, attributes = {}) {
    return createAndAppendElement('summary', attributes, parent);
}
function datalist(parent, attributes = {}) {
    return createAndAppendElement('datalist', attributes, parent);
}
function fieldset(parent, attributes = {}) {
    return createAndAppendElement('fieldset', attributes, parent);
}
function legend(parent, attributes = {}) {
    return createAndAppendElement('legend', attributes, parent);
}
// $$$$$$$$$$$$$$$$$$$$  COOKIES        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function getCookie(name) {
    let cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookiePair = cookieArray[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return undefined;
}
// $$$$$$$$$$$$$$$$$$$$  SUPPORT FUNCTIONS         $$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$  SUPPORT FUNCTIONS         $$$$$$$$$$$$$$$$$$$$$$$$$
// Pass in milliseconds - like time.sleep in python but with milliseconds
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function replaceWhitespaceWithUnderscores(inputString) {
    return inputString.replace(/\s+/g, '_');
}
function removeBaseUrl(fullUrl, baseUrl) {
    // Remove the base URL from the full URL
    return fullUrl.replace(baseUrl, '');
}
function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
function containsLowercase(str) {
    return /[a-z]/.test(str);
}
function containsNumbers(str) {
    return /\d/.test(str);
}
function containsSpecialCharacters(str) {
    return /[@$!%*?&)(,]/.test(str);
}
function containsWhiteSpace(str) {
    return str.includes(' ');
}
// $$$$$$$$$$$$$$$$$$$$  MORE COMPLEX ELEMENT STRUCTURES         $$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$  MORE COMPLEX ELEMENT STRUCTURES         $$$$$$$$$$$$$$$$$$$$$$$$$
function createRowsAndColumns(numRows, numCols, signifier, mainContainer) {
    for (let i = 1; i <= numRows; i++) {
        // Create row with a dynamic ID
        let row = createAndAppendElement('div', {
            class: 'row mb-3',
            id: `${signifier}Row${i}`
        }, mainContainer);
        // Retrieve the number of columns for the current row
        let columnsCount = numCols[i - 1];
        // Create the specified number of columns for this row
        for (let j = 1; j <= columnsCount; j++) {
            createAndAppendElement('div', {
                class: 'col',
                id: `${signifier}Row${i}Col${j}`
            }, row);
        }
    }
}
// Function to create and append a select element with options
function createSelectWithOptions(parentElement, attributes, options, firstOption, startingValue="", fonts="") {
    const select = createAndAppendElement('select', attributes, parentElement);
    option(select, {value: startingValue, selected: true, innerHTML: firstOption});
    //createAndAppendElement('option', {
    //    value: startingValue,
    //    selected: true,
    //    innerHTML: firstOption
    //}, select);
    let fontsToLoad = [];
    if (fonts === "fonts") {
        Object.keys(options).forEach(key => {
            createAndAppendElement('option', {
                value: key,
                innerHTML: options[key],
                style: `font-family: ${key};`
            }, select);
            // Add the font to the list of fonts to load
            fontsToLoad.push(key);
        })
    } else {
        Object.keys(options).forEach(key => {
            createAndAppendElement('option', {
                value: key,
                innerHTML: options[key]
            }, select);
        })
    }
    if (fonts === "fonts") {
        // Load the fonts using WebFont Loader
        WebFont.load({
            google: {
                families: fontsToLoad
            }
        });
    }
}
// Function to create and append checkboxes with labels
// Function to create and append checkboxes with labels (each on a new line)
function createCheckboxesWithOptions(attributes, options, parentElement) {
    const container = document.createElement('div');
    container.classList.add("checkbox-container");
    options.forEach(option => {
        const itemWrapper = document.createElement('div'); // Wrap each checkbox-label pair
        itemWrapper.classList.add("checkbox-item"); // Ensures alignment
        const checkbox = createAndAppendElement('input', {
            type: 'checkbox',
            id: option.id,
            name: attributes.name,
            class: 'check_class',
            value: option.value
        }, itemWrapper);
        createAndAppendElement('label', {
            for: checkbox.id,
            innerHTML: option.label
        }, itemWrapper);
        container.appendChild(itemWrapper);
    });
    parentElement.appendChild(container);
    return container;
}
// Function to create and append radio buttons with labels
function createRadioButtonsWithOptions(attributes, options, parentElement) {
    const container = document.createElement('div');
    container.classList.add("radio-container");
    options.forEach(option => {
        const itemWrapper = document.createElement('div'); // Wrap each radio-label pair
        itemWrapper.classList.add("radio-item"); // Ensures alignment
        const radioButton = createAndAppendElement('input', {
            type: 'radio',
            id: option.id,
            name: attributes.name,
            class: 'radio_class',
            value: option.value
        }, itemWrapper);
        createAndAppendElement('label', {
            for: radioButton.id,
            innerHTML: option.label
        }, itemWrapper);
        container.appendChild(itemWrapper);
    });
    parentElement.appendChild(container);
    return container;
}

function createFileInput(parent, id, allowedTypes, mode, job, formElements=false) {
    fileSelections[id] = [];
    if (mode === 'single_file') {
        var fileInput = input(parent, {
            type: "file",
            id: id,
            accept: allowedTypes
        });
        var fileListContainer = div(parent, { id: "fileList" });
        fileInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, mode);
        });
        var submitBtn = button(parent, { innerHTML: "Submit", id: 'fileSubmitButton'});
        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package([id], 'single_file', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    } else if (mode === 'folder_submission') {
        var folderInput = input(parent, {
            type: "file",
            id: id,
            multiple: true,
            webkitdirectory: "true",
            accept: allowedTypes
        });
        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });
        folderInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, mode);
        });
        var submitBtn = button(parent, { innerHTML: "Submit", id: 'folderSubmitButton' });
        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package([id], 'folder_submission', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    } else if (mode === 'single_file_and_json') {
        var fileInput = input(parent, {
            type: "file",
            id: id,
            accept: allowedTypes
        });
        console.log('here');
        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });
        //let fileLabel = label(parent, {id: `${id}_label`, innerHTML: 'No file chosen'});
        fileInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, 'single_file');
        });
        var submitBtn = button(parent, { innerHTML: "Submit", id: 'fileSubmitButton'});
        this_list_of_elements = [id];
        // Iterate over formElements and add them to the list
        if (formElements) {
            formElements.forEach(el => {
                console.log('el: ', el);
                this_list_of_elements.push(el);
            });
        }
        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package(this_list_of_elements, 'single_file_and_json', job);
            console.log("DATA");
            console.log(data);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    } else if (mode === 'folder_and_json') {
        var folderInput = input(parent, {
            type: "file",
            id: id,
            multiple: true,
            webkitdirectory: "true",
            accept: allowedTypes
        });
        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });
        folderInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, 'folder_submission');
        });
        var submitBtn = button(parent, { innerHTML: "Submit", id: 'folderSubmitButton' });
        this_list_of_elements = [id];
        // Iterate over formElements and add them to the list
        if (formElements) {
            formElements.forEach(el => {
                this_list_of_elements.push(el);
            });
        }
        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package(this_list_of_elements, 'folder_and_json', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    }
}


function handleFileSelection(event, inputId, fileListContainer, allowedTypes, mode) {
    if (mode === 'single_file') {
        let thisInput = document.getElementById(inputId);
        if (thisInput.files.length !== 1) {
            alert("Only one file can be uploaded at a time.");
            thisInput.value = ""; 
            fileListContainer.innerHTML = "<li>No file chosen</li>";
            fileSelections[inputId] = [];
            return;
        }
        let file = thisInput.files[0];
        let fileType = `.${file.name.split(".").pop().toLowerCase()}`;
        if (!allowedTypes.includes(fileType)) {
            alert("Invalid file type.");
            thisInput.value = "";
            fileListContainer.innerHTML = "<li>No file chosen</li>";
            fileSelections[inputId] = [];
            return;
        }
        fileSelections[inputId] = [file];
        fileListContainer.innerHTML = `<li>${file.name}</li>`;
    } else if (mode === 'folder_submission'){
        let files = Array.from(event.target.files);
        if (files.length === 0) {
            fileListContainer.innerHTML = "<li>No files selected.</li>";
            return;
        }
        let invalidFiles = [];
        let validFiles = [];
        files.forEach(file => {
            let fileType = `.${file.name.split('.').pop().toLowerCase()}`;
            if (!allowedTypes.includes(fileType)) {
                invalidFiles.push(file.name);
            } else {
                validFiles.push(file);
            }
        });
        if (invalidFiles.length > 0) {
            alert(`Invalid file(s) detected:\n${invalidFiles.join("\n")}\n\nPlease select only allowed file types.`);
            event.target.value = "";
            fileListContainer.innerHTML = "<li>No files selected.</li>";
            fileSelections[inputId] = [];
            return;
        }
        fileSelections[inputId] = validFiles;
        fileListContainer.innerHTML = "";
        validFiles.forEach(file => {
            let listItem = document.createElement("li");
            listItem.textContent = file.webkitRelativePath || file.name;
            fileListContainer.appendChild(listItem);
        });
    } 
}


// $$$$$$$$$$$$$$$$$$  IMAGE CAROUSELS AND CONTAINERS   $$$$$$$$$$$$$$$$$$$$$$$$$$


// Function to create and append an image carousel
function createImageCarousel(attributes, images, parentElement, interval) {

    const outerCarouselDiv = createAndAppendElementCarousel('div', {
        id: 'outerCarouselDiv'
    }, parentElement);

    // Create the carousel container
    const carousel = createAndAppendElementCarousel('div', {
        class: 'carousel slide',
        id: attributes.id,
        'data-ride': 'carousel',
        'data-interval': interval
    }, outerCarouselDiv);

    const deleteCarouselImageDiv = createAndAppendElementCarousel('div', {
        id: 'deleteCarouselImageDiv'
    }, outerCarouselDiv);


    // Add controls (previous and next)
    const prevControl = createAndAppendElementCarousel('a', {
        class: 'carousel-control-prev',
        href: 'javascript:void(0);', // Prevent default navigation
        role: 'button',
        'data-slide': 'prev'
    }, carousel);
    prevControl.textContent = '⟵';
    //prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
    prevControl.onclick = () => moveCarousel(carousel, -1);

    // Create the inner part of the carousel
    const carouselInner = createAndAppendElementCarousel('div', {
        class: 'carousel-inner'
    }, carousel);


    // Add images
    images.forEach((image, index) => {
        const itemClass = index === 0 ? 'carousel-item active' : 'carousel-item';
        const item = createAndAppendElementCarousel('div', { class: itemClass }, carouselInner);
        createAndAppendElementCarousel('img', {
            class: 'd-block w-100 carouselImage',
            src: image.src,
            alt: image.alt
        }, item);
    });

    
    const nextControl = createAndAppendElementCarousel('a', {
        class: 'carousel-control-next',
        href: 'javascript:void(0);', // Prevent default navigation
        role: 'button',
        'data-slide': 'next'
    }, carousel);
    nextControl.textContent = '⟶';
    //nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
    nextControl.onclick = () => moveCarousel(carousel, 1);

    // Add a delete button below the carousel
    const deleteBtn = createAndAppendElementCarousel('input', {
        class: 'carousel-delete-btn',
        type: 'button',
        value: 'Delete'
    }, deleteCarouselImageDiv);
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteCurrentImage(carousel);

    return carousel;
}


function moveCarousel(carouselElement, direction) {
    // Find the active item
    const activeItem = carouselElement.querySelector('.carousel-item.active');
    let newItem = direction === 1 ? activeItem.nextElementSibling : activeItem.previousElementSibling;

    // Wrap around if at start or end
    if (!newItem) {
        const items = carouselElement.querySelectorAll('.carousel-item');
        newItem = direction === 1 ? items[0] : items[items.length - 1];
    }

    // Update classes to change active item
    activeItem.classList.remove('active');
    newItem.classList.add('active');
    console.log(newItem);

    updateShirtCanvas('src_swap', newItem.querySelector('img').src);

}


function deleteCurrentImage(carousel) {
    const activeItem = carousel.querySelector('.carousel-item.active');
    if (!activeItem) return;

    const activeImg = activeItem.querySelector('img');
    if (!activeImg) return;

    // Optionally confirm deletion
    if (!confirm('Are you sure you want to delete this image?')) return;

    var image_src = activeImg.src;
    // Remove the image from the carousel
    activeItem.remove();

    // Remove the src from the cookie
    removeImageFromCookie(image_src);
    
    console.log('activeItem.src');
    console.log(activeImg);
    console.log(image_src);

    // Delete the image from the database
    // Send a request to the server to delete the image file
    $.ajax({
        url: '/delete_image',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({image_path: image_src}),
        success: function() {
            console.log('Image successfully deleted');
            // Attempt to click the first child with class 'art' after deletion
            var nextImage = $('.image-container .art:first');
            if (nextImage.length > 0) {
                nextImage.click(); // Simulate click if another image exists
            } else {
                console.log('Image Deleted');
                //window.location.href = '/shopping'; // Redirect if no images left
            }
        },
        error: function(xhr, status, error) {
            console.error("Error deleting image: " + error);
        }
    });

    // Additional handling if there are no more images
    if (!carousel.querySelector('.carousel-item')) {
        carousel.remove(); // Remove the entire carousel if empty
    } else {
        // Ensure there's an active class
        const items = carousel.querySelectorAll('.carousel-item');
        if (!Array.from(items).some(item => item.classList.contains('active'))) {
            items[0].classList.add('active'); // Make the first item active if no active item left
        }
    }
}

function createAndAppendElementCarousel(type, attributes, parent, htmlContent = '') {
    const element = document.createElement(type);
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    element.innerHTML = htmlContent;
    parent.appendChild(element);
    return element;
}



function populate_images(the_images_src, parentElement) {

    // Check if the parent exists
    if (!parentElement) {
        console.error('The specified parent element does not exist.');
        return;
    }

    // Iterate over the list of image sources
    the_images_src.forEach((src, index) => {
        // Create a new image element
        console.log('src: ', src);
        createAndAppendElement('img', {
            src: src,
            class: 'art',
            id: `image_${index + 1}`,
            alt: `Image number ${index + 1}`
        }, parentElement);
    });

}


// sources is a list of src's
function flexibleImageContainer(sources, centeredBlock) {

    // Images

    createAndAppendElement('div', {
        class: 'mb-5',
        id: 'imageDiv'
    }, centeredBlock);

    const imageDiv = document.getElementById('imageDiv');

    createAndAppendElement('div', {
        class: 'image-container',
        id: 'image-container'
    }, imageDiv);

    const imageContainer = document.getElementById('image-container');


    populate_images(sources, imageContainer)

}


function singleImageContainer(sourceDivId, sourceClass, source, centeredBlock) {
    
    createAndAppendElement('div', {
        class: 'mb-5',
        id: sourceDivId,
    }, centeredBlock)

    const imageDiv = document.getElementById(sourceDivId);

    createAndAppendElement('img', {
        class: sourceClass,
        src: source
    }, imageDiv);
}






// $$$$$$$$$$$$$$$$$$  STRUCTURED ELEMENTS WITH CSS   $$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$  STRUCTURED ELEMENTS WITH CSS   $$$$$$$$$$$$$$$$$$$$$$$$$$
function simpleForm102(centered_block, elements, containerBorderColor = "#3498db", inputBorderColor = "#ccc", submitButtonColor="#007bff", submitHover="#ccc") {
    let counts = {}; // Track the count of each type to ensure unique IDs
    let formElementIds = []; // Store IDs of all form elements (except submit button)
    // Create the form container
    const container = form(centered_block, { id: "form_box102" });
    elements.forEach(({ type, options = [], title, ...attributes }) => {
        let baseId = type + "102";
        counts[type] = (counts[type] || 0) + 1;
        let finalId = counts[type] > 1 ? `${baseId}_${counts[type]}` : baseId;
        attributes.id = finalId;
        let wrapper;
        if (type === "select") {
            wrapper = div(container, { class: "input-wrapper" });
            createSelectWithOptions(wrapper, attributes, options, "Choose an option");
            formElementIds.push(finalId);
        } 
        else if (type === "textarea") {
            attributes.style = `width: ${attributes.width || '90%'}; height: ${attributes.height || '150px'};`;
            textarea(container, attributes);
            formElementIds.push(finalId);
        } 
        else if (type === "radio") {
            wrapper = div(container, { class: "radio-group" });
            if (title) h4(wrapper, { innerHTML: title, class: "group-title" });
            createRadioButtonsWithOptions(attributes, options.map((opt, index) => ({
                id: `${finalId}_${index + 1}`,
                value: opt,
                label: opt
            })), wrapper);
            container.appendChild(wrapper);
            formElementIds.push(finalId);
        } 
        else if (type === "checkbox") {
            wrapper = div(container, { class: "checkbox-group" });
            if (title) h4(wrapper, { innerHTML: title, class: "group-title" });
            createCheckboxesWithOptions(attributes, options.map((opt, index) => ({
                id: `${finalId}_${index + 1}`,
                value: opt,
                label: opt
            })), wrapper);
            container.appendChild(wrapper);
            formElementIds.push(finalId);
        }
        else if (type === "submit") {
            attributes.type = type;
            input(container, attributes);
        }
        else {
            attributes.type = type;
            input(container, attributes);
            formElementIds.push(finalId);
        }
    });
    // Store IDs globally for submitSimpleForm102 to use
    window.formElementIds = formElementIds;
    // Apply styles after form is built
    function styleFormElements(formContainer, containerBorderColor, inputBorderColor) {
        Object.assign(formContainer.style, {
            width: "320px",
            margin: "50px auto",
            padding: "20px",
            border: `1px solid ${containerBorderColor}`,
            borderRadius: "5px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            gap: "15px"
        });
        // Debugging: Show background colors to verify structure
        const groups = formContainer.querySelectorAll(".radio-group, .checkbox-group");
        groups.forEach(group => {
            Object.assign(group.style, {
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Keep title centered
                padding: "10px",
                border: `1px solid ${inputBorderColor}`,
                borderRadius: "5px",
                width: "100%"
            });
            // Left-align only the container inside
            const innerContainer = group.querySelector(".radio-container, .checkbox-container");
            if (innerContainer) {
                Object.assign(innerContainer.style, {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // Fully left-align radio buttons & checkboxes
                    width: "90%", 
                    margin: "0 auto"
                });
            }
        });
        // Style group titles (centered inside group containers)
        const groupTitles = formContainer.querySelectorAll(".group-title");
        groupTitles.forEach(title => {
            Object.assign(title.style, {
                margin: "0 0 5px 0",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                width: "100%",
                textAlign: "center" // Keeps title centered inside container
            });
        });
        // Style radio and checkbox items (inputs + labels)
        const inputItems = formContainer.querySelectorAll(".radio-item, .checkbox-item");
        inputItems.forEach(item => {
            Object.assign(item.style, {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start", // Ensures left alignment
                gap: "5px", // Small, consistent gap between input and label
                width: "100%"
            });
            // Ensure input stays fully left
            const input = item.querySelector("input");
            if (input) {
                Object.assign(input.style, {
                    margin: "0", // Remove extra spacing
                    width: "auto", // Prevents radio buttons from stretching
                    height: "18px", // Standard size for radio buttons
                    flexShrink: "0" // Prevents input from resizing
                });
            }
            // Ensure labels align properly with their inputs
            const label = item.querySelector("label");
            if (label) {
                Object.assign(label.style, {
                    margin: "0",
                    padding: "0",
                    flexGrow: "0",
                    textAlign: "left" // Ensures the label aligns to the left
                });
            }
        });
        // Style individual form elements (EXCLUDE radio & checkbox inputs)
        const inputs = formContainer.querySelectorAll("input:not([type='radio']):not([type='checkbox']), select, textarea");
        inputs.forEach(input => {
            Object.assign(input.style, {
                padding: "10px",
                margin: "5px",
                border: `1px solid ${inputBorderColor}`,
                borderRadius: "5px",
                width: input.tagName === "TEXTAREA" ? "90%" : "200px",
                maxWidth: "280px",
                transition: "0.3s"
            });
            input.addEventListener("focus", () => {
                input.style.borderColor = darkenColor(inputBorderColor, 10);
            });
            input.addEventListener("blur", () => {
                input.style.borderColor = inputBorderColor;
            });
        });
        // Style Submit Button
        const buttons = formContainer.querySelectorAll("input[type='submit']");
        buttons.forEach(button => {
            Object.assign(button.style, {
                padding: "10px",
                margin: "10px 0",
                border: "none",
                borderRadius: "5px",
                backgroundColor: submitButtonColor, // Primary color
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                width: "200px", // Consistent with input fields
                maxWidth: "100%",
                transition: "0.3s"
            });
            button.addEventListener("mouseover", () => {
                button.style.backgroundColor = submitHover; // Darker on hover
            });
            button.addEventListener("mouseout", () => {
                button.style.backgroundColor = submitButtonColor;
            });
        });
    }
    container.addEventListener("submit", function(event) {
        event.preventDefault();
    })
    // Helper function to darken a hex color (used for focus effect)
    function darkenColor(hex, percent) {
        let num = parseInt(hex.slice(1), 16),
            amt = Math.round(2.55 * percent),
            r = (num >> 16) - amt,
            g = ((num >> 8) & 0x00FF) - amt,
            b = (num & 0x0000FF) - amt;
        return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    // Apply styling after elements are built
    styleFormElements(container, containerBorderColor, inputBorderColor);
}

function login_box101(centeredBlock) {
    // Create & inject styles (inside the function itself)
    if (!document.getElementById("login_styles101")) {
        const style = document.createElement("style");
        style.id = "login_styles101";
        style.innerHTML = `
            /* Login Box */
            #login_box101 {
                width: 320px;
                margin: 50px auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background: #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            /* Heading */
            #login_box101 h1 {
                text-align: center;
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
            }

            /* Login Form */
            #login_form101 {
                display: flex;
                flex-direction: column;
            }

            /* Input Fields */
            #login_form101 input[type="email"],
            #login_form101 input[type="password"] {
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 16px;
            }

            /* Submit Button */
            #login_form101 input[type="submit"] {
                padding: 10px;
                border: none;
                border-radius: 4px;
                background-color: #007bff;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
            }

            #login_form101 input[type="submit"]:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }
    // Create the login box
    const login_box = div(centeredBlock, { id: "login_box101" });
    h1(login_box, { innerHTML: "Login" });
    // Create the form
    const login_form = form(login_box, { id: 'login_form101', onsubmit: 'return submitLoginForm101();' });
    input(login_form, { id: 'email101', name: 'email101', type: 'email', placeholder: 'Email' });
    input(login_form, { id: 'password101', name: 'password101', type: 'password', placeholder: 'Password' });
    input(login_form, { type: 'submit', value: 'Log In' });
}

function submitLoginForm101() {
    // Pass ids for form values.
    let formElements = ["email101", "password101"];
    let { data, responseType } = ajax_package(formElements, 'json_only', 'login101');
    console.log('hey');
    //sleep(500);
    ajax_request(data, responseType);
    return false; // Prevent default form submission.
}

function submitSimpleForm102() {
    // Retrieve stored IDs
    let formElements = window.formElementIds || [];
    // Ensure we are passing the correct elements
    console.log("Submitting Form with IDs:", formElements);
    let { data, responseType } = ajax_package(formElements, 'json_only', 'simpleForm102');
    ajax_request(data, responseType);
    return false; // Prevent default form submission.
}