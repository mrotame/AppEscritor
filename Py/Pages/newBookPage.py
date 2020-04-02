from flask import Flask, Blueprint, request, jsonify, json
from pathlib import Path
import os

savelocation = "/books"
newBook_page = Blueprint('newbookpage',__name__)

@newBook_page.route('/newbookpage', methods=['POST'])
def show():
	content = request.get_json()
	print(content)
	path = os.getcwd()+'/books'
	try:
		os.mkdir("./books/"+content['bookName'])
		return jsonify("ok"),201
	except OSError as exc:
		return jsonify('already exist'),201

	