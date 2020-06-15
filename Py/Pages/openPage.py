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
		book = {'Nome':content,'capitulos':[]}

		c = 0
		for item in res:
			print(item)
			if c == 0:
				for name in item[1]:
					temp = name.split('-')
					book['capitulos'].append({'nome':temp[1],'conteudo':[]})
			else:
				for txt in item[2]:
					file = open(item[0]+'/'+txt)
					name = ((os.path.basename(file.name)).split('-')[1]).split('.')[0]
					print(name)
					print(c)
					book['capitulos'][c-1]['conteudo'].append({'nome':name, 'texto':file.read()})

			c += 1
		print(book)

		return jsonify(book),201
