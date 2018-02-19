import sys
from datetime import datetime
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import re
from textblob import TextBlob
import MySQLdb
import unicodedata2
import json
#import pydoop.hdfs as hdfs
from subprocess import call
import os



#        replace mysql.server with "localhost" if you are running via your own server!
#                        server       MySQL username    MySQL pass  Database name.
conn = MySQLdb.connect("localhost" , "vijay" , "" ,"twitter")
c = conn.cursor()



class listener(StreamListener):
    
    try:
        def get_tweet_sentiment(self, tweet):
            '''
            Utility function to classify sentiment of passed tweet
            using textblob's sentiment method
            '''
            # create TextBlob object of passed tweet text
            analysis = TextBlob(tweet)
            # set sentiment
            if analysis.sentiment.polarity > 0:
                return 'positive'
            elif analysis.sentiment.polarity == 0:
                return 'neutral'    

            else:
                return 'negative'
    
    
        # def clean_tweet(self, tweet):
        #     '''
        #     Utility function to clean tweet text by removing links, special characters
        #     using simple regex statements.
        #     '''
        #     return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) | (\w+:\ / \ / \S+)", " ", tweet).split())
    
    
        def on_data(self, data):
            try :
                all_data = json.loads(data)
                #print(data)

                # filename = '/tmp/myfile%s.txt'%datetime.utcnow().strftime('%Y%m%d%H%M%S%f')[:-3]
                # f = open(filename,'w')
                # f.write(data)
                # f.close()
                #hdfs.put(filename,"hdfs://r01mstr.bddata.local:9000/user/vijay/tweets/")
                #call(["hadoop fs" "-put   /user/saurzcode/dir3/"])
                # cmd = 'hadoop fs -put %s /user/vijay/tweets/'%filename
                # os.system(cmd)
                #print cmd

                # print(data)
                #tweet = all_data["text"].encode('utf-8')
                tweet = unicodedata2.normalize('NFKD',u''+all_data["text"]).encode('ascii','ignore')
                created_at = all_data["created_at"].encode('utf-8')
                username = all_data["user"]["screen_name"].encode('utf-8')
                sentiment = self.get_tweet_sentiment(tweet)
                image_url = all_data["user"]["profile_image_url"].encode('utf-8')
                rt_user = "NULL"
                rt_user = all_data["retweeted_status"]["user"]["screen_name"].encode('utf-8')
                rt_user_image_url = all_data["retweeted_status"]["user"]["profile_image_url"].encode('utf-8')
                #print(tweet)
                print(rt_user)
                print(rt_user_image_url)
                print(sentiment)
                print("\n")
                #print(image_url)
                #print("\n")
                topics=str(sys.argv[1])
                c.execute("INSERT INTO tweets (created_at, screen_name, text,sentiment,profile_image_url,topic,rt_user,rt_user_image_url) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(created_at, username, tweet,sentiment,image_url,topics,rt_user,rt_user_image_url))
                conn.commit()
                return True
            except:
                pass
        def on_error(self, status):
            print(status)
            return True
    except:
        pass
auth = OAuthHandler("LS6FvEM47Es7bUwvj57gALFXJ","pazSE7Dt1Re7aq8yx7a4JVIE9cZA9lFWYotSx2QSOUwJydu8iY")
auth.set_access_token("995525018-uJO8BPKxBSUWy1IcZIOWI51eBkN29zIwSjANdWl4","H1E4wy2mXILk8nvaiTqDcS2DAEBTccwhHCVJrl89ftOHA")

twitterStream = Stream(auth, listener())
twitterStream.filter(track=sys.argv)
