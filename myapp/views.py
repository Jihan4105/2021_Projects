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
global status 
status = 0

def index(request):
    context = {}
    return render(request, 'index.html', context)

def training(request):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    print("!!!!!!")
    vegitTitle = request.POST.get('vegitTitle')
    fileName = request.POST.get('fileName')

    model = tf.global_variables_initializer()

    data = read_csv(root_dir+'/../static/data/'+vegitTitle+'/'+fileName,sep=',')

    xy = np.array(data, dtype=np.object)

    #가격 변동 추이 그래프용 데이터
    date = xy[:, 0:1]
    price = xy[:, [-1]]
    date1 = list()
    j=0
    for i in date:
        if(j%7==0):
            date1.append({'date':str(int(i[0])), 'price':int(price[j])})
        j+=1
    #print(date1)

    #평균 기온에 따른 가격 산포도용 데이터
    avgTemp = xy[:, 1:2]
    price = xy[:, [-1]]
    tmpScatter = list(0 for i in range(0,len(price)))
    j=0
    for i in date:
        tmpScatter[j]={'avgTmp':int(avgTemp[j]), 'price':int(price[j])}
        j+=1
    # print(tmpScatter)

    #강수량에 따른 가격 산포도용 데이터
    rainFall = xy[:, 4:5]
    price = xy[:, [-1]]
    rainScatter = list(0 for i in range(0,len(price)))
    j=0
    for i in date:
        rainScatter[j]={'rainFall':int(rainFall[j]), 'price':int(price[j])}
        j+=1
    print(rainScatter)

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
        if step % 1000 == 0:
            global status
            status = step/1000
            print("!!!!!!!!!!!!!!!!!!!!!!!!",status)
            print("#", step, " 손실 비용: ", cost_)
            print("- 배추 가격: ",hypo_[0])
        

    saver = tf.train.Saver()
    save_path = saver.save(sess,root_dir+'/../static/data/'+vegitTitle+'/'+vegitTitle+"_saved.cpkt")

    sess.close()

    context={'pricedata': date1, "tmpScatter":tmpScatter, "rainScatter":rainScatter}
    return HttpResponse(json.dumps(context), content_type="application/json")

def progressing(request):
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",status)
    context={'progress': status}
    return HttpResponse(json.dumps(context), content_type="application/json")