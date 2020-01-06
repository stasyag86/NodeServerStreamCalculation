# Node.js backend to calculate real time stream consumed by user

## Run application

1. npm install
2. npm start
application should run on port 9000

## API

- `GET /report` returns the amount to be paid our per label (i.e.`{ "Label 1" : 5000, "Label 2": 3000, "Label 3": 2000}`)
- `GET /users/{user_id}` returns how many seconds have been streamed for this user (i.e. `{"User":"User id 1","Total Streamed":3000}`)

## Logic

Each row in streaming.csv was mapped to an object called StreamInfo
I have mapped all data from streaming.csv file to two map objects:
1. Map <userID, List<SreamInfo>>
2. Map <track id, List<SreamInfo>>



Each row in users.csv was mapped to an object called UserInfo
I have mapped all data from users.csv to a map object
1. Map <userID, UserInfo> 

**For get reports**

After retrieving the track.json for each row I am taking out the track_id, label 1
then from <track id, List<SreamInfo>> by track_id I am retrieving List of StreamInfo
from each StreamInfo I can retrieve the userID 
then from Map <userID, UserInfo>  I can get user fee and origin by userID and calculate the bill
then map it by label

**For get users/user_id**

I can retrieve from Map <userID, List<SreamInfo>>  List of StreamInfo
for each StreamInfo i can summarize the total seconds played per user
