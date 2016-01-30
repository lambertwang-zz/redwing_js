from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__, static_url_path = '', static_folder = '')
app.config['SECRET_KEY'] = 'dfghjkl'
socketio = SocketIO(app)

@socketio.on('message')
def handle_message(message):
	print('received message: ' + message)

@socketio.on('json')
def handle_json(json):
	print('received json: ' + str(json))

@socketio.on('my event')
def handle_my_custom_event(json):
	print('Received my event')
	print('received json: ' + str(json))

if __name__ == '__main__':
	socketio.run(app)

