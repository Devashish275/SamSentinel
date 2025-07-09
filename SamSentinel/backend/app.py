from flask import Flask, request, jsonify
import base64
import numpy as np
import cv2
import torch

app = Flask(__name__)
model = torch.hub.load('ultralytics/yolov5', 'yolov5m', pretrained=True)  # or use your trained model

@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.get_json()
        image_b64 = data['image']
        image_data = base64.b64decode(image_b64)
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        # Debug: save image
        cv2.imwrite("received_image.jpg", img)

        results = model(img)
        detected_names = results.pandas().xyxy[0]['name'].tolist()
        print("Detected objects:", detected_names)

        return jsonify({'detected': detected_names})
    except Exception as e:
        print("Detection error:", str(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
