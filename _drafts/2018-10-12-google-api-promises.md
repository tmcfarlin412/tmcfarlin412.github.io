---
title: Managing Google API Quotas
layout: post
author: tom
---

{% assign author = site.data.people[page.author] %}
Exceeding Google API quotas can break your app. Luckily, there are a few simple ways that you can mitigate these detrimental errors. This post explains how to avoid exceeding these quotas, and demonstrates how to eliminate quota errors in your Chrome Apps and Extensions.


|Quota Name|Limit|
|----------|-----|
|Queries per day|1,000,000,000 |
|Queries per 100 seconds per user|1,000|
|Queries per 100 seconds|10,000|

if you exceed these quotas, Google will not deliver the requested data associated with the API call. Instead, you will receive an error message as such

```
{
 "error": {
  "errors": [
   {
    "domain": "usageLimits",
    "reason": "userRateLimitExceeded",
    "message": "User Rate Limit Exceeded. Rate of requests for user exceed configured project quota. You may consider re-evaluating expected per-user traffic to the API and adjust project quota limits accordingly. You may monitor aggregate quota usage and adjust limits in the API Console: https://console.developers.google.com/apis/api/drive.googleapis.com/quotas?project=143041290413",
    "extendedHelp": "https://console.developers.google.com/apis/api/drive.googleapis.com/quotas?project=143041290413"
   }
  ],
  "code": 403,
  "message": "User Rate Limit Exceeded. Rate of requests for user exceed configured project quota. You may consider re-evaluating expected per-user traffic to the API and adjust project quota limits accordingly. You may monitor aggregate quota usage and adjust limits in the API Console: https://console.developers.google.com/apis/api/drive.googleapis.com/quotas?project=143041290413"
 }
}

```

How to you mitigate these quota issues? 

Handling the Application quotas (Queries per day and Queries per 100 seconds) is a bit complex, as you must either devise a method for separate application instances to coordinate their query count. For example, one could build a server through which all requests are made. This server would ensure these quotas are not exceeded. Another method of mitigation is to retry the request after a waiting period. This is not ideal, but it is better than no recovery.

The remainder of this post focuses on handling "Queries per 100 seconds per user" quota, as this can be implemented client-side. 

Consider the following scenario. You have an application "Drive file prefixer". This application allows you to prefix all of the original filenames in a selected Drive directory. For example, if you have a Drive folder named "demo" with files named file_1.txt, file_2.txt… file_N.txt on your Google drive, your can update all of those files with any prefix, for example file_1.txt => my_file_1.txt, file_2.txt => my_file_2.txt… file_2.txt => my_file_N.txt.

There is an endpoint for this where you can update a Drive file by specifying the new name and the file ID.

However, you will run into issues if you run a simple for loop to shoot out all of those update requests at once. This is because the individual user rate is being exceeded, as all requests are made within a few seconds.

To alleviate this issue, you can throttle your requests client-side with Promise technology. In a loop, add the requests to a Promise chain so that the next request will be made only when the previous drive request completes successfully. If a request fails, you can delay the call and then proceed down the chain. For most applications, this is going to be the best way to ensure accurate results.

One-in one-out is not a "performant" way to Another (more complex) way to mitigate this is to 