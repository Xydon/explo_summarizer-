# from .tf_idf import tf_gen_sum
# from .trm import generate_summary 
import tf_idf 
import trm

import sys 
form = sys.argv[2]
text = sys.argv[1]

if(form == 'False') :
    print(trm.generate_summary(text, 3))
else :
    print(tf_idf.tf_gen_sum(text,3))

sys.stdout.flush() 
