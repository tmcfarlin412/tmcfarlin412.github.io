// // Top app bar
// import {MDCTopAppBar} from '@material/top-app-bar/index';

document.addEventListener("DOMContentLoaded", function(event) { 

// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
// const topAppBar = new MDCTopAppBar(topAppBarElement);

mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar--prominent'));

// // Tab bar
// import {MDCTabBar} from '@material/tab-bar';

// const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
mdc.tabBar.MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));

// // Tabs
// import {MDCTab} from '@material/tab';

// const tab = new MDCTab(document.querySelector('.mdc-tab'));

// // Tab indicator
// import {MDCTabIndicator} from '@material/tab-indicator';

// const tabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));

// Tab scroller
// import {MDCTabScroller} from '@material/tab-scroller';

// const tabScroller = new MDCTabScroller(document.querySelector('.mdc-tab-scroller'));
    //do work
  });