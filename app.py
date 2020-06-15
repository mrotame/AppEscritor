import subprocess, webbrowser
from flask import Flask, render_template
from Py.Pages import savePage, newBookPage, openPage, closePage, deleteBook, notClosePage,patchNotes
from globalVars import GlobalVars
import win32gui
import win32.lib.win32con as win32con
import time

app = Flask(__name__)
app.debug = True
app.secret_key = 'development key'
gv = GlobalVars()

@app.route('/')
def hello():
	gv.updateVar({'closing':False})
	print("Carregando index.")
	return render_template('index.html')

app.register_blueprint(savePage.save_page)
app.register_blueprint(newBookPage.newBook_page)
app.register_blueprint(openPage.open_page)
app.register_blueprint(notClosePage.notClose_page)
app.register_blueprint(closePage.close_page)
app.register_blueprint(deleteBook.deleteBook_page)
app.register_blueprint(patchNotes.patchNotes_page)

def Run():
	print('run')
	app.run(use_reloader=False)
	
if __name__ == "__main__":
	devMode = False
	gv.setOrUpdateVar({'closing':False})

	if devMode != True:
		the_program_to_hide = win32gui.GetForegroundWindow()
		win32gui.ShowWindow(the_program_to_hide , win32con.SW_HIDE)
		time.sleep(1)

		# Abre novegador só uma vez
		webbrowser.open('http://localhost:5000/', new=2)

		app.run(use_reloader=False)
	else:
		app.run()