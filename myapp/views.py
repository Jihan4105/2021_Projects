from django.shortcuts import render
import simplejson as json
from django.http import HttpResponse
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import numpy as np
import os
import csv
from django.conf import settings
from pandas.io.parsers import read_csv

def index(request):
    context = {}
    return render(request, 'index.html', context)

def predicting(request):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    vegitTitle = request.POST.get('vegitTitle')
    X = tf.placeholder(tf.float32, shape=[None, 4])
    Y = tf.placeholder(tf.float32, shape=[None, 1])
    W = tf.Variable(tf.random_normal([4,1]), name="weight")
    b = tf.Variable(tf.random_normal([1]), name="bias")

    hypothesis = tf.matmul(X, W) + b

    saver = tf.train.Saver()
    model = tf.global_variables_initializer()

    avg_temp = request.POST.get('avgTemp')
    min_temp = request.POST.get('minTemp')
    max_temp = request.POST.get('maxTemp')
    rain_fall = request.POST.get('rainFall')

    if vegitTitle=='GreenOnion':
        save_path = root_dir+'/../static/data/'+vegitTitle+'/GreenOnion_saved.cpkt'
    elif vegitTitle=='SweetPotato': 
        save_path = root_dir+'/../static/data/'+vegitTitle+'/SweetPotato_saved.cpkt'
    elif vegitTitle=='garlic': 
        save_path = root_dir+'/../static/data/'+vegitTitle+'/Garlic_saved.cpkt'
    elif vegitTitle=='chili': 
        save_path = root_dir+'/../static/data/'+vegitTitle+'/Chili_saved.cpkt'
    elif vegitTitle=='onion': 
        save_path = root_dir+'/../static/data/'+vegitTitle+'/Onion_saved.cpkt'


    with tf.Session() as sess:
        sess.run(model)
        
        saver.restore(sess, 'D:/PythonProject/VegitAI_Data/'+vegitTitle+'/GreenOnion_saved.cpkt')
        
        data=((avg_temp,min_temp,max_temp, rain_fall),)
        arr=np.array(data, dtype=np.float32)
        
        x_data = arr[0:4]
        dict = sess.run(hypothesis, feed_dict={X: x_data})
        context={'predictedPrice':str(dict[0][0])}

    sess.close()

    return HttpResponse(json.dumps(context), content_type="application/json")

