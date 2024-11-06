


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

}


function startOffAPage(headBlock, centeredBlock, titleContent, metaContent) {

    clearCenteredBlock(centeredBlock);
    
    // Clear head except for data-static = 'true'
    clearDynamicHeadElements();

    // Adds title and meta to head
    titleAndMeta(headBlock, titleContent, metaContent);

    // Adds favicons, additional scripts, etc. to head
    appendHtmlToParent(headBlock, headBlock);

}



function trustLogoElement() {
    const trust_logo = `
        <div id="trust-logo-container">
            <script data-static="true" type="text/javascript"> //<![CDATA[
                var tlJsHost = ((window.location.protocol == "https:") ? "https://secure.trust-provider.com/" : "http://www.trustlogo.com/");
                document.write(unescape("%3Cscript src='" + tlJsHost + "trustlogo/javascript/trustlogo.js' type='text/javascript'%3E%3C/script%3E"));
            //]]></script>
            <script language="JavaScript" type="text/javascript">
                TrustLogo("https://www.positivessl.com/images/seals/positivessl_trust_seal_md_167x42.png", "POSDV", "none");
            </script>
        </div>
    `
    return trust_logo
}






// $$$$$$$$$$$$$$$$$$$$  SIMPLE ELEMENTS         $$$$$$$$$$$$$$$$$$$$$$$$$




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



// $$$$$$$$$$$$$$$$$$$$  COOKIES, AJAX, AND SESSIONS         $$$$$$$$$$$$$$$$$$$$$$$$$

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

function ajaxCall() {

    var server_data2 = [
        {"subProductType": sku}
    ];

    $.ajax({
        type: "POST",
        url: "/process_subProductType",
        data: JSON.stringify(server_data2),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            build_sizeList(result);
        }
    });
}

function dynamicAjaxCall(endpoint, jsonData, successCallback) {
    $.ajax({
        type: "POST",
        url: endpoint,
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
            return result;
        }
    });
}








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

    createAndAppendElement('option', {
        value: startingValue,
        selected: true,
        innerHTML: firstOption
    }, select);
    
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

function createCheckboxesWithOptions(attributes, options, parentElement) {

    const container = document.createElement('div');

    options.forEach(option => {

        const checkbox = createAndAppendElement('input', {

            type: 'checkbox',

            id: option.id,

            name: attributes.name,

            class: attributes.class,

            value: option.value

        }, container);

        createAndAppendElement('label', {

            for: checkbox.id,

            innerHTML: option.label

        }, container);

    });

    parentElement.appendChild(container);

    return container;

}



// Function to create and append radio buttons with labels

function createRadioButtonsWithOptions(attributes, options, parentElement) {

    const container = document.createElement('div');

    options.forEach(option => {

        const radioButton = createAndAppendElement('input', {

            type: 'radio',

            id: option.id,

            name: attributes.name,

            class: attributes.class,

            value: option.value

        }, container);

        createAndAppendElement('label', {

            for: radioButton.id,

            innerHTML: option.label

        }, container);

    });

    parentElement.appendChild(container);

    return container;

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






// $$$$$$$$$$$$$$$$$$  RANDOM   $$$$$$$$$$$$$$$$$$$$$$$$$$





function getCountriesForSelectMenu() {
    const countryDictionary = {
        "AF": "Afghanistan",
        "AX": "Åland Islands",
        "AL": "Albania",
        "DZ": "Algeria",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas (the)",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory",
        "VG": "British Virgin Islands",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "CV": "Cape Verde",
        "KY": "Cayman Islands",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CO": "Colombia",
        "KM": "Comoros",
        "CG": "Congo - Brazzaville",
        "CD": "Congo - Kinshasa",
        "CK": "Cook Islands",
        "CR": "Costa Rica",
        "CI": "Côte d'Ivoire",
        "HR": "Croatia",
        "CY": "Cyprus",
        "CZ": "Czechia",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "SZ": "Eswatini",
        "ET": "Ethiopia",
        "FK": "Falkland Islands",
        "FO": "Faroe Islands",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HN": "Honduras",
        "HK": "Hong Kong SAR China",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Laos",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao SAR China",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "MD": "Moldova",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar (Burma)",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "NU": "Niue",
        "MK": "North Macedonia",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PS": "Palestine",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PN": "Pitcairn Islands",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "RE": "Réunion",
        "RO": "Romania",
        "RU": "Russia",
        "RW": "Rwanda",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SG": "Singapore",
        "SX": "Sint Maarten",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "KR": "South Korea",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "BL": "St. Barthélemy",
        "SH": "St. Helena",
        "KN": "St. Kitts and Nevis",
        "LC": "St. Lucia",
        "MF": "St. Martin",
        "PM": "St. Pierre and Miquelon",
        "VC": "St. Vincent and the Grenadines",
        "SR": "Suriname",
        "SJ": "Svalbard and Jan Mayen",
        "SE": "Sweden",
        "CH": "Switzerland",
        "TW": "Taiwan",
        "TJ": "Tajikistan",
        "TZ": "Tanzania",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom",
        "US": "United States of America",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VA": "Vatican City",
        "VN": "Vietnam",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe"
    };

    return countryDictionary;

}

