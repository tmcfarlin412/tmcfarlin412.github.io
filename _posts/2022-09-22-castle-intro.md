---
title: "\"FYI: Game Engine + Game Development Project\""
description: "I started to develop a game engine and game in C++."
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

This is an FYI, more for the sake of history. I wanted to document the start of my project to
develop a 2D platformer game engine and game.

Here's the <a href="https://github.com/tmcfarlin412/castle/tree/prod">Github project</a> under dev. One thing I'm doing with this
project that I typically don't do is do little to project manage it! I usually project manage my
projects to the point where I'm not actually working on them...this is uninspiring and I wanted to 
see what I could do without planning so much. It's working well, especially since I'm learning new
skills and it's difficult to plan far in advance. I basically just have the next task or 2 in mind
to move the project forward, in my spare head-space-time I "plan" my approach, and when I get a few
moments here and there I sink some time into the project. My goals are to

- Make a game engine, and a game. Release on a major platform (TBD).
- Learn and practice professional C++ dev. I'm a professional SWE, but recognize that it'll take
  time to pick up best practices for this new language. Like with 99% of my other knowledge, learn
  gradually and from the ~Internet~

<a href="https://tmcfarlin412.github.io/assets/images/2022-07-22_castle_screenshot.png">Screenshot of current state of project</a>

Thus far the following skills have been picked up / worked on as a part of this journey:

- C++ development. Some large components of the engine include
  - View rendering system (inspired by Android system, since that's what I know)
  - Level creation system - draw levels in Inkscape, export svg, parse the XML to load into game.
  - In general, learn and practice memory management skills required for a C++ app. Most of my dev
    is with interpreted languages like Java, Python. C++ has stretched my brain.
- Collision detection (rect / rect)
- Makefile
- Game engine fundamentals
- A lot more but I'm going to just post because I'm on paternity leave, my daughter is taking a nap,
  I'm holding my newborn, and want to continue on this game engine dev journey with the little
  free time I have :)
