---
title: "\"Update 1: Collision detection, motions, and weapons.\""
description: "Sept' 22 - Mar '23 progress summary"
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

<a href="https://tmcfarlin412.github.io/assets/videos/2023-03-22_gameplay_levels_1_to_3.mp4">Video of the gameplay with current features</a>.

10 months ago on May 23, '22 <a href="https://github.com/tmcfarlin412/castle/commit/2416422f06df93fc6564aac4c61dd829c9bc7fff">I began development on this project (Github commit link)</a>. 6 months ago, I wrote about <a href="https://tmcfarlin412.github.io/2022/09/22/castle-intro.html">my first phase of developing a game engine + game</a>. Since
then, I've continued to work on this project, and am getting close to an MVP game engine. Soon
I will finish implementing the rest of my <a href="https://tmcfarlin412.github.io/assets/images/2023-03-22_castle_mvp_game_screenshot.png">MVP game</a>.

Since last update, primary features have been:

- Implement GJK algorithm in C++ + extensive testing.
- Define and read in <a href="https://tmcfarlin412.github.io/assets/images/2023-03-22_castle_motion_stab.png"> motions with svg</a>. 
  - Motions define arbitrary vectors (ex. hand, foot) as a function of time and relative to a base vector (the player's location)
- Define and read in <a href="https://tmcfarlin412.github.io/assets/images/2023-03-22_castle_weapon_sword.png"> weapons with svg</a>.
  - Define collision points as function of time, relative to an equip_location (ex. hand, foot)
  - Read in png data from SVG as a view over the collision points
- Use config files to add new motions and weapons
- Initiate attack, update motion and weapon positions with time. Stop and start attack.
- Use GJK to detect player weapon collisions with monster, inflict damage, trigger death events
- Determine attack direction according to user input.
- Remove monster from level upon death completing

Skills learned / refined since last update:

- GJK collision detection theory and implementation. This took a few months to learn and implement. 
It was a dense topic to digest as a sleep-deprived second-time dad.
- Vector math. Dot, cross, all that good stuff.
- In general, these last months were mainly a grind in software design and iteration. Practicing my
profession.
