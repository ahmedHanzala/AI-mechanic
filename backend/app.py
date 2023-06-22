from flask import Flask, request, jsonify
from model.predict import predict_audio
import json
import io
import wave
import base64
from pydub import AudioSegment



app = Flask(__name__)

def base64_to_wav(base64_audio, output_path):
    # Convert base64 audio to bytes
    audio_bytes = base64.b64decode(base64_audio)

    # Open bytes as a stream
    audio_stream = io.BytesIO(audio_bytes)

    # Load the audio stream as an AudioSegment
    audio_segment = AudioSegment.from_file(audio_stream, format='mp4')

    # Set the desired sampling rate to 44100
    desired_sampling_rate = 44100

    # Check if the current sampling rate is different from the desired one
    if audio_segment.frame_rate != desired_sampling_rate:
        # Resample the audio segment to the desired sampling rate
        audio_segment = audio_segment.set_frame_rate(desired_sampling_rate)

    # Export the AudioSegment as a WAV file with the desired sampling rate
    audio_segment.export(output_path, format='wav')
                

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    if len(request.data) == 0 :
        return 'No audio file provided', 400
    decoded = request.data.decode('utf-8')
    audio_data = json.loads(decoded)
    decoded_audio_data = base64.b64decode(audio_data['data'])   
    output_file = 'backend/audios/output.wav'   
    
    
    base64_to_wav(audio_data['data'], output_file)
    prediction = predict_audio(output_file)
    prediction = prediction.tolist()
    
    print("prediction is",prediction)
    
    return {'labels': json.dumps(prediction) }

@app.route('/get-prediction', methods=['GET'])
def get_prediction():
    # Process data, perform SVM prediction, or retrieve any necessary information

    # Example response with a prediction string
    prediction = 'This is the predicted label'

    # Return the prediction string to the frontend
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
