from flask import Flask, Blueprint, request, jsonify, json
import os.path, json, glob, shutil

saveLocation = "./books/"
save_page = Blueprint('savepage',__name__)

@save_page.route('/savepage', methods=['POST'])
def show():
	newdata = {"oi":"Oi"}    #empty dict to store data
	content = request.get_json()
	if content['bookName']=="":
		print('hey, undefined')
		return jsonify('Error undefined'),201

	book_path = saveLocation+content['bookName']+'/'

	# Clear folder
	try:
		shutil.rmtree(book_path)
	except FileNotFoundError:
		pass
	os.mkdir(saveLocation+content['bookName'])
	# Create chapters folders
	capNums = 0
	
	for item in content['capitulos']:
		chapterFolder = saveLocation+content['bookName']+'/'+str(capNums)+"-"+content['capitulos'][item]['nome']
		os.mkdir(chapterFolder)

		for ses in content['capitulos'][item]['conteudo']:
			file = open(chapterFolder+'/'+ses+'-'+content['capitulos'][item]['conteudo'][ses]['nome']+'.txt','w')
			file.write(content['capitulos'][item]['conteudo'][ses]['texto'])
			file.close()
		capNums += 1
	'''
	sesNums = 0
	Create sessions
		#print(content['capitulos'][item])
		file = open(book_path+item+" - "+content['capitulos'][item][0]+'.txt','w')
		file.write(''%s*--__--*'%(content['capitulos'][item][0]))
		file.write('%s'%(content['capitulos'][item][1]))
		file.close()
		sesNums += 1
	'''
	return jsonify({'result':'success'}),201

	
