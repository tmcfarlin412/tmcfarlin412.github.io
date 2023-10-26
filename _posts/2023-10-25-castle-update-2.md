---
title: "\"Update 2: Levels, saves, and items, oh my!\""
description: "Mar '23 - Oct '23 progress summary"
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

<a href="https://tmcfarlin412.github.io/assets/videos/2023-10-25_gameplay.mov">Video of the gameplay with current features</a>.

On May 23, '22 <a href="https://github.com/tmcfarlin412/castle/commit/2416422f06df93fc6564aac4c61dd829c9bc7fff">I began development on this project (Github commit link)</a>. 7 months ago, I wrote about <a href="https://tmcfarlin412.github.io/2023/03/22/castle-update-1.html">collision detection, weapon, and attack implementation</a>. At that point, I thought I was close to my MVP game engine. Close is relative though, so to be objective 7 months have passed and I've continued work towards my <a href="https://tmcfarlin412.github.io/assets/images/2023-03-22_castle_mvp_game_screenshot.png">MVP game</a>.

The primary features added since then have been:

- Built remaining levels
- Experimented developing in remote cloud environment
- Refined build process in Linux env (vs. Mac)
- Added Save object and screen popups
- Added ability to create new items, gif display
- Added coins and double-jump items
- Maintain item inventory for player
- Ability to add TextViews to SvgLayouts
- Improved LayerLayout and structure of LevelLayout to use this class
- Improve controller design, have most, if not all, extend SimpleController for consistency
- Migrate controllers to shared_ptrs
- Add storing of level changes and apply if present on load. Allows for item collection and other actions that alter the level state to persist across level loads.

Skills learned / refined since last update:

- Nitty gritty cpp nuances

The next sprint will involve

- Minor bug fixes and improved logging
- Enable monsters to move
- Game updates
- Package desktop game and distribute

Till next time!
