---
title: "\"Flutter < 15 Xcode 11.4 Support\""
description: "Fixes error \"Building for iOS, but the linked and embedded framework 'App.framework' was built for iOS Simulator.\""
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

I'm building a Flutter plugin and app. The plugin is a bridge to a native SDK, it is written in Java and Obj-C. When buliding the iOS project by opening it in Xcode and clicking "Run", I received the error at the top of this post.

| Flutter version                   | Xcode version |
|-----------------------------------|---------------|
| 1.12.13+hotfix.8 • channel stable | 11.4          |

Run `flutter --version` to get the Flutter version.

## Instructions

1. Follow the [official instructions](https://flutter.dev/docs/development/ios-project-migration).

2. Navigate to iOS project in terminal, run `flutter build ios --no-codesign`
