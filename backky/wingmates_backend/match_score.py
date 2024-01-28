# import scipy.io as sio
# import numpy as np
# import pandas as pd

import pickle
import math
import sys

"""
dot_vals = np.clip(sio.loadmat('matlab/dot_vals.mat')['dot_vals'], -1, 1)
lang_vals = np.clip(sio.loadmat('matlab/language_dots.mat')['dot_vals'], -1, 1)
"""

# load dot_vals from pickle file
with open('dot_vals.pkl', 'rb') as f:
    dot_vals = pickle.load(f)

# load lang_vals from pickle file
with open('lang_vals.pkl', 'rb') as f:
    lang_vals = pickle.load(f)


# countries = pd.read_csv("countries.csv")
# languages = pd.read_csv("languages.csv")
    
# load countries from pickle file
with open('countries_dict.pkl', 'rb') as f:
    countries_dict = pickle.load(f)

# load languages from pickle file
with open('languages_dict.pkl', 'rb') as f:
    languages_dict = pickle.load(f)


def country_dropdown_index(country):
    # return countries[countries['dropdown_name'] == country].index[0]
    return countries_dict[country]


def language_dropdown_index(language):
    # return languages[languages['Language'] == language].index[0]
    return languages_dict[language]


def country_match(c1, c2):
    return (1 - math.acos(dot_vals[c1][c2])/math.pi)**0.8


def language_match(l1, l2):
    # vals = [[(1-math.acos(lang_vals[i][j])/np.pi)**2 for i in range(len(l1))] for j in range(len(l2))]
    max_val = 0
    for i in range(len(l1)):
        for j in range(len(l2)):
            val = (1-math.acos(lang_vals[l1[i]][l2[j]])/math.pi)**2
            if lang_vals[l1[i]][l2[j]] > max_val:
                max_val = val
    return max_val


def gender_match(g1, g2):
    if g1 == g2:
        return 1
    elif g1 == "female" and g2 == "male":
        return 0.90
    elif g1 == "male" and g2 == "female":
        return 0.90
    elif g1 == "other" or g2 == "other":
        return 0.95


def age_match(a1, a2):
    return math.exp(-abs(a1-a2)/60)


def match(p1, p2):
    c1, g1, l1, a1 = p1
    c2, g2, l2, a2 = p2

    c1 = country_dropdown_index(c1)
    c2 = country_dropdown_index(c2)
    
    l1 = list(map(language_dropdown_index, l1))
    l2 = list(map(language_dropdown_index, l2))

    return int(100*(country_match(c1, c2) * gender_match(g1, g2) * age_match(a1, a2) * language_match(l1, l2))**1)


def parse_params(input):
    raw = input.split("|")

    rawp = [raw[:len(raw)//2], raw[len(raw)//2:]]
    params = list(map(lambda x: [x[0], x[1], x[2].split(","), int(x[3])], rawp))

    return params[0], params[1]


def match_score(input):
    p1, p2 = parse_params(input)
    return match(p1, p2)


# print(gender_match("male","female"))
# print(match_score("United States|male|English|20|United States|female|English|20"))
# print(sys.argv)
print(match_score(sys.argv[1]), end="")
