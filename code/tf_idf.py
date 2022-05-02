### importing the necessary libraries

from nltk.corpus import stopwords
import numpy as np
import pandas
import nltk
import re
import sys
import heapq
from nltk.tokenize import sent_tokenize

def tf_gen_sum(text, size) :
    sentences = sent_tokenize(text)

    # data cleaning 
    dict = {}
    text=""
    for a in sentences:
        temp = re.sub("[^a-zA-Z]"," ",a)
        temp = temp.lower()
        dict[temp] = a
        text+=temp

    ### calculated the frequency of the words found in text

    stopwords = nltk.corpus.stopwords.words('english')
    word_frequencies = {}
    for word in nltk.word_tokenize(text):
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1
    # print len(word_frequencies)

    ### finding weighted frequency of the words

    max_freq = max(word_frequencies.values())

    for w in word_frequencies :
        word_frequencies[w]/=max_freq
    # print word_frequencies

    ### calculating sentence scores from the word frequncies

    sentence_scores = {}
    for sent in sentences:
        for word in nltk.word_tokenize(sent.lower()):
            if word in word_frequencies.keys():
                if len(sent.split(' ')) < 30:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word]
                    else:
                        sentence_scores[sent] += word_frequencies[word]


    summary_sentences = heapq.nlargest(min(len(sentence_scores), 2), sentence_scores, key=sentence_scores.get)
    summary = ' '.join(summary_sentences)
    return summary 