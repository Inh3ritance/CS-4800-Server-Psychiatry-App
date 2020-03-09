#Enrique Hernandez

response_list = ['I am happy', 'I am sad', 'I feel depressed']


#response = input("Tell me how you feel.\n")

#response_list = []
#response_list.append(response)
emotions = ['happy', 'sad', 'depressed', 'angry', 'upset']
emotions_from_response = []

def calculateEmotionScore(emotions_from_response):
    emotion_score = 0
    for emotion in emotions_from_response:
        print(emotion)
        if emotion == 'happy':
            emotion_score += 100
        if emotion == 'sad':
            emotion_score -= 50
    print('Your emotion score: ' + str(emotion_score))

for r in response_list:
    response_parts = r.lower().split()
    for word in response_parts:
        if word == 'happy':
            #emotion_score += 100
            emotions_from_response.append(word)
        if word == 'sad':
            emotions_from_response.append(word)
            #emotion_score += 40
        if word == 'depressed':
            #emotion_score += 10
##        if word in emotions:
##            #print(word)
            emotions_from_response.append(word)



calculateEmotionScore(emotions_from_response)

    
