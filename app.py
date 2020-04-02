import subprocess
from flask import Flask, render_template
from Py.Pages import savePage, newBookPage,openPage
app = Flask(__name__)
app.debug = True
app.secret_key = 'development key'


@app.route('/')
def hello():
	return render_template('index.html')

app.register_blueprint(savePage.save_page)
app.register_blueprint(newBookPage.newBook_page)
app.register_blueprint(openPage.open_page)

def Run():
	app.run()
	
if __name__ == "__main__":
	app.run()