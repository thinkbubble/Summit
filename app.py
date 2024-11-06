from flask import Flask, render_template, send_from_directory, request
from summit import summit


app = Flask(__name__)


@app.route('/summit/<path:filename>')
def summit_static(filename):
    return send_from_directory('summit', filename)



# EDIT ANYTHING YOU WANT AFTER HERE

@app.route('/documentation')
def documentation():
    page = request.args.get('page', 'documentation')
    return render_template('index.html', page=page)

@app.route('/')
def home():
    page = request.args.get('page', 'home')
    return render_template("index.html", page=page)


if __name__ == '__main__':
    app.run(debug=True)
