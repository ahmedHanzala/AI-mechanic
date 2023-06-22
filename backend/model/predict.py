#predict
# import required libraries
import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv
import code
import glob
import os
import librosa
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.pyplot import specgram
import soundfile as sf
import queue
import pickle
import joblib



def extract_feature(file_name=None):
    if file_name: 
        #print('Extracting', file_name)
        X, sample_rate = sf.read(file_name, dtype='float32')
    else:  
        device_info = sd.query_devices(None, 'input')
        sample_rate = int(device_info['default_samplerate'])
        q = queue.Queue()
        def callback(i,f,t,s): q.put(i.copy())
        data = []
        with sd.InputStream(samplerate=sample_rate, callback=callback):
            while True: 
                if len(data) < 100000: data.extend(q.get())
                else: break
        X = np.array(data)

    if X.ndim > 1: X = X[:,0]
    X = X.T

    # short term fourier transform
    stft = np.abs(librosa.stft(X))

    # mfcc (mel-frequency cepstrum)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T,axis=0)

    # chroma
    chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T,axis=0)

    # melspectrogram
    #print(X)
    mel = np.mean(librosa.feature.melspectrogram(y=X, sr=sample_rate).T,axis=0)

    # spectral contrast
    contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T,axis=0)

    tonnetz = np.mean(librosa.feature.tonnetz(y=librosa.effects.harmonic(X), sr=sample_rate).T,axis=0)
    return mfccs,chroma,mel,contrast,tonnetz


def parse_predict_files(parent_dir,file_ext='*.ogg'):
    features = np.empty((0,193))
    filenames = []
    for fn in glob.glob(os.path.join(parent_dir, file_ext)):
        mfccs, chroma, mel, contrast,tonnetz = extract_feature(fn)
        ext_features = np.hstack([mfccs,chroma,mel,contrast,tonnetz])
        svm_model = joblib.load("air_rail.pkl")
        features = np.vstack([features,ext_features])
        predicted_labels = svm_model.predict(features)
        print(predicted_labels)
        print("H")
        filenames.append(fn)
       # print("extract %s features done" % fn)
    return np.array(features), np.array(filenames)

def predict_audio(path):
    features = np.empty((0,193))
    fn=path #filepath
    mfccs, chroma, mel, contrast,tonnetz = extract_feature(fn)
    ext_features = np.hstack([mfccs,chroma,mel,contrast,tonnetz])
    svm_model = joblib.load("backend\model\svm_model.pkl")
    features = np.vstack([features,ext_features])
    predicted_labels = svm_model.predict(features)
    print("PREDICTED LABELS: ",predicted_labels)
    return predicted_labels
    
# def main():
    # predict_audio('backend/audios/2.wav')
#     # Get features and labels

#     #record()
        
#     #features, filenames = parse_predict_files('./predict')
#     #ext_features = np.hstack([mfccs,chroma,mel,contrast,tonnetz])
#    # svm_model = joblib.load("svm_model.pkl")
#     #features = np.vstack([features,ext_features])
#     #predicted_labels = svm_model.predict(features)
#    # print(predicted_labels)

#     # Predict new
#    # features, filenames = parse_predict_files('predict')
#     ##np.save('predict_feat.npy', features)
#     #np.save('predict_filenames.npy', filenames)

# if __name__ == '__main__': main()
