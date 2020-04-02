from flask import Flask, Blueprint, request, jsonify, json
import os

savelocation = "/books"
open_page = Blueprint('openpage',__name__)
book_path = "./books/"

@open_page.route('/openpage', methods=['GET','POST'])
def show():
	if request.method == 'GET':
		for item in os.walk(book_path):
			books = item
			break
		return jsonify(books),201

	if request.method == 'POST':
		files = {}
		content = request.get_json()
		print(content)
		res = os.walk(book_path+content)
		for item in res:
			res = item[2]
			break
		count = 0
		for item in res:
			file = open(book_path+content+'/'+item,"r")
			tmp = file.read()
			tmp = tmp.split('*--__--*')
			files[count]= [tmp[0],tmp[1]]
			count += 1
		return jsonify(files),201
