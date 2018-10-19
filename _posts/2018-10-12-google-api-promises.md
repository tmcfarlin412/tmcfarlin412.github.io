---
title: Managing Google API Quotas
layout: post
author: tom
---

{% assign author = site.data.people[page.author] %}
Exceeding Google API quotas can break your app. Luckily, there are simple measures that developers may take to mitigate these detrimental errors. This post explains how to avoid exceeding these quotas, and demonstrates how developers may update their code to eliminate quota errors in JavaScript applications.

|Quota Name|Limit|Error message reason|
|----------|-----|---|
|Queries per day|1,000,000,000|dailyLimitExceeded|
|Queries per 100 seconds per user|1,000|userRateLimitExceeded|
|Queries per 100 seconds|10,000|rateLimitExceeded|

If your application exceeds one of these quotas, Google will return an error message as such instead of the requested data.

```
{
 "error": {
  "errors": [
   {
    "domain": "usageLimits",
    "reason": "userRateLimitExceeded",
    "message": "User Rate Limit Exceeded…"
   }
  ],
  "code": 403,
  "message": "User Rate Limit Exceeded…"
 }
}

```

Mitigation of quota errors requires a two-part solution: recovery and prevention. Following are explanations of how applications can recover from these errors and how they may prevent the errors from manifesting. Recovery and prevention are discussed for each limit.

## Example case

Consider this scenario. You are making the Chrome Extension "Name update" which updates all files in one of your Google Drive folders to have the same filename. The Google Drive API facilitates the updating of file names with an "update" endpoint. One request must be made for each file that needs to be updated. You write the following code, but requests fail due to quota limit errors. "fetch" is a function available to Chrome Extensions and Chrome Apps that helps to interact with Google APIs. The function "updateNamesInFolder" runs to update the names in a folder.

### Bad Code Snippet: Errors when making fetch calls in for loop
```
function updateNamesInFolder(folderId, name) {
    // First, fetch all files in folder
    fetch(/*get files in folder*/)
        .then(response => {
            const files = response.files; /* Array of objects with property 'id' */
            for (int i = 0; i < files.length; i++) {
                fetchUpdateName(files[i].id, name)
            }
        })
}

function fetchUpdateName(id, name) {
    // Update the name of the file with specified id to "name"
    return fetch(/*update name fetch here*/)
}
```

This code results in responses with errors containing the reason "userRateLimitExceeded".

## Queries per 100 seconds per user

"userRateLimitExceeded" indicates that the application is making requests with a frequency such that Google is attempting to process the requests from the individual application at a rate greater than 1000 requests per second.

The first step is to evaluate the code base, and ensure that all of the requests are necessary. Reducing the number of requests, slowing the frequency of requests, and optimizing requests can reduce frequency of errors. However, this will not fix all issues as sometimes it is required for a high number of requests to be made by a single application in a short period of time. This example is such a case, as a single request is required to update each file.

Next, the application needs to recover from this error. The application may do this by retrying the request or proceeding without the requested data. In the example, the request must be retried to make the application useful. The retry should not occur immediatly; the application should delay the request since the error was due to a rate limit being exceeded. Expanding on the last snippet, the following has functions "handleRateErrors", "hasError", and "determineReason". "handleRateErrors" returns 'retry' or 'proceed'. 'proceed' indicates that the response contains data, 'retry' indicates that there was an error and data was not returned. "hasError" and "determineReason" are helper functions to retrieve information about the response.

### Bad Code Snippet: Delay
```
...

function fetchUpdateName(id, name) {
    // Update the name of the file with specified id to "name"
    return fetch(/*update name fetch here*/)
        .then((response) => {
            return handleRateErrors(response)
                .then(result => {
                    if (result == 'retry') {
                        return fetchUpdateName(id, name)
                    } else {
                        throw Error('Unexpected result from handleRateErrors');
                    }
                })
            })
}

/**
 * Returns 'retry' or 'proceed'
function handleRateErrors(response) {
    if (hasError(response)) {
        const reason = determineReason(response) 
        if (reason == 'userRateLimitExceeded') {
            return 'retry';
        } else {
            return 'proceed';
        }
    } else {
        return 'proceed';
    }
}

function hasError(response) {
    let result;
    /* Determine whether response has error */
    return result;
}

/**
 * Returns "userRateLimitExceeded" or null
function determineReason(response) {
    let reason;
    /* Determine error reason */
    return reason;
}
```

This code snippet successfully retries request if they fail, however there are still errors. That is because the code snippet is rapidly sending requests in the for loop. Google is receiving and attempting to process requests from the application at a rate greater than 1000 per 100 seconds, or 1 query per 100 ms. The following code updates the "updateNamesInFolder" function to send requests every 100 ms, the minimum delay required between processing of requests to avoid errors.

### Bad (but better) code snippet: delay reduces but does not always prevent errors
```
const MIN_DELAY = 100;
let minDelayBetweenQueries = MIN_DELAY;
function updateNamesInFolder(folderId, name) {
    // First, fetch all files in folder
    fetch(/*get files in folder*/)
        .then(response => {
            const files = response.files; /* Array of objects with property 'id' */
            for (int i = 0; i < files.length; i++) {
                setTimeout(() => fetchUpdateName(files[i].id, name), minDelayBetweenQueries); 
            }
        })
}
...
```

There are still errors when running this code. This is because the requests are being delayed, but the calls are being processed by Google at a faster rate than is allowed. To elaborate, if the first request takes 500 ms to reach Google's servers, and the second request is delayed 100 ms but takes only 400ms to reach Google's servers, Google receives, and presumably processes, those requests at the same time. Increasing the delay decreases the risk of receiving these errors, but you can not be 100% certain that you are not surpassing this rate with a simple delay because you can not be certain of the length of time it will take for your request to be received and processed by Google’s servers.

Luckily, there is certainty once the application receives a response to the request. At that moment, the application becomes aware that Google processed the request between the time that the request was sent and the time thant the response was received. In the example application, we will add the constraint that it is imperative that each request completes successfully on the first try. We want to minimize initial failures. To do this, the application must send a request, wait for the response, process the response, and ensure that at least 100 ms pass since you received the response before sending the next request.

### Decent code snippet: chains requests (one at a time) to prevent user quota errors

```
const MIN_DELAY = 100;
let minDelayBetweenQueries = MIN_DELAY;
let nextRequestTime;

function updateNamesInFolder(folderId, name) {
    // First, fetch all files in folder
    fetch(/*get files in folder*/)
        .then(response => {
            const files = response.files; /* Array of objects with property 'id' */

            let chain = Promise.resolve();
            for (int i = 0; i < files.length; i++) {

                // Append requests to chain, next request is sent only once the previous completes successfully
                // Also, update the chain reference each time so that we are adding to the end.
                chain = chain.then(() => fetchUpdateName(files[i].id, name)); 
            }
        })
}

function fetchUpdateName(id, name) {
    // Update the name of the file with specified id to "name"
    return fetch(/*update name fetch here*/)
        .then((response) => {
            return handleRateErrors(response)
                .then(result => {
                    if (result == 'retry') {
                        return fetchUpdateName(id, name)
                    } else {
                        throw Error('Unexpected result from handleRateErrors');
                    }
                })
            })
}

/**
 * Returns 'retry' or 'proceed'
 */
function handleRateErrors(response) {
    if (hasError(response)) {
        const reason = determineReason(response) 
        if (reason == 'userRateLimitExceeded') {

            // Add a delay if necessary to prevent the next request from being sent too quickly
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        } else {
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        }
    } else {
        const delay = recalculateNextRequestTime();
        return delayPromise(delay).then(() => 'retry');
    }
}

function hasError(response) {
    let result;
    /* Determine whether response has error */
    return result;
}

/**
 * Returns "userRateLimitExceeded" or null
 */
function determineReason(response) {
    let reason;
    /* Determine error reason */
    return reason;
}

/**
 * Recalculates nextRequestTime and returns the delay to that time.
 *
 * Returns 0 if the minimum delay between queries has passed.
 */
function recalculateNextRequestTime() {
  nextRequestTime = Date.now() + minDelayBetweenQueries;
  return Math.max(nextRequestTime, Date.now()) - Date.now();
}

function delayPromise(delay) {
    if (delay == 0) {
        return; // return immediately is there is no delay
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, delay); // resolve after delay
        })
    }
}
```

## Queries per 100 seconds

"rateLimitExceeded" indicates that more than the combined number of requests being made for every instance of the application exceeds 10,000 per 100 seconds. The recovery strategy is identical to the recovery strategy deployed for the user rate limit. However, prevention of this error requires an update to the code. In order to prevent this error in the future, the delay between requests must be increased. That is because if this rate is being exceeded and all apps do not alter how they make the requests, the error may persist. Thus, the prevention strategy is as follows. If a "rateLimitExceeded" error is received, increase the delay between requests, delay the retry, and then retry the request once the delay has passed. If the error occurs again, increase the delay again before retrying. Finally, since we do not want the delay to permanently be increased, once we have a few sequential successful requests (10 in the following implementation), taper the delay back. By incrementally increasing the delay between requests, the overall query rate will decrease and the error should vanish across application instances. This is a good strategy to deploy for the user rate limit as well. Here is an implementation of this strategy.

### Decent code snippet: prevent "rateLimitExceeded" error

```
...

let numberOfConsecutiveSuccessfulRequests = 0;

/**
 * Returns 'retry' or 'proceed'
 */
function handleRateErrors(response) {
    if (hasError(response)) {
        const reason = determineReason(response) 
        if (reason == 'userRateLimitExceeded') {
            // Add a delay if necessary to prevent the next request from being sent too quickly
            minDelayBetweenQueries += 50;
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        } else if (reason == 'rateLimitExceeded') {
            minDelayBetweenQueries += 50;
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        } else {
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'proceed');
        }
    } else {
        // Every 10 requests that succeed, reduce the delay.
        if (++numberOfConsecutiveSuccessfulRequests % 10) {
            minDelayBetweenQueries = Math.max(MIN_DELAY, minDelayBetweenQueries - 50); // Do not allow delay to be less than minimum
        }
        const delay = recalculateNextRequestTime();
        return delayPromise(delay).then(() => 'proceed');
    }
}
...

```

## Queries per day

"dailyLimitExceeded" indicates that the total number of requests made by all instances of the application have exceeded the daily limit. Google will reject all subsequent calls until midnight Pacific Time.

A common reason for hitting this limit is that API keys associated with a single project are shared across multiple applications. Each application should associate with a different project API keys. This is done by creating a new project in the Google Cloud Console and new API keys. Here is a link to the console: <a href="https://console.cloud.google.com/" target="_blank">https://console.cloud.google.com/</a>.

Recovering from this quota limit involves waiting until midnight (PT) to make requests. However, if these requests are queued and sent at midnight, the application may cause this same error the next day. The application should gracefully degrade by disabling features that require network requests. The application could fallback on cached data, or queue important requests that do not need to complete immediately. Upon seeing these errors, the application should be updated to reduce request count. If that is not possible, a request to Google for an increase of this limit can be made. The following degrades by scheduling the update for midnight and informing the user. This is the final version of the code that recovers from and prevents all rate errors.


### Use this code snippet: recover from and prevent rate errors

```
const MIN_DELAY = 100;
let minDelayBetweenQueries = MIN_DELAY;
let nextRequestTime;
let numberOfConsecutiveSuccessfulRequests = 0;

function updateNamesInFolder(folderId, name) {
    // First, fetch all files in folder
    fetch(/*get files in folder*/)
        .then(response => {
            const files = response.files; /* Array of objects with property 'id' */

            let chain = Promise.resolve();
            for (int i = 0; i < files.length; i++) {

                // Append requests to chain, next request is sent only once the previous completes successfully
                // Also, update the chain reference each time so that we are adding to the end.
                chain = chain.then(() => fetchUpdateName(files[i].id, name)); 
            }
            chain.catch(e => {
                if (e.message == 'Daily limit exceeded') {
                    rescheduleForTomorrow(folderId, name);
                }
            })
        })
}

function fetchUpdateName(id, name) {
    // Update the name of the file with specified id to "name"
    return fetch(/*update name fetch here*/)
        .then((response) => {
            return handleRateErrors(response)
                .then(result => {
                    if (result == 'retry') {
                        return fetchUpdateName(id, name)
                    } else {
                        throw Error('Unexpected result from handleRateErrors');
                    }
                })
        })
}

/**
 * Returns 'retry' or 'proceed'
 */
function handleRateErrors(response) {
    if (hasError(response)) {
        const reason = determineReason(response) 
        if (reason == 'userRateLimitExceeded') {
            // Add a delay if necessary to prevent the next request from being sent too quickly
            minDelayBetweenQueries += 50;
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        } else if (reason == 'rateLimitExceeded') {
            minDelayBetweenQueries += 50;
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'retry');
        } else if (reason == 'dailyLimitExceeded') {
            return Promise.reject(Error('Daily limit exceeded'));  
        } else {
            const delay = recalculateNextRequestTime();
            return delayPromise(delay).then(() => 'proceed');
        }
    } else {
        // Every 10 requests that succeed, reduce the delay.
        if (++numberOfConsecutiveSuccessfulRequests % 10) {
            minDelayBetweenQueries = Math.max(MIN_DELAY, minDelayBetweenQueries - 50); // Do not allow delay to be less than minimum
        }
        const delay = recalculateNextRequestTime();
        return delayPromise(delay).then(() => 'proceed');
    }
}

function hasError(response) {
    let result;
    /* Determine whether response has error */
    return result;
}

/**
 * Returns "userRateLimitExceeded" or null
 */
function determineReason(response) {
    let reason;
    /* Determine error reason */
    return reason;
}

/**
 * Recalculates nextRequestTime and returns the delay to that time.
 *
 * Returns 0 if the minimum delay between queries has passed.
 */
function recalculateNextRequestTime() {
  nextRequestTime = Date.now() + minDelayBetweenQueries;
  return Math.max(nextRequestTime, Date.now()) - Date.now();
}

function delayPromise(delay) {
    if (delay == 0) {
        return; // return immediately is there is no delay
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, delay); // resolve after delay
        })
    }
}

function rescheduleForTomorrow(folderId, name) {
    /* reschedule for tomorrow */
    window.alert('Update will complete at 12 AM Pacific Time');
}
```
