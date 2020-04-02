from flask import Flask, Blueprint, request, jsonify, json
import os.path

savelocation = "/books"
save_page = Blueprint('savepage',__name__)

@save_page.route('/savepage', methods=['POST'])
def show():
	newdata = {"oi":"Oi"}    #empty dict to store data
	content = request.get_json()
	if content['bookName']=="":
		print('hey, undefined')
		return jsonify('Error undefined'),201

	book_path = "./books/"+content['bookName']+'/'
	capNums = 0
	print(content)
	for item in content['capitulos']:
		print(content['capitulos'][item])
		capNums += 1
		file = open(book_path+item+'.txt','w')
		file.write('''%s*--__--*'''%(content['capitulos'][item][0]))
		file.write('%s'%(content['capitulos'][item][1]))
		file.close()

	return jsonify(newdata),201