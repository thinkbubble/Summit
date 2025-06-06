from flask import Flask, render_template, send_from_directory
from flask import redirect, url_for
#from dotenv import load_dotenv
from summit import *
import re
import os



app = Flask(__name__)



# Make sure you return a page='something' when you need to 
# render_template. Most routing should happen on front end
# This is just to start it off and in unique situations you need to route to server
# Almost all interaction with the server should happen through AJAX
@app.route('/')
def home():
    
    if 'page' not in request.args:
        # Redirect to the URL with the query parameter attached
        return redirect(url_for('home', page='home'))
    
    page = request.args.get('page')
    return render_template("index.html", page=page)





# 🌟 DON'T TOUCH THIS
# 🌟 YOU CAN COMMENT OUT PRINT STATEMENTS, but logic 
# 🌟 is needed. You handle your logic for different  
# 🌟 backend_flags and jobs in ajax_process
@app.route('/ajax_receive', methods=['POST'])
def ajax_receive():
    
    #Handles both file and JSON uploads by checking backend_flag.
    print('receive')
    # Determine if request is JSON or FormData
    if request.content_type.startswith('application/json'):
        try:
            data = request.get_json()
        except:
            return ajax_responses(False, "Invalid JSON format", {}, False, False)
            #return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Invalid JSON format"}), 400

    elif request.content_type.startswith('multipart/form-data'):
        # Extract JSON-like fields from FormData
        data = request.form  
    else:
        return ajax_responses(False, "Unsupported content type", {}, False, False)
        #return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Unsupported content type"}), 400



    # $$$$ UNCOMMENT IF YOU WANT TO USE GOOGLE RECAPTCHA
    # Condition 1: Ensure token is present
    #token = data.get("token")
    #print("token: ", token)

    #if not token or not verify_recaptcha(token):
    #    return jsonify({"success": False, "backend_flag": False, "job": False, "message": "reCAPTCHA validation failed"}), 400
    # $$$$ UNCOMMENT IF YOU DON'T WANT TO USE GOOGLE RECAPTCHA

    backend_flag = data['backend_flag']
    job = data['job']
    print('bf: ', backend_flag)
    print('job: ', job)

    # Condition 2: Ensure backend_flag is present
    if 'backend_flag' not in data:
        return ajax_responses(False, "Missing backend_flag", {}, False, False)
        #return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Missing backend_flag"}), 400
    elif 'job' not in data:
        return ajax_responses(False, "Missing job", {}, backend_flag, False)
        #return jsonify({"success": False, "backend_flag": backend_flag, "job": False, "message": "Missing job"}), 400

    

    if backend_flag == 'simple_post':

        return ajax_process(data, backend_flag, job)

    elif backend_flag == 'json_only':

        return ajax_process(data, backend_flag, job)

    elif backend_flag == 'single_file':
        print('single file')
        if not request.files or len(request.files) != 1 or 'singleFile' not in request.files:
            return ajax_responses(False, "Invalid upload: Only one file allowed", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFile']

        if file.filename == '':
            return ajax_responses(False, "No selected file", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No selected file"}), 400

        # Forward file to processing function
        return ajax_process(file, backend_flag, job)
        #return jsonify(ajax_process(file, backend_flag, job))

    elif backend_flag == 'single_file_and_json':
        print('single and json')
        if not request.files or len(request.files) != 1 or 'singleFileWithJson' not in request.files:
            return ajax_responses(False, "Invalid upload: Only one file allowed", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFileWithJson']

        if file.filename == '':
            return ajax_responses(False, "No selected file", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No selected file"}), 400

        # Forward file to processing function
        return ajax_process(file, backend_flag, job, data)
    
    elif backend_flag == 'multiple_files':
        print('multiple files (folder)')
        # Extract multiple files
        files = request.files.getlist('multiFiles')  
        if not files:
            return ajax_responses(False, "No valid files found in request", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No valid files found in request"}), 400
        return ajax_process(files, backend_flag, job)

    elif backend_flag == 'folder_and_json':
        print('folder and json')
        files = request.files.getlist('multiFiles')  # Extract multiple files
        if not files:
            return ajax_responses(False, "No valid files found in request", {}, backend_flag, job)
            #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No valid files found in request"}), 400
        return ajax_process(files, backend_flag, job, data)

    # Future conditions can be added here for different backend_flag values
    return ajax_responses(False, f"Invalid backend_flag value: {backend_flag}", {}, backend_flag, job)
    #return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": f"Invalid backend_flag value: {backend_flag}"}), 400




if __name__ == '__main__':
    app.run(debug=True, port=5089)
