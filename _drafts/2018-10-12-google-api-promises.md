---
title: Managing Google API Quotas
layout: post
author: tom
---

{% assign author = site.data.people[page.author] %}

When incorporating Google API calls into your application, you must make sure that you are not exceeding request quotas. Google only allows a certain number of API calls per user and per application. The actual quota value varies per API. For example, here are the quotas for Google classroom and Google drive APIs:

insert quoted data here

if you exceed these quotas, Google will not deliver the requested data associated with the API call. Instead, you will receive an error message as such

insert error message here

Let us consider the following scenario. You have N files named File_1, File_2, … File_N on your Google drive. Your application has a function "prefixFiles" that updates the name of each file with a specified prefix:

```
function prefixFiles(prefix) {
    var successCount = 0
    var failCount = 0

    return fetchFiles({ fields: 'files(id,name)' })
        .then(response => {
            var file
            var prefixedName
            var fileCount = files.length
            var promises = []
            for (var fileIndex = 0; fileIndex < fileCount; fileIndex++) {
                file = response.files[fileIndex]
                prefixedName = prefix + file.name
                promises.push(updateFileMetadata(file.id, { name: prefixedName })
                    .then(v => successCount++, e => failCount++)
            })

            return Promise.all(promises)
        })
}
```