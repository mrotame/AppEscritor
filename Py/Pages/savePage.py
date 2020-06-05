from flask import Flask, Blueprint, request, jsonify, json
import os.path, json, glob

savelocation = "/books"
save_page = Blueprint('savepage',__name__)

@save_page.route('/savepage', methods=['POST'])
def show():
	content = request.get_json()
	if content['bookName']=="":
		print('hey, undefined')
		return jsonify('Error undefined'),201

	book_path = "./books/"+content['bookName']+'/'

	# Clear folder
	path_to_dir  = book_path	  # path to directory you wish to remove
	files_in_dir = os.listdir(path_to_dir)     # get list of files in the directory

	for file in files_in_dir:                  # loop to delete each file in folder
		os.remove(f'{path_to_dir}/{file}')     # delete file   

	
	capNums = 0
	#print(content)
	for item in content['capitulos']:
		#print(content['capitulos'][item])
		capNums += 1
		file = open(book_path+item+" - "+content['capitulos'][item][0]+'.txt','w')
		file.write('''%s*--__--*'''%(content['capitulos'][item][0]))
		file.write('%s'%(content['capitulos'][item][1]))
		file.close()

	return jsonify({'result':'success'}),201
	
'''	file = open(book_path+"info.txt",'w')
	a = []
	for item in content['capitulos']:
		a.append(item)
	file.write(json.dumps(a))
	file.close()'''

	