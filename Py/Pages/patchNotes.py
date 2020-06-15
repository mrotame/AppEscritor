from flask import Flask, Blueprint, request, jsonify, json, render_template
import os

savelocation = "/books"
patchNotes_page = Blueprint('patchNotespage',__name__)
book_path = "./books/"

@patchNotes_page.route('/patchNotes', methods=['GET','POST'])
def show():
    return render_template('PatchNotes/0.2.html')