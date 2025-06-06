
var public_key_app;
//GOOGLE_RECAPTCHA_PUBLIC_KEY
public_key_app = 'GET_YOUR_GOOGLE_RECAPTCHA_PUBLIC_KEY';

// AJAX PIPELINE
// 
function ajax_validate(data, job, mode) {

    switch (mode) {

        //🌟 
        case 'simple_post':

            // Handle simple_post (LIKE A GET REQUEST)
            switch (job) {

                // ✅
                case 'ping':
                    console.log('simple_post testing');
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('simple_post default');
                    return;
            }

        //🌟 
        case 'json_only':

            // Handle submitting json only (no files or folders)
            switch (job) {
                
                // ✅
                case 'json_1':
                    let email = data["email"]
                    if (!emailPattern.test(email)) {
                        alert("Invalid email format. Please enter a valid email.");
                        return;
                    }
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE
                
                // ✅
                default:
          // ✅ ADD MORE CASES TO HANDLE HERE          console.log('json_only default');
                    return;
            }

        //🌟 
        case 'single_file':

            // Handle submitting only a single file
            switch (job) {

                // ✅
                case 'testing':
                    console.log('single_file testing');
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('single_file default');
                    return;
            }

        //🌟 
        case 'single_file_and_json':

            // Handle submitting json data and a single file
            switch (job) {

                // ✅
                case 'testing_single_file_with_json':
                    let email = data.get("email");
                    if (!emailPattern.test(email)) {
                        alert("Invalid email format. Please enter a valid email.");
                        return;
                    }
                    return;
                
                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('single_file_and_json default');
                    return;
            }


        //🌟 
        case 'folder_submission':

            // Handle submitting a folder (many files - will preserve folder structure)
            switch (job) {

                // ✅
                case 'testing':
                    console.log('folder_submission testing');
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('folder_submission default');
                    return;
            }

        //🌟 
        case 'folder_and_json':

            // Handle submitting a folder (many files - will preserve folder structure) and json
            switch (job) {

                // ✅
                case 'testing_folder_with_json':

                    let email = data.get("email");
                    if (!emailPattern.test(email)) {
                        alert("Invalid email format. Please enter a valid email.");
                        return;
                    }
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE
                
                // ✅
                default:
                    console.log('folder_and_json default');
                    return;
            }
        
        //🌟
        default:
            console.log('Not a recognized mode');
            return;

    }
    
}

//🌟 Handle incoming requests 
function ajax_handle(responseType, response) {
    let status_code = null;

    // Check if response is an array and extract the first object
    if (Array.isArray(response)) {
        status_code = response[1];
        response = response[0];
    }
    console.log('status_code: ', status_code);
    // Ensure job exists in the response
    if (!response.job) {
        console.warn("No job specified in response:", response);
        return;
    }
    if (!response.backend_flag) {
        console.warn("No backend_flag specified in response:", response);
        return;
    }

    let mode = response.backend_flag;
    let job = response.job;

    console.log('ajax_handle (backend_flag): ', mode);
    console.log('ajax_handle (job): ', job);

    switch (mode) {

        //🌟 
        case 'simple_post':

            // Handle simple_post (LIKE A GET REQUEST)
            switch (job) {

                // ✅
                case 'ping':
                    console.log('ping handle testing');
                    console.log(response.message);
                    return;

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('simple_post handle default');
                    return;
            }

        //🌟 
        case 'json_only':

            // Handle submitting json only (no files or folders)
            switch (job) {
                
                // ✅
                case 'login101':
                    console.log('login101!');
                    if (response.success) {
                        console.log("Login Successful:", response.message);
                        localStorage.setItem("fname", response.name);
                        navigate('dashboard');
                        return;
                    } else {
                        let passwordInput = document.getElementById('password101');
                        if (passwordInput) passwordInput.value = "";
                        console.error("Login Failed:", response.message);
                        return;
                    }
                // ✅
                case 'json_1':
                    if (response.success) {
                        console.log('Username: ', response.username);
                        return;
                    }
                // ✅
                case 'simpleForm102':
                    if (response.success) {
                        console.log('Name: ', response.name);
                        return;
                    }
                case 'store_contact':
                    if (response.success) {
                        console.log("Message: ", response.message);
                        return;
                    }
                // ✅ ADD MORE CASES TO HANDLE HERE
                
                // ✅
                default:
                    console.log('json_only handle default');
                    return;
            }

        //🌟 
        case 'single_file':

            // Handle submitting only a single file
            switch (job) {

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('single_file handle default');
                    return;
            }

        //🌟 
        case 'single_file_and_json':

            // Handle submitting json data and a single file
            switch (job) {
                
                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('single_file_and_json handle default');
                    return;
            }


        //🌟 
        case 'folder_submission':

            // Handle submitting a folder (many files - will preserve folder structure)
            switch (job) {

                // ✅ ADD MORE CASES TO HANDLE HERE

                // ✅
                default:
                    console.log('folder_submission handle default');
                    return;
            }

        //🌟 
        case 'folder_and_json':

            // Handle submitting a folder (many files - will preserve folder structure) and json
            switch (job) {

                // ✅ ADD MORE CASES TO HANDLE HERE
                
                // ✅
                default:
                    console.log('folder_and_json handle default');
                    return;
            }
        
        //🌟
        default:
            console.log('Not a recognized mode - handle error');
            return;
    }
}
// DON'T TOUCH
// Package your ajax calls with this
function ajax_package(formElements, mode, job) {
    console.log('ajax_package (backend_flag): ', mode);
    console.log('ajax_package (job): ', job)
    if (mode === 'simple_post') {
        let jsonData = {
            backend_flag: "simple_post",
            job: job
        };
        return { data: jsonData, responseType: "json" };   
    }
    if (mode === 'json_only') {
        let jsonData = {
            backend_flag: "json_only",
            job: job
        };
        formElements.forEach(id => {
            let the_input = document.getElementById(id);
            if (the_input) {
                jsonData[id] = the_input.value.trim();
            }
        });
        // Add Validation
        ajax_validate(jsonData, job, mode);
        return { data: jsonData, responseType: "json" };
    } else if (mode === 'single_file') {
        let formData = new FormData();
        formData.append("backend_flag", 'single_file');
        formData.append("job", job);
        formElements.forEach(id => {
            let input = document.getElementById(id);
            if (input && input.files.length > 0) {
                formData.append(id, input.files[0]);
            }
        });
        // Add Validation
        ajax_validate(formData, job, mode);
        return { data: formData, responseType: "json" };
    } else if (mode === 'single_file_and_json') {
        let formData = new FormData();
        formData.append("backend_flag", 'single_file_and_json');
        formData.append("job", job);
        formElements.forEach(id => {
            //console.log('id: ', id);
            let input = document.getElementById(id);
            if (!input) return;
            if (input.type === "file" && input.files.length > 0) {
                formData.append(id, input.files[0]);
            } else if (input.tagName === "SELECT") {
                formData.append(id, input.value);
            } else {
                formData.append(id, input.value.trim());
            }
        });
        ajax_validate(formData, job, mode);
        return { data: formData, responseType: "json" };
    } else if (mode === 'folder_submission') {
        var inputId = formElements[0];
        let formData = new FormData();
        formData.append("backend_flag", 'multiple_files');
        formData.append("job", job);
        fileSelections[inputId].forEach(file => {
            formData.append("multiFiles", file, file.webkitRelativePath);
        });
        // Add Validation
        ajax_validate(formData, job, mode);
        return { data: formData, responseType: "json" };
    } else if (mode === 'folder_and_json') {
        var inputId = formElements[0];
        let formData = new FormData();
        formData.append("backend_flag", 'folder_and_json');
        formData.append("job", job);
        formElements.forEach(id => {
            let input = document.getElementById(id);
            if (!input) return;

            if (input.type !== "file" && input.tagName !== "SELECT") {
                formData.append(id, input.value.trim());
            } else if (input.type !== "file" && input.tagName === "SELECT") {
                formData.append(id, input.value);
            }
        });        
        fileSelections[inputId].forEach(file => {
            formData.append("multiFiles", file, file.webkitRelativePath);
        });
        // Add Validation
        ajax_validate(formData, job, mode);
        return { data: formData, responseType: "json" };
    }
}

// DON'T TOUCH
// All ajax requests are made through this function
function ajax_request(data, responseType, callback = null) {
    let endpoint = '/ajax_receive';
    let method = 'POST';

    return new Promise((resolve, reject) => {
        grecaptcha.ready(function() {
            grecaptcha.execute(public_key_app, {action: 'submit'}).then(function(token) {
                if (!(data instanceof FormData)) {
                    data = { ...data, token: token };
                } else {
                    data.append("token", token);
                }

                $.ajax({
                    type: method || "POST",
                    url: endpoint,
                    data: data instanceof FormData ? data : JSON.stringify(data),
                    contentType: data instanceof FormData ? false : "application/json",
                    processData: !(data instanceof FormData),
                    dataType: "json",
                    success: function(response) {
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        resolve(response); // 🔑 Return data for await
                    },
                    error: function(xhr, status, error) {
                        const response = { success: false, message: "Request failed: " + error };
                        console.error("AJAX Error:", status, error);
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        reject(response); // 🔑 Handle as async failure
                    }
                });
            }).catch(function(error) {
                const response = { success: false, message: "reCAPTCHA failed", error: error };
                console.error("reCAPTCHA failed:", error);
                if (callback) callback(response);
                reject(response);
            });
        });
    });
}

// USE THIS VERSION FOR GOOGLE RECAPTCHA
/*
function ajax_request(data, responseType, callback = null) {
    let endpoint = '/ajax_receive';
    let method = 'POST';

    return new Promise((resolve, reject) => {
        grecaptcha.ready(function() {
            grecaptcha.execute(public_key_app, {action: 'submit'}).then(function(token) {
                if (!(data instanceof FormData)) {
                    data = { ...data, token: token };
                } else {
                    data.append("token", token);
                }

                $.ajax({
                    type: method || "POST",
                    url: endpoint,
                    data: data instanceof FormData ? data : JSON.stringify(data),
                    contentType: data instanceof FormData ? false : "application/json",
                    processData: !(data instanceof FormData),
                    dataType: "json",
                    success: function(response) {
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        resolve(response); // 🔑 Return data for await
                    },
                    error: function(xhr, status, error) {
                        const response = { success: false, message: "Request failed: " + error };
                        console.error("AJAX Error:", status, error);
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        reject(response); // 🔑 Handle as async failure
                    }
                });
            }).catch(function(error) {
                const response = { success: false, message: "reCAPTCHA failed", error: error };
                console.error("reCAPTCHA failed:", error);
                if (callback) callback(response);
                reject(response);
            });
        });
    });
}
*/

function ajax_request(data, responseType, callback = null) {
    let endpoint = '/ajax_receive';
    let method = 'POST';
    console.log('ajax_request');
    return new Promise((resolve, reject) => {
        // reCAPTCHA temporarily disabled
        // grecaptcha.ready(function() {
        //     grecaptcha.execute(public_key_app, {action: 'submit'}).then(function(token) {
                if (!(data instanceof FormData)) {
                    data = { ...data /*, token: token */ };
                } else {
                    // data.append("token", token);
                }

                $.ajax({
                    type: method || "POST",
                    url: endpoint,
                    data: data instanceof FormData ? data : JSON.stringify(data),
                    contentType: data instanceof FormData ? false : "application/json",
                    processData: !(data instanceof FormData),
                    dataType: "json",
                    success: function(response) {
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        resolve(response);
                    },
                    error: function(xhr, status, error) {
                        const response = { success: false, message: "Request failed: " + error };
                        console.error("AJAX Error:", status, error);
                        ajax_handle(responseType, response);
                        if (callback) callback(response);
                        reject(response);
                    }
                });
        //     }).catch(function(error) {
        //         const response = { success: false, message: "reCAPTCHA failed", error: error };
        //         console.error("reCAPTCHA failed:", error);
        //         if (callback) callback(response);
        //         reject(response);
        //     });
        // });
    });
}