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

    base_dir = getattr(settings, "BASE_DIR", None)
    if vegitTitle=='GreenOnion':
        save_path = os.path.join(base_dir, "static/data/greenOnion/GreenOnion_saved.cpkt")
    elif vegitTitle=='SweetPotato': 
        save_path = os.path.join(base_dir, "static/data/sweetPotato/SweetPotato_saved.cpkt")
    elif vegitTitle=='garlic': 
        save_path = os.path.join(base_dir, "static/data/garlic/Garlic_saved.cpkt")
    elif vegitTitle=='chili': 
        save_path = os.path.join(base_dir, "static/data/chili/Chili_saved.cpkt")
    elif vegitTitle=='onion': 
        save_path = os.path.join(base_dir, "static/data/onion/Onion_saved.cpkt")


    with tf.Session() as sess:
        sess.run(model)
        
        saver.restore(sess, save_path)
        
        data=((avg_temp,min_temp,max_temp, rain_fall),)
        arr=np.array(data, dtype=np.float32)
        
        x_data = arr[0:4]
        dict = sess.run(hypothesis, feed_dict={X: x_data})
        context={'predictedPrice':str(dict[0][0])}
    return HttpResponse(json.dumps(context), content_type="application/json")

def training(request):
    print("!")
    vegitTitle = request.POST.get('vegitTitle')
    fileName = request.POST.get('fileName')

    model = tf.global_variables_initializer()

    data = read_csv('static/data/'+vegitTitle+'/'+fileName,sep=',')

    xy = np.array(data, dtype=np.float32)

    #print(xy)

    x_data = xy[:, 1:-1]
    y_data = xy[:, [-1]]

    X = tf.placeholder(tf.float32, shape=[None, 4])
    Y = tf.placeholder(tf.float32, shape=[None, 1])
    W = tf.Variable(tf.random_normal([4,1]), name="weight")
    b = tf.Variable(tf.random_normal([1]), name="bias")

    hypothesis = tf.matmul(X, W) + b
    cost = tf.reduce_mean(tf.square(hypothesis-Y))
    optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.000005)
    train = optimizer.minimize(cost)

    sess = tf.Session()
    sess.run(tf.global_variables_initializer())

    for step in range(100001):
        cost_, hypo_, _ = sess.run([cost,hypothesis, train], feed_dict={X: x_data, Y: y_data})
        if step % 3000 == 0:
            print("#", step, " 손실 비용: ", cost_)
            print("- 배추 가격: ",hypo_[0])
        

    saver = tf.train.Saver()
    save_path = saver.save(sess, "static/data/"+ vegitTitle +"/"+ vegitTitle +"_saved.cpkt")

    sess.close()

    context={}
    return HttpResponse(json.dumps(context), content_type="application/json")

