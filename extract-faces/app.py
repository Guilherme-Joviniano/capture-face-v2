from retinaface import RetinaFace
from deepface import DeepFace
from datetime import datetime
import cv2
import uuid
import time
import pandas as pd
import os 
import shutil

list_of_cams = pd.read_csv("CAMS.csv", sep=',')['IPv4 Address']
PASSWORD = ''

backends = [
    'opencv',
    'ssd',
    'dlib',
    'mtcnn',
    'retinaface',
    'mediapipe'
]


def get_save_image_of_cams(ips):
    for ip in ips:
        print(ip)
        try: 
            cap = cv2.VideoCapture()
            cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 3000)
            cap.open(f'rtsp://{ip}:8080/h264_ulaw.sdp')
            ret, cam = cap.read()
            if ret:
                cv2.imwrite(f'./cam/tmp/cam-{ip}.png', cam)
                time.sleep(0.5)
        except:
            continue


def detect_and_save_faces(image_path, ip):
    image = cv2.imread(image_path)
    faces = RetinaFace.detect_faces(img_path=image_path)
    try:
        for idx, _ in enumerate(faces):
            face = faces[f'face_{idx+1}']
            facial_area = face['facial_area']
            cv2.rectangle(image, (facial_area[2], facial_area[3]),
                        (facial_area[0], facial_area[1]), (255, 255, 0), 2)
            facial_img = image[facial_area[1]: facial_area[3],
                            facial_area[0]: facial_area[2]]
            e = datetime.now()
            print(
                f'./tmp/cam-{ip}-{str(e.day)}-{str(e.month)}-{str(e.year)}-{str(e.hour)}-{str(e.minute)}-{str(e.second)}.png')
            cv2.imwrite(
                f'./tmp/cam-{ip}-{str(e.day)}-{str(e.month)}-{str(e.year)}-{str(e.hour)}-{str(e.minute)}-{str(e.second)}.png', facial_img)
            time.sleep(1)
    except: 
        print('NO FACES DETECTED!')
        return False

def not_in_db():
    not_in_db = []
    for image in os.listdir('./tmp'):
        print(image)
        try:
            df = DeepFace.find(img_path = './tmp/' + image, 
                db_path = "../database", 
                detector_backend = backends[4],
                enforce_detection = False
            )
            try: 
                df.head()
            except: 
                not_in_db.append(image)
        except: 
            continue
    return not_in_db

get_save_image_of_cams(list_of_cams)

for image in os.listdir('./cam/tmp/'):
    ip = image.split('-')[1].split('png')[0][:-1]
    detect_and_save_faces('./cam/tmp/' + image, ip)

# TODO check in db and save!
files = not_in_db()

if len(files) > 0: 
    for file in files:
        shutil.move('./tmp/' + file, '../database/' + file)
    os.remove('../database/representations_vgg_face.pkl')
    

# TODO run every 30 seconds, and clean tmp folders

