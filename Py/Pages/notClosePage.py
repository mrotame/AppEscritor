from flask import Flask, Blueprint, jsonify
from globalVars import GlobalVars
import os, time, sys

gv = GlobalVars()
notClose_page = Blueprint('notClosePage',__name__)

@notClose_page.route('/notClose', methods=['POST','GET'])
def show():
    gv.updateVar({'closing':False})
    return jsonify({'status':'success'})