

// Main Listener
// main function on page loading everytime
document.addEventListener('DOMContentLoaded', function() {
    const page = getPageFromUrl();
    loadPage(page);
});

function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || document.body.getAttribute('data-page') || "home"; // Default to 'home' if no page is specified.
}


// Navigation and State Handling
// navigate
function navigate(page) {
    console.log('Navigating to:', page); // Debug message
    history.pushState({ page }, "", "?page=" + page);
    loadPage(page);
}

window.addEventListener('popstate', function(event) {
    const page = event.state ? event.state.page : getPageFromUrl();
    loadPage(page);
});

function updatePageState(page) {
    localStorage.setItem('currentPage', page);
    document.body.setAttribute('data-page', page);
    window.scrollTo(0, 0);
}


// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


// $$$$$ Add new cases, titleContents, metaContents, and load functions for each page you create   $$$$$$$$

// Define your Titles and Meta Content Here
function loadPage(page) {

    let titleContent = '';
    let metaContent = '';

    switch (page) {

        case 'home':
            titleContent = 'Summit';
            metaContent = 'Helping you Summit your next Flask Project';
            loadHomePage(titleContent, metaContent);
            break;
        case 'documentation':
            titleContent = 'Summit Documentation';
            metaContent = 'The documenation you need to learn the summit framework';
            loadDocumentationPage(titleContent, metaContent);
            break;
        // ADD MORE CASES FOR EACH OF YOUR PAGES AS NEEDED
        case 'login':
            titleContent = "Summit Login";
            metaContent = "Summit Login";
            loadLoginPage(titleContent, metaContent);
            break;
        case 'dashboard':
            titleContent = "Summit Dashboard";
            metaContent = "Summit Dashboard";
            loadDashboardPage(titleContent, metaContent);
            break;
        default:
            titleContent = 'Summit Framework';
            metaContent = 'A framework built to get you from base camp to the summit quickly!';
            loadHomePage(titleContent, metaContent);
            break;
    }

    updatePageState(page)

}

// Home Page Entry Point
function loadHomePage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');
  
    buildNavBar('main');
  
    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });
  
    // Hero Section
    const heroSection = div(wrapper, { class: "hero-section" });
    img(heroSection, {
      src: "/static/images/summit.png",
      alt: "Summit Logo",
      class: "hero-logo"
    });
    h1(heroSection, { innerHTML: "Summit", id: 'mainTitle'});
    p(heroSection, { innerHTML: "A JavaScript and Python (Flask) Framework.", class: "hero-subtitle" });
  
    // Info Section
    const infoContainer = div(wrapper, { class: "info-container" });
    const servicesContainer = div(infoContainer, { class: "services-container" });
  
    const tileData = [
      {
        title: "Who We Are",
        text:
          "Summit was developed from a need to quickly build an intuitive GUI that interfaces well with AI backends."
      },
      {
        title: "What We Believe",
        text:
          "We believe in rapid prototyping and focusing on developing a robust backend quickly. We wanted to remove the hassle of strapping a front end on."
      },
      {
        title: "Our Mission",
        text:
          "To make Summiting your project as simple as possible."
      },
    ];
  
    tileData.forEach(({ title, text }) => {
      const tile = div(servicesContainer, { class: "service-box" });
      h2(tile, { innerHTML: title });
      p(tile, { innerHTML: text });
    });

    //const text_container = div(wrapper, {id: "text-container"});
    h2(wrapper, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    //a(text_container, {href: "javascript:navigate('documentation')", innerHTML: "Documentation"});
    //const text_container2 = div(wrapper, {id: "text-container2"});
    //a(text_container2, {href: "javascript:navigate('login')", innerHTML: "Login"});
  
    buildFooter();
    
}


function loadDocumentationPage(titleContent, metaContent) {
    startOffAPage(titleContent, metaContent);
    const centeredBlockMain = document.getElementById("centered_block");
    const wrapper = div(centeredBlockMain, { class: "landing-wrapper doc_wrapper" });

    buildNavBar('docs');

    standardTopOfPage2(wrapper, "Summit Documentation", "")


    // Utility to add structured cards
    const addDocCard = (title, buildContentFn) => {
        const card = div(wrapper, { class: "doc_card" });
        h2(card, { class: "doc_h3", innerHTML: title, id: title.replace(/[^\w]/g, "_")});
        buildContentFn(card);
    };

    // === OVERVIEW ===

    addDocCard("Overview", (card) => {
        p(card, { class: "doc_p", innerHTML: `Summit is a full JavaScript + Python (Flask) Single Page Application (SPA) framework. It provides dynamic routing, UI construction through structured JS helpers, and a frontend-backend-frontend AJAX pipeline for communication via Flask.` });
        h3(card, { class: "doc_h3", innerHTML: "Your Summit Project" });
        p(card, {
            class: "doc_p",
            innerHTML: `Summit follows a simple, modular folder layout. Each file has a focused responsibility.`
        });
    
        const structureBlock = p(card, {});
        code(structureBlock, {
            innerHTML: highlightCode(`
    your_project_name/
    │
    ├── static/
    │   ├── css/
    │   │   └── summit.css             ← All styles
    │   ├── js/
    │   │   ├── project.js             ← SPA routing, state, logic
    │   │   ├── summit.js              ← Element builders, layout helpers
    │   │   └── summit_ajax.js         ← AJAX pipeline
    │   └── images/                    ← All images here
    │
    ├── templates/
    │   └── index.html                 ← Only needed once – Summit renders into it
    │
    ├── app.py                         ← Flask routes (keep minimal)
    ├── summit.py                      ← Backend logic + job handlers
    └── .env                           ← API keys, secrets, env vars
    `)
        });
    
        h3(card, { class: "doc_h3", innerHTML: "What Goes Where?" });
    
        ul(card, {});
        li(card, { innerHTML: `<strong>project.js:</strong> Manages client routing, navigation, and dynamic page loading.` });
        li(card, { innerHTML: `<strong>summit.js:</strong> Contains all reusable UI helpers like <code>div()</code><code>input()</code>and layout generators.` });
        li(card, { innerHTML: `<strong>summit_ajax.js:</strong> Full AJAX pipeline (package → validate → request → handle).` });
        li(card, { innerHTML: `<strong>app.py:</strong> Should only have route declarations <code>/</code> and <code>/ajax_receive</code>` });
        li(card, { innerHTML: `<strong>summit.py:</strong> All backend job logic is routed here from /ajax_receive and is handled via <code>ajax_process()</code>` });
        li(card, { innerHTML: `<strong>.env:</strong> Stores your API keys, tokens, and config – never push to GitHub.` });
    
        p(card, { class: "doc_p", innerHTML: `Summit injects everything dynamically. You never need to modify: <code>index.html</code>` });
    });
    

    // === STATE MANAGEMENT & ROUTING ===
    addDocCard("1. State Management & Routing", (card) => {
        h3(card, { class: "doc_h3", innerHTML: "Core Navigation Flow" });
        ul(card, {});
        li(card, { innerHTML: "<strong>Startup:</strong> DOMContentLoaded → getPageFromUrl() → loadPage()" });
        li(card, { innerHTML: "<strong>Navigation:</strong> navigate('page-name') → loadPage('page-name')" });
        li(card, { innerHTML: "<strong>Browser back/forward:</strong> popstate event → loadPage(savedPage)" });

        h3(card, { class: "doc_h3", innerHTML: "State Functions" });
        ul(card, {});
        
        li(card, { class: "doc_p", innerHTML: `<strong>navigate(page):</strong> Pushes new URL to history and triggers page load.` });
        p(card, { innerHTML: `For single-page routing.` });
        code(card, {innerHTML: highlightCode(`a(parent, {href: "javascript:navigate('dashboard')};`)})
        
        li(card, { class: "doc_p", innerHTML: `<strong>loadPage(page):</strong> Switch-based router that calls your page loader.` });
        code(card, {innerHTML: highlightCode(`case 'about':
    titleContent = "About";
    metaContent = "Learn about us";
    loadAboutPage(titleContent, metaContent);`)});

        li(card, { class: "doc_p", innerHTML: `<strong>updatePageState(page):</strong> Updates localStorage, sets data-page, and scrolls to top.` });

    });

    // === PAGE LIFECYCLE ===
    addDocCard("2. Page Lifecycle Functions", (card) => {
        ul(card, {})
        li(card, { class: "doc_p", innerHTML: "<strong>#centered_block:</strong> All dynamic content is injected here." });
        li(card, { class: "doc_p", innerHTML: `<strong>startOffAPage(title, meta):</strong> Wipes #outer_block, sets up #centered_block, inserts new &lt;title&gt; and &lt;meta&gt;.` });
        li(card, { class: "doc_p", innerHTML: "<strong>clearCenteredBlock(component):</strong> Remove all inner content from a container." });
        li(card, { class: "doc_p", innerHTML: "<strong>clearDynamicHeadElements():</strong> Clears all elements in <head> not tagged with data-static='true'" });
        li(card, { innerHTML: `<strong>titleAndMeta(headBlock, title, meta):</strong> Appends title and meta to 'head'. Sets page metadata for SEO.` });
        li(card, { class: "doc_p", innerHTML: `<strong>buildNavBar(type):</strong> Inserts dynamic nav for 'main', 'dashboard', or 'docs'.` });
        li(card, { class: "doc_p", innerHTML: `<strong>buildFooter():</strong> Appends your site’s footer.` });
        li(card, { class: "doc_p", innerHTML: "<strong>appendHtmlToParent(htmlString, parent):</strong> Raw HTML injection." });
    });

    // === SPA STRUCTURE ===
    addDocCard("4. SPA Structure (index.html)", (card) => {
        // pre()
        const structure = p(card, {});
        code(structure, {innerHTML: highlightCode(`
<body id="index_body" data-page="home">
<div id="outer_block">
    <div id="centered_block"> </div>
</div>
</body>`)});
        p(card, { class: "doc_p", innerHTML: "Summit injects and rebuilds content dynamically using JavaScript, so full-page reloads are never needed." });
        p(card, { class: "doc_p", innerHTML: `The <strong>#centered_block</strong> is cleared and rebuilt every time you navigate. No full reloads.` });
        p(card, { class: "doc_p", innerHTML: `This structure powers fluid, seamless transitions with full control.` });
    });
    // === SPA ELEMENT CREATION REFERENCE ===
    addDocCard("5. Element Creation", (card) => {
        // Overview
        p(card, { class: "doc_p", innerHTML: "No static HTML required."})
        p(card, { class: "doc_p", innerHTML: "Summit is a declarative SPA framework. You build your entire UI using helper functions like <code>div(parent, {attrs})</code>" });
        
        const this_p = p(card, { class: "doc_p", innerHTML: "Use one-liner functions to build any HTML tag. Format:" });
        code(this_p, {innerHTML: highlightCode(`tagName(parent, {id: 'your_id', class: 'your_class', etc...})`)})

        p(card, { innerHTML: "<code>div, p, h1–h6, input, button, form, select, table, ul, li, etc...</code>" });

        // Layout
        h3(card, { class: "doc_h3", innerHTML: "Layout Helpers" });
        p(card, { class: "doc_p", innerHTML: "Summit provides semantic wrappers to apply row/column logic without writing raw Bootstrap." });
        // pre (
        const layoutBlock = p(card, {});
        code(layoutBlock, {innerHTML: highlightCode(`const r = row(wrapper);
const c = col(r, { class: "col-md-6" });
`)});
        // Complex Elements
        h3(card, { class: "doc_h3", innerHTML: "Prebuilt Interactive Inputs" });
        ul(card, {});
        li(card, { innerHTML: "<strong>createSelectWithOptions:</strong> Custom dropdown generator" });
        li(card, { innerHTML: "<strong>createCheckboxesWithOptions / createRadioButtonsWithOptions:</strong> Build grouped input sets" });

        // Custom Components
        h3(card, { class: "doc_h3", innerHTML: "Custom Components (FULL_MODULAR)" });
        p(card, { class: "doc_p", innerHTML: "Summit encourages building full modular UI blocks that inject themselves and handle logic." });
        //pre(
        const modularBlock = p(card, {});
        code(modularBlock, {innerHTML: highlightCode(`function login_box101(parent) {
    const box = div(parent, { id: "login_box101" });
    h1(box, { innerHTML: "Login" });
    const f = form(box, { id: "login_form101", onsubmit: "return submitLoginForm101();" });
    input(f, { id: "email101", type: "email", placeholder: "Email" });
    input(f, { id: "password101", type: "password", placeholder: "Password" });
    input(f, { type: "submit", value: "Log In" });
}

function submitLoginForm101() {
    let formElements = ["email101", "password101"];
    let { data, responseType } = ajax_package(formElements, 'json_only', 'login101');
    ajax_request(data, responseType);
    return false;
}
`)});
        p(card, { class: "doc_p", innerHTML: "You can handle the CSS for your Custom Components in-line (fully modular) or in summit.css" });


        // Utility Functions
        //h3(card, { class: "doc_h3", innerHTML: "Page-Level Utilities" });
        //ul(card, {});
        
        
    });

    addDocCard("6A. AJAX Concepts", (card) => {
        h3(card, { class: "doc_h3", innerHTML: "Structured Pipeline" });
        p(card, {
            class: "doc_p",
            innerHTML: `Summit uses a modular AJAX pipeline that keeps backend logic simple, frontend code clear, and the interface responsive.`
        });
    
        const flowBlock = p(card, {});
        code(flowBlock, {
            innerHTML: highlightCode(`
→ Frontend: ajax_package → ajax_validate → ajax_request
→ Flask: ajax_receive → ajax_process
→ Frontend: ajax_handle`)
        });

        h3(card, { class: "doc_h3", innerHTML: "GATHER → VALIDATE → PROCESS → HANDLE" });
        ul(card, {});
        li(card, { innerHTML: "<strong>GATHER:</strong> Collect input data and files using formElements or createFileInput." });
        li(card, { innerHTML: "<strong>VALIDATE:</strong> Add validation logic to <code>ajax_validate()</code> for your <strong>mode</strong> and <strong>job</strong>." });
        li(card, { innerHTML: "<strong>PROCESS:</strong> Handle backend logic in Python inside <code>ajax_process()</code>" });
        li(card, { innerHTML: "<strong>HANDLE:</strong> Receive and process result in <code>ajax_handle()</code>" });

        h3(card, { class: "doc_h3", innerHTML: "Customize Only These:" });
        //ul(card, {});
        p(card, { innerHTML: "<code>ajax_validate()</code> (frontend): Check input before sending" });
        p(card, { innerHTML: "<code>ajax_process()</code> (backend): Route to your custom logic" });
        p(card, { innerHTML: "<code>ajax_handle()</code> (frontend): Handle response by job and mode" });

        h3(card, { class: "doc_h3", innerHTML: "Do Not Modify:" });
        //ul(card, {});
        p(card, { innerHTML: "<code>ajax_package()</code>: Builds the data payload and calls ajax_validate" });
        p(card, { innerHTML: "<code>ajax_request()</code>: Sends the AJAX request" });
        p(card, { innerHTML: "<code>ajax_receive()</code>: Flask route that dispatches to ajax_process" });

    
        h3(card, { class: "doc_h3", innerHTML: "What's a Job?" });
        p(card, {
            class: "doc_p",
            innerHTML: `<code>job</code> tells the backend what task to run. Examples: <code>"register_user"</code> <code>"ping"</code> <code>"save_settings"</code>`
        });
    
        h3(card, { class: "doc_h3", innerHTML: "What's a Mode?" });
        p(card, {
            class: "doc_p",
            innerHTML: `<code>mode</code> tells the frontend and backend how to format the data.`
        });
    
        //ul(card, {});
        p(card, { innerHTML: "<code>simple_post</code>: No data, just a job flag" });
        p(card, { innerHTML: "<code>json_only</code>: Send JSON from input fields" });
        p(card, { innerHTML: "<code>single_file</code>: Upload a file" });
        p(card, { innerHTML: "<code>single_file_and_json</code>: File + metadata" });
        p(card, { innerHTML: "<code>multiple_files</code>: Upload a file" });
        p(card, { innerHTML: "<code>folder_and_json</code>: Folder + metadata" });
        
    });
    addDocCard("6B. Full AJAX Pipeline", (card) => {
        h3(card, { class: "doc_h3", innerHTML: "1 Gather Input" });
        p(card, {
            class: "doc_p",
            innerHTML: `Gather your inputs and send to ajax_package() for validation and packaging your data: <code>ajax_package(formElements, mode, job)</code>.`
        });
        const packBlock = p(card, {});
        code(packBlock, {
            innerHTML: highlightCode(`let formElements = ["username", "email"]
let { data, responseType } = ajax_package(formElements, "json_only", "register_user")`)
        });


        h3(card, { class: "doc_h3", innerHTML: "2 Validate Your Data" });
        p(card, {
            class: "doc_p",
            innerHTML: `This function lets you validate user inputs before anything is sent to the backend: <code>ajax_validate(data, job, mode)</code>ajax_validate() runs automatically when you call:<code>ajax_package(formElements, mode, job)</code>`
        });
        ul(card, {});
        li(card, { innerHTML: `<strong>mode:</strong> Tells you the structure of the data (JSON, file, etc)` });
        li(card, { innerHTML: `<strong>job:</strong> Tells you what logic the request is trying to trigger` });
        li(card, { innerHTML: `<strong>data:</strong> Contains the actual input (either JSON object or FormData)` });

        li(card, { innerHTML: `Use <strong>switch(mode)</strong> and <strong>switch(job)</strong> to write validation logic scoped to your task.` });

        const validateBlock = p(card, {});
        code(validateBlock, {
            innerHTML: highlightCode(`case 'json_only':
        switch (job) {
            case 'json_1':
                let email = data["email"]
                if (!emailPattern.test(email)) {
                    alert("Invalid email format")
                    return
                }
                return
        }`)
        });

        li(card, { innerHTML: `Return early with alerts or errors to prevent bad requests.` });

    
        h3(card, { class: "doc_h3", innerHTML: "3 Send the Request" });
        const sendBlock = p(card, {});
        code(sendBlock, {
            innerHTML: highlightCode(`ajax_request(data, responseType)`)
        });
    
        h3(card, { class: "doc_h3", innerHTML: "4 Backend Entry Point" });
        const routeBlock = p(card, {});
        code(routeBlock, {
            innerHTML: highlightCode(`@app.route('/ajax_receive', methods=['POST'])
def ajax_receive():
    backend_flag = request.form.get("backend_flag") or request.json.get("backend_flag")
    job = request.form.get("job") or request.json.get("job")
    file = request.files.get("file", None)
    data = request.form or request.json
    return jsonify(ajax_process(file, backend_flag, job, data))`)
        });
    
        h3(card, { class: "doc_h3", innerHTML: "5 Backend Dispatcher" });
        const dispatchBlock = p(card, {});
        code(dispatchBlock, {
            innerHTML: highlightCode(`def ajax_process(file, backend_flag, job, data=False):
    if backend_flag == 'json_only':
        if job == 'register_user':
            return register_user(data)
        elif job == 'json_1':
            return process_json_1(file, backend_flag, job)
        elif job == 'ping':
            return handle_ping(backend_flag, job)
    return { "success": False, "message": "Invalid request" }, 400`)
        });
    
        h3(card, { class: "doc_h3", innerHTML: "6 Define Your Backend Jobs" });
        
        const fn1 = p(card, {});
        code(fn1, {
            innerHTML: highlightCode(`def handle_ping(backend_flag, job):
    return {"success": True, "backend_flag": backend_flag, "job": job, "message": "Pong!"}, 200`)
        });
    
        const fn2 = p(card, {});
        code(fn2, {
            innerHTML: highlightCode(`def process_json_1(file, backend_flag, job):
    username = file.get("username", "").strip()
    email = file.get("email", "").strip()
    if not username or not email:
        return {"success": False, "backend_flag": backend_flag, "job": job, "message": "Missing required fields (username, email)"}, 400
    return {"success": True, "backend_flag": backend_flag, "job": job, "message": "JSON processed successfully", "username": username, "email": email}, 200`)
        });
    
        h3(card, { class: "doc_h3", innerHTML: "7 Handle the Response" });
        const handleBlock = p(card, {});
        code(handleBlock, {
            innerHTML: highlightCode(`function ajax_handle(responseType, response) {
    let status_code = null
    if (Array.isArray(response)) {
        status_code = response[1]
        response = response[0]
    }

    if (!response.job || !response.backend_flag) return

    let mode = response.backend_flag
    let job = response.job

    switch (mode) {
        case 'simple_post':
            switch (job) {
                case 'ping':
                    console.log(response.message)
                    return
                default:
                    console.log('simple_post handle default')
                    return
            }

        case 'json_only':
            switch (job) {
                case 'json_1':
                    if (response.success) {
                        console.log('Username: ', response.username)
                        return
                    }
                default:
                    console.log('json_only handle default')
                    return
            }

        default:
            console.log('Not a recognized mode - handle error')
            return
    } 
}`)
        });
    });
    
    buildFooter();

}


function loadLoginPage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');

    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });

    buildNavBar('main');

    h1(wrapper, {innerHTML: "Summit Login"});

    login_box101(wrapper);

    p(wrapper, {class: 'warning', innerHTML: "Use test@test.com and password to log in. CHANGE THIS!"})

    buildFooter();
    
};

function loadDashboardPage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');

    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });

    buildNavBar('dashboard');

    h1(wrapper, {innerHTML: "Summit Dashboard"});

    var storedName = localStorage.getItem("fname");
    p(wrapper, {innerHTML: storedName});

    // Build the form without styling
    // Build the form
    simpleForm102(wrapper, [
        { type: "text", placeholder: "Name", class: "input-field", required: true},
        { type: "email", placeholder: "Email", class: "input-field", required: true},
        { type: "number", placeholder: "Age", class: "input-field", required: true },
        { type: "textarea", placeholder: "Enter your message", width: "280px", height: "150px", class: "textarea-field", required: true},
        { type: "select", options: { opt1: "Option 1", opt2: "Option 2", opt3: "Option 3" }, class: "dropdown", required: true},
        { type: "radio", name: "gender", title: "Gender", options: ["Male", "Female", "Other"], class: "radio-group", required: true},
        { type: "checkbox", name: "subscribe", title: "Preferences", options: ["Subscribe to newsletter", "Accept Terms"], class: "checkbox-group", required: true},
        { type: "submit", innerHTML: "Submit", onclick: "submitSimpleForm102()"}
    ], "#ccc", "#ccc", "#007bff", "#0056b3");

    // AJAX PRACTICE

    // Simple Post (GET)
    let { data, responseType } = ajax_package([], 'simple_post', 'ping');
    ajax_request(data, responseType);


    // JSON Only
    //h1(centeredBlock, { innerHTML: "Test: JSON Data Only" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //button(centeredBlock, { innerHTML: "Submit JSON", onclick: "testJsonOnly()" });


    // Single File
    //h1(centeredBlock, { innerHTML: "Test: Single File Upload" });
    //createFileInput(centeredBlock, "singleFile", ".png,.jpeg", 'single_file', 'firstFile');

    // Single File + JSON
    //h1(centeredBlock, { innerHTML: "Test: Single File + JSON" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //createFileInput(centeredBlock, "singleFileWithJson", ".png,.jpeg", 'single_file_and_json', 'testing_single_file_with_json', ['username', 'email']);
    
    // Folder Upload
    //h1(centeredBlock, { innerHTML: "Test: Multiple File Upload" });
    // parent element, id, allowedTypes, backend_flag, job
    //createFileInput(centeredBlock, "multiFiles", ".png,.jpeg", 'folder_submission', 'firstFolder');
    
    // Multi File + JSON
    //h1(centeredBlock, { innerHTML: "Test: Multiple Files + JSON" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //createFileInput(centeredBlock, "multiFilesWithJson", ".png,.jpeg", 'folder_and_json', 'testing_folder_with_json', ['username', 'email']);

    buildFooter();
    
};
