


function loadPage(page) {

    switch (page) {

        case 'home':
            titleContent = 'Summit Framework';
            metaContent = 'A framework built to get you from base camp to the summit quickly!';
            loadHomePage(titleContent, metaContent);
            break;
        case 'documentation':
            titleContent = 'Summit Documentation';
            metaContent = 'The documenation you need to learn the summit framework';
            loadDocumentationPage(titleContent, metaContent)
            break;
        // ADD MORE CASES FOR EACH OF YOUR PAGES AS NEEDED

        default:
            titleContent = 'Summit Framework';
            metaContent = 'A framework built to get you from base camp to the summit quickly!';
            loadHomePage(titleContent, metaContent);
            break;
    }

    // Update current page in localStorage
    localStorage.setItem('currentPage', page);
    document.body.setAttribute('data-page', '');
    
}

    

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
        window.scrollTo(0, 0);
    } else {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }
};

// handleStates
window.addEventListener('popstate', function(event) {
    if (event.state) {
        loadPage(event.state.page);
    } else {
        // Handle the initial state or fallback if no state is present
        const page = document.body.getAttribute('data-page');
        loadPage(page);
    }
});

// mainListener
// main function on page loading everytime
document.addEventListener('DOMContentLoaded', function() {

    const serverPage = document.body.getAttribute('data-page');

    const storedPage = localStorage.getItem('currentPage');

    if (serverPage === '') {
        loadPage(storedPage);
    } else {
        loadPage(serverPage);
    }

});


// navigate
function navigate(page) {
    history.pushState({ page }, "", "?page=" + page);
    loadPage(page);
}


// home
function loadHomePage(titleContent, metaContent) {

    localStorage.setItem('currentPage', 'home');

    const headBlock = document.getElementById('index_head');
    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(headBlock, centeredBlock, titleContent, metaContent);

    img(document.getElementById('centered_block'), { id: "summit_image", src: "/static/images/summit.png" });

    const text_container = div(centeredBlock, {id: "text-container"});
    h1(text_container, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    a(text_container, {href: "/documentation", innerHTML: "Documentation"})

    appendHtmlToParent(trustLogoElement(), centeredBlock);
    
};

function loadDocumentationPage(titleContent, metaContent) {

    localStorage.setItem('currentPage', 'documentation');

    const headBlock = document.getElementById('index_head');
    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(headBlock, centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Summit Documentation"});
    
};
