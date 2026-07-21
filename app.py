from flask import Flask, render_template, request,redirect, url_for, flash
import numpy as np
from PIL import Image
from joblib import load
import tensorflow as tf
import pickle
import base64
import io
import time


from keras.models import load_model
model = load_model('Custom_CNN_Model.h5')


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:

        time.sleep(2)

        img_file = request.files['photo']
        img = Image.open(img_file.stream)
        img = img.resize((512, 512))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)

        print(predicted_class)

        label_names = ['high', 'low', 'medium']
        predicted_class_label = label_names[predicted_class.item()]
        finalresult = predicted_class_label

        # label_names = ['high', 'low', 'medium']
        if predicted_class in [0, 1, 2]:
            predicted_class_label = label_names[predicted_class.item()]

        # Construct final result string with percentages of all classes
            result_string = ""
            for i in range(len(label_names)):
                class_prob = prediction[0][i]
                class_label = label_names[i]
                if class_prob >= 0.01:
                    result_string += f"{class_label}: {class_prob*100:.2f}%, "
            
            fullfinalresult = result_string[:-2]  # Remove trailing comma and space
        else:
            fullfinalresult = "Category not found in prediction code"

    


        img_buffer = io.BytesIO()
        img.save(img_buffer, format='PNG')
        img_str = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
        return render_template('index.html', finalResult=finalresult,imgData=img_str,fullfinalResult=fullfinalresult)
        
    except Exception as e:
        msg="not an arecanut image"
        return render_template('index.html', errorMessage=msg)
   

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)

