from flask import Flask, Blueprint, jsonify
from globalVars import GlobalVars
import os, time, sys

gv = GlobalVars()
close_page = Blueprint('closePage',__name__)

@close_page.route('/close', methods=['POST','GET'])
def show():
    gv.updateVar({"closing":True})
    print("alterando bagaça")
    
    secsWait = 15
    for i in range(secsWait):
        print("Aguardando mais %s segundos" %(secsWait - i))
        if gv.getVar('closing') == False:
            break
        time.sleep(1)

    print(gv.getAllVars())
    if gv.getVar('closing') == True:
        print("FECHANDO!")
        os._exit(0)
    else:
        print("Não fechando!")

    return jsonify({'status':'success'}),201
