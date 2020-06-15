from flask import Flask, Blueprint, jsonify, request
from globalVars import GlobalVars
import shutil

book_path = "./books/"

gv = GlobalVars()
deleteBook_page = Blueprint('deleteBookPage',__name__)

@deleteBook_page.route('/deleteBook', methods=['POST'])
def show():
    content = request.get_json()
    print("Deletado livro")
    print(content)
    shutil.rmtree(book_path+content)
    return jsonify({'success':'Ok'}),201