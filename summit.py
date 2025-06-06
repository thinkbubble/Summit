
from flask import request, jsonify, stream_with_context
from cryptography.fernet import Fernet
from dotenv import load_dotenv
from datetime import datetime, timezone
from urllib.parse import urlparse
import mimetypes
import requests
import hashlib
import random
import string
import gevent
import base64
import pytz
import time
import json
import csv
import re
import os



load_dotenv()



# 🌟 This file is where you will add all your code that does 
# 🌟 actual work. Only handle your routing in app.py


# 🌟 This is where you will add logic to handle your 
# 🌟 backend. Think of matching the backend_flag and job 
# 🌟 as routes in vanilla flask. You pass these from the front end
# 🌟 and they are handled here.
def ajax_process(file, backend_flag, job, data=False):
    print('ajax_process')

    match backend_flag:
        # 🌟 
        case 'simple_post':
            match job:
                # ✅
                case 'ping':
                    return handle_ping(backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for simple_post", {}, backend_flag, job)

        # 🌟
        case 'json_only':
            if not isinstance(file, dict):
                return ajax_responses(False, "Invalid JSON data", {}, backend_flag, job)
            match job:
                # ✅
                case "json_1":
                    return process_json_1(file, backend_flag, job)
                # ✅
                case "login101":
                    return process_login(file, backend_flag, job)
                # ✅
                case "simpleForm102":
                    return process_simple_form(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for JSON processing", {}, backend_flag, job)
        # 🌟
        case 'single_file':
            match job:
                # ✅
                case 'firstFile':
                    return process_single_file(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for single file upload", {}, backend_flag, job)
        # 🌟
        case 'single_file_and_json':
            match job:
                # ✅
                case 'testing_single_file_with_json':
                    return process_file_and_json(file, data, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for single_file_and_json", {}, backend_flag, job)
        # 🌟
        case 'multiple_files':
            match job:
                # ✅
                case 'firstFolder':
                    return process_multiple_files(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for multiple files", {}, backend_flag, job)
        # 🌟
        case 'folder_and_json':
            match job:
                # ✅
                case 'testing_folder_with_json':
                    return process_folder_and_json(file, data, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return ajax_responses(False, "Invalid job for folder_and_json", {}, backend_flag, job)
        # 🌟
        case _:
            return ajax_responses(False, "Invalid backend flag", {}, backend_flag, job)


def ajax_responses(success, message, payload, backend_flag, job):

    base_response = {
        "success": success,
        "message": message,
        "backend_flag": backend_flag,
        "job": job,
    }

    # Merge in any extra payload
    if payload:
        base_response.update(payload)

    # Route to appropriate status code
    match backend_flag:
        case 'simple_post':
            match job:
                case 'ping':
                    return jsonify(base_response), 200 if success else 400
                case _:
                    return jsonify(base_response), 400

        case 'json_only':
            match job:
                case "json_1":
                    return jsonify(base_response), 200 if success else 400
                # ✅
                case "login101":
                    return jsonify(base_response), 200 if success else 400
                # ✅
                case "simpleForm102":
                    return jsonify(base_response), 200 if success else 400
                case _:
                    return jsonify(base_response), 400

        case 'single_file':
            match job:
                case _:
                    return jsonify(base_response), 400

        case 'single_file_and_json':
            match job:
                case _:
                    return jsonify(base_response), 400

        case 'folder_submission':
            match job:
                case _:
                    return jsonify(base_response), 400

        case 'folder_and_json':
            match job:
                case _:
                    return jsonify(base_response), 400

        case _:
            return jsonify(base_response), 400



# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


OMNEXUS_URL = os.getenv("OMNEXUS_URL")
OMNEXUS_KEY = os.getenv("OMNEXUS_KEY")
# CREATE YOUR KEY AND STORE PUBLIC in global public_key_app
# Select v3 recaptcha key from Google
# https://www.google.com/recaptcha/admin/create
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')

# Omnexus API Configuration
# Receive your key at https://www.omnexus.ai
# For any organizational needs, passwords, keys
# Database interactions, etc. Use Omnexus API


def omnexus_request(namespace, endpoint, params=None, files=None, method="POST"):
    """
    General function to interact with Omnexus API.

    :param namespace: The namespace ('minio', 'mongo', 'ai').
    :param endpoint: The specific endpoint within the namespace.
    :param params: Dictionary of parameters for the request.
    :param files: Dictionary or list of files to upload (for MinIO actions).
    :param method: HTTP method ('POST' only).
    :return: Dictionary with API response.
    """

    headers = {"Content-Type": "application/json"}
    
    # Base data payload
    data = {
        "api_key": OMNEXUS_KEY,
        "namespace": namespace,
        "endpoint": endpoint,
        "params": params or {}
    }

    try:
        # If files are included, send as multipart/form-data
        if files:
            response = requests.post(OMNEXUS_URL, files=files, data=data)
        else:
            response = requests.post(OMNEXUS_URL, json=data)

        # Attempt to parse JSON response
        return response.json()
    
    except requests.exceptions.JSONDecodeError:
        return {"error": "Invalid JSON response", "response_text": response.text}
    
    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}


def verify_recaptcha(token):
    # Verify reCAPTCHA token with Google
    print('verify_recaptcha')
    recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
    response = requests.post(recaptcha_url, data={
        "secret": RECAPTCHA_SECRET_KEY,
        "response": token
    })
    result = response.json()
    print('verify_recaptcha: ', result.get("success"))
    return result.get("success", False)


# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


# 🌟 Make sure all function responses are packaged in the following format:
# 🌟 {"success": True/False, "backend_flag": backend_flag, "job": job, "message": "Your message", "additional_data": "Add as many as you need"}, 200/300/400/etc.
# 🌟 This makes it easier to integrate with full communication pipeline.


email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"


def handle_ping(backend_flag, job):

    # ✅ Here you can do stuff (access database, api calls, etc) to package json for return
    
    return ajax_responses(True, "Pong", {}, backend_flag, job)
    #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Pong!"}, 200

def process_json_1(file, backend_flag, job):

    username = file.get("username", "").strip()
    email = file.get("email", "").strip()

    if not username or not email:
        return ajax_responses(False, "Missing required fields (username, email).", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    # ✅ Here you can do stuff with your json
    return ajax_responses(True, "JSON processed successfully", {"username": username, "email": email}, backend_flag, job)
    #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "JSON processed successfully", "username": username, "email": email}, 200

def process_login(file, backend_flag, job):
    print('process_login')
    STORED_EMAIL = "test@test.com"
    STORED_PASSWORD = "password"

    password = file.get("password101", "").strip()
    email = file.get("email101", "").strip()

    if not email or not password:
        return ajax_responses(False, "Email and password required.", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Email and password required."}, 400

    # ✅ Here you can do stuff with your json

    if email == STORED_EMAIL and password == STORED_PASSWORD:
        print('true email and password')
        return ajax_responses(True, "Login successful!", {"name": "Hello Summit..."}, backend_flag, job)
        #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Login successful!", "name": "Hello Summit..."}, 200
    else:
        return ajax_responses(False, "Invalid email or password.", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email or password."}, 401


def process_simple_form(file, backend_flag, job):

    the_text = file.get("text102", "").strip()
    email = file.get("email102", "").strip()
    the_number = file.get("number102", "").strip()
    the_textarea = file.get("textarea102", "").strip()
    the_select = file.get("select102", "").strip()
    the_radio = file.get("radio102", "").strip()
    the_checkbox = file.get("checkbox102", "").strip()
    print(the_text)

    return ajax_responses(True, "Simple Form Submission successful!", {"name": the_text}, backend_flag, job)
    #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Simple Form Submission successful!", "name": the_text}, 200




def process_single_file(file, backend_flag, job):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)

    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        return ajax_responses(False, f"Invalid file type: {file.filename}", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": f"Invalid file type: {file.filename}"}, 400

    file.save(save_path)

    # ✅ Here you can do stuff with the uploaded file
    return ajax_responses(True, "File uploaded successfully", {"filename": file.filename}, backend_flag, job)
    #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "File uploaded successfully", "filename": file.filename}, 200


def process_multiple_files(files, backend_flag, job):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    saved_files = []

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

    for f in files:
        file_extension = os.path.splitext(f.filename)[1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            return ajax_responses(False, f"Invalid file type: {file_extension}", {}, backend_flag, job)
            #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": f"Invalid file type: {file_extension}"}, 400

    for f in files:
        if f.filename == '':
            continue  

        relative_path = request.form.get(f"{f.filename}_path", f.filename)
        save_path = os.path.join(UPLOAD_FOLDER, relative_path)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        f.save(save_path)
        saved_files.append(relative_path)

    if not saved_files:
        return ajax_responses(False, "No valid files uploaded", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "No valid files uploaded"}, 400

    # ✅ Here you can do stuff with the uploaded folder
    return ajax_responses(True, "Files uploaded successfully", {"filenames": saved_files}, backend_flag, job)
    #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Files uploaded successfully", "filenames": saved_files}, 200


def process_file_and_json(file, data, backend_flag, job):

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return ajax_responses(False, "Missing required fields (username, email).", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return ajax_responses(False, "Invalid email format.", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email format."}, 400

    the_response_file = process_single_file(file)

    # ✅ Here you can do stuff with the uploaded file and json

    if the_response_file["success"] == True:
        return ajax_responses(True, "Completed single file and json processing...", {}, backend_flag, job)
        #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Completed single file and json processing..."}, 200
    else:
        return ajax_responses(False, "Single file and json processing Failed...", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Single file and json processing Failed..."}, 400

def process_folder_and_json(files, data, backend_flag, job):
    
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return ajax_responses(False, "Missing required fields (username, email).", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return ajax_responses(False, "Invalid email format.", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email format."}, 400

    the_response_folder = process_multiple_files(files)

    # ✅ Here you can do stuff with the uploaded folder and json

    if the_response_folder["success"] == True:
        return ajax_responses(True, "Completed single file and json processing...", {}, backend_flag, job)
        #return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Completed single file and json processing..."}, 200
    else:
        return ajax_responses(False, "Single file and json processing Failed...", {}, backend_flag, job)
        #return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Single file and json processing Failed..."}, 400


# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


# Build supporting functions here

# Choose a random integer between two points
def choose_random_integer(start, end):
    return random.randint(start, end)


# Chooses a random item from a list
def choose_random_item(item_list):

    if not item_list:
        return None  # Return None if the list is empty
    return random.choice(item_list)


def hash_password(password):

    salt = "your_hash"
    salt = bytes(salt, 'utf-8')

    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100000,
        dklen = 32
    )
    return str(key)

def get_current_timestamp_new_york():
    time_zone_new_york = pytz.timezone('America/New_York')
    now = datetime.now(time_zone_new_york)
    timestamp = int(round(now.timestamp()))
    timestamp = str(timestamp)
    return timestamp

def encrypt_user_id(user_id, application_key):
    
    load_dotenv()
    string_key = os.getenv(application_key)

    # Decode the Base64 string to bytes
    key = base64.urlsafe_b64decode(string_key.encode('utf-8'))

    # Initialize the cipher system
    cipher = Fernet(key)
    """Encrypts a user ID."""
    # Ensure user_id is a string, encode to bytes
    user_id_bytes = user_id.encode('utf-8')
    encrypted_user_id = cipher.encrypt(user_id_bytes)
    return encrypted_user_id.decode('utf-8')  # Return as string for easier storage and transmission


def decrypt_user_id(encrypted_user_id, application_key):

    load_dotenv()
    string_key = os.getenv(application_key)
    
    # Decode the Base64 string to bytes
    key = base64.urlsafe_b64decode(string_key.encode('utf-8'))

    # Initialize the cipher system
    cipher = Fernet(key)
    """Decrypts an encrypted user ID."""
    # Encrypted user_id needs to be bytes, but is stored/transferred as string, so decode it back to bytes
    encrypted_user_id_bytes = encrypted_user_id.encode('utf-8')
    decrypted_user_id_bytes = cipher.decrypt(encrypted_user_id_bytes)
    return decrypted_user_id_bytes.decode('utf-8') # Once returned convert to ObjectId(this)

