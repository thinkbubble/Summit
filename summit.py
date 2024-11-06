


from email.mime.multipart import MIMEMultipart
from cryptography.fernet import Fernet
from email.mime.text import MIMEText
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
from io import BytesIO
import subprocess
import requests
import hashlib
import smtplib
import string
import random
import base64
import pytz
import csv
import os




def access_database(collection, action, data, database='test_database', new_values='', projection=''):

    client = MongoClient('localhost', 27018)

    db = client[database]

    this_collection = db[collection]

    if action == 'insert':

        try:
            this_insertion = this_collection.insert_one(data)
            this_id = this_insertion.inserted_id
            #print('this_id: ', this_id)
            return this_id
        except:
            return False
        
    elif action == 'select':
        try:
            document = this_collection.find_one(data)
            print('select_results: ', document)
            return document
        except:
            return False
        
    elif action == 'select_with_projection':
        try:
            document = this_collection.find_one(data, projection)
            print('select_results: ', document)
            return document
        except:
            return False
        
    elif action == 'select_all':
        try:
            documents = this_collection.find(data)
            print('select_results: ', documents)
            return documents
        except:
            return False
        
    elif action == 'delete':

        try:
            #results = this_collection.delete_one({'username': ''})
            results = this_collection.delete_one(data)
            return True
        except:
            return False

    elif action == 'aggregate':
        
        try:
            results = this_collection.aggregate(data)
            return results
        except:
            return False

    elif action == 'update':

        try:
            this_update = this_collection.update_one(data, new_values)
            return True
        except:
            return False



def verify_recaptcha(response, secret_key=None):
    
    if secret_key == None:
        load_dotenv()
        """ Verify reCAPTCHA response with Google. """
        secret_key = os.getenv('RECAPTCHA_SECRET_KEY')

    data = {
        'secret': secret_key,
        'response': response
    }
    r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
    result = r.json()
    return result.get('success', False)



def hash_password(password, salt="@\x06\xd1\x06~\xba&\xd6\x8a\x9f\x9d![c\xf4\xc81\xfcD\xdc\xdb\xaa\x0b2p\xc9kX\x17\xfc&/"):

    salt = "@\x06\xd1\x06~\xba&\xd6\x8a\x9f\x9d![c\xf4\xc81\xfcD\xdc\xdb\xaa\x0b2p\xc9kX\x17\xfc&/"
    salt = bytes(salt, 'utf-8')

    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100000,
        dklen = 32
    )
    return str(key)



def hash_session(unhashed_session, session_salt='\xd2%\xc2\x1b\xce0cj\xec\x1bd\xb1\x8c\xac#dSqQ\x87P\xd1\x8dIr\x01TI\xf6(\xa9\xbe'):
    
    session_salt = bytes(session_salt, 'utf-8')

    session_key = hashlib.pbkdf2_hmac(
        'sha256',
        unhashed_session.encode('utf-8'),
        session_salt,
        100000,
        dklen = 32
    )
    return str(session_key)



def generate_random_image_key(N=42):

    result = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k=N))
    return result


    
def generate_random_session_key(N=35):

    result = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation, k=N))
    #print('key: ', result)
    result = result.replace('"', '*')
    result = result.replace("'", '&')
    result = result.replace("/", '$')
    result = result.replace("/", "u")
    result = result.replace(")", "r")
    result = result.replace("(", "v")
    result = result.replace(";", "g")
    result = result.replace(",", "W")
    result = result.replace("\\", "9")
    print('password: ', result)
    print('password length: ', len(result))
    return result



# Returns a list of all the timezones offered

def get_all_timezones():
    timezones = []
    for timezone in pytz.all_timezones:
        timezones.append(timezone)
    return timezones

# Pass in your timezone that you chose from get_all_timezones for your application

def get_current_timestamp(timezone):
    time_zone = pytz.timezone(timezone)
    now = datetime.now(time_zone)
    timestamp = int(round(now.timestamp()))
    timestamp = str(timestamp)
    return timestamp


"""

To get your application key:
load_dotenv()
application_key = os.getenv(application_key)
encrypt_user_id(user_id, application_key)

"""


def encrypt_user_id(user_id, application_key):

    # Decode the Base64 string to bytes
    key = base64.urlsafe_b64decode(application_key.encode('utf-8'))
    # Initialize the cipher system
    cipher = Fernet(key)
    """Encrypts a user ID."""
    # Ensure user_id is a string, encode to bytes
    user_id_bytes = user_id.encode('utf-8')
    encrypted_user_id = cipher.encrypt(user_id_bytes)
    return encrypted_user_id.decode('utf-8')  # Return as string for easier storage and transmission


"""

To get your application key:
load_dotenv()
application_key = os.getenv(application_key)
decrypt_user_id(user_id, application_key)

"""

def decrypt_user_id(encrypted_user_id, application_key):
    
    # Decode the Base64 string to bytes
    key = base64.urlsafe_b64decode(application_key.encode('utf-8'))
    # Initialize the cipher system
    cipher = Fernet(key)
    """Decrypts an encrypted user ID."""
    # Encrypted user_id needs to be bytes, but is stored/transferred as string, so decode it back to bytes
    encrypted_user_id_bytes = encrypted_user_id.encode('utf-8')
    decrypted_user_id_bytes = cipher.decrypt(encrypted_user_id_bytes)
    return decrypted_user_id_bytes.decode('utf-8') # Once returned convert to ObjectId(this)



def generate_random_password_reset_key(N=35):

    result = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation, k=N))
    result = result.replace('"', '*')
    result = result.replace("'", '&')
    result = result.replace("/", '$')
    result = result.replace("/", "u")
    result = result.replace(")", "r")
    result = result.replace("(", "v")
    result = result.replace(";", "g")
    result = result.replace(",", "W")
    result = result.replace("\\", "9")

    return result


"""
    
    subject = "Testing Password Reset"
    email_address = 'testing@gmail.com' -> Where you're sending email to
    subject = 'Your subject line for email'
    flask_endpoint_for_reset = 'https://www.testing.com/password_reset'  -> You need to create this in app.py
    collection = 'your_collection'
    database = 'your_database'
    timezone = 'America/New_York'   -> use get_all_timezones to find yours

    load_dotenv()
    SMTP_SERVER = os.getenv('SMTP_SERVER')
    SMTP_PORT = int(os.getenv('SMTP_PORT'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')

"""


def send_password_reset_email(email_address, subject, flask_endpoint_for_reset, collection, database, timezone, SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD):

    try:
        subject = subject
        code = generate_random_password_reset_key()
        link = flask_endpoint_for_reset
        body = "Password Reset Code: \n{}\n\n(Copy this code and paste it in the form after you click on the link below)\n\nLink: {}\n\n".format(code, link)

        code = hash_session(code)
        time_stamp = get_current_timestamp(timezone)
        this_password_reset = {
            "code": code,
            "email": email_address,
            "time_stamp": time_stamp
        }

        password_reset_id = access_database(collection, 'insert', this_password_reset, database)
        
        RECIPIENT_EMAIL = email_address

        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, RECIPIENT_EMAIL, msg.as_string())
            server.quit()
            return True, password_reset_id
        except Exception as e:
            print("Error sending email:", str(e))
            return False, ''
        
    except:
        return False, ''



def choose_random_integer(start, end):
    return random.randint(start, end)

