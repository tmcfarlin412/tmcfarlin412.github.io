---
title: "\"Python setup on Mac\""
description: "How to set up python on Mac and useful commands"
layout: post
author: tom
twitterUrl: {{ user.twitter }}
---

{% assign author = site.data.people[page.author] %}
{{ page.description }}

## useful scripts once setup is complete

```
# --------------------------
# --  Make a new project
# --------------------------

cd ~/projects
PROJECT_NAME="my_project_name"
mkdir -p "$PROJECT_NAME/src/$PROJECT_NAME"
cd "$PROJECT_NAME/src/$PROJECT_NAME"
mkdvirtualenv $(basename $(pwd))
deactivate

# --------------------------
# --  Work on existing project
# --------------------------

cd ~/projects/my_project_name/src/my_project_name
workon .

# --  DO WORK ---

deactivate
```

## overview of tools used

**pyenv**

Manages the python versions that are installed

```
pyenv help  # list commands
pyenv global  # see global version
pyenv install  # install new version
```

**zlib, sqlite**

Dependencies of pyenv

**virtualenvwrapper**

Helper to manage virtualenvs

```
mkvirtualenv my_env_1
mkvirtualenv my_env_2
workon my_env_1
deactivate
rmvirtualenv my_env_2
workon  # tab-tab to see envs
```

## set up Py on Mac

1. Follow (How to set up virtual environments for Python on a Mac)[https://opensource.com/article/19/6/python-virtual-environments-mac]. Instead of using the python version that they reference (3.7.1 at the time of writing), consider installing and using a more recent version.
2. Follow (The right and wrong way to set Python 3 as default on a Mac)[https://opensource.com/article/19/5/python-3-default-mac]
