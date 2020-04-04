---
title: "\"Flutter plugin\""
description: "How to create a Flutter plugin that includes platform-specific Java / Objective-C code"
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

## setup main project

```
project=gsbridge
org=com.lamptom.$project
flutter create --org $org --template=plugin -i objc -a java $project
```


## build iOS for first time

```
cd $project/example
flutter build ios --no-codesign
```


## fix Xcode compatability

In Xcode, open `$project/example/ios`

Follow [official docs](https://flutter.dev/docs/development/ios-project-migration)

Install pods

```
cd ios
pod install
```


## build Android for first time

Open main project dir in Android Studio

Open android/.../*Plugin.java

Click "edit in Android Studio" in top right

Run example app

## implement platform-specific code

Follow [official instructions](https://flutter.dev/docs/development/platform-integration/platform-channels?tab=android-channel-java-tab#example). To show the ObjC/Java code, you may need to inspect the html, remove the "active" class on the Swift/Kotlin divs and add "active" to the ObjC/Java tabs. If so, run the following in the javascript console:

```
document.querySelector("#ios-channel-swift-tab").classList.remove("active");
document.querySelector("#ios-channel-objective-c-tab").classList.add("active");
```


## install Gamesparks for Android

Follow [GS SDK setup for Android](https://docs.gamesparks.com/sdk-center/android.html). Add *all* gradle lines to /build.gradle not example/build.gradle or example/*/build.gradle.

In AndroidManifest make these updates:

```
<application ... tools:replace="android:icon,android:label">
...
<manifest ... xmlns:tools="http://schemas.android.com/tools">
```

Run
