2020-7-11

First Admin adds matches of this week and nextweek one by one
# POST: {{URL}}/api/v1/matches


Then User makes predictions for each match ([predictions])
# POST: {{URL}}/api/v1/predictions/2 

3.User submit his predictions for each week. A karname will be created n user gets charded $1 If karname is new. else no charche. Each week one karname. Karname is weekly report

Then Admin check finished matches as match.finished=true and update results
at the and of the day 
# GET: {{URL}}/api/v1/ad/check-finished-matches/{weekId}

X. Admin update result for each match - 
and related predictions will get updated to check if correct or not
# PATCH: {{URL}}/api/v1/matches/5ef7cff5a0606a4b742fe28e

Then calculate points for predictions of this week
# GET: {{URL}}/api/v1/ad/calculate-points/matchId

Then calculate points for each karname
# GET: {{URL}}/api/v1/users/top-users-of-week/weekId

Then sort karnames by points and get top 3 karnames of week to specify the winners

Then give Gift to winners   

User can whether cash the gift of add its value to his credit-balance
