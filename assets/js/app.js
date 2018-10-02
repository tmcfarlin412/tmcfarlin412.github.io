// // Top app bar
// import {MDCTopAppBar} from '@material/top-app-bar/index';

document.addEventListener("DOMContentLoaded", function (event) {

    // const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    // const topAppBar = new MDCTopAppBar(topAppBarElement);

    // mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));

    // const tabs = document.querySelectorAll('.mdc-tab');
    // for (let index = 0; index < tabs.length; index++) {
    //     const tab = tabs[index];
    //     mdc.ripple.MDCRipple.attachTo(tab);
    // }

    // // Tab bar
    // import {MDCTabBar} from '@material/tab-bar';

    const tabBar = document.querySelector('.mdc-tab-bar')
    mdc.tabBar.MDCTabBar.attachTo(tabBar);
    tabBar.addEventListener('MDCTabBar:activated', (e) => {
        const tmcContent = document.querySelectorAll('.tmc-content')
        const activeTabIndex = e.detail.index
        for (let index = 0; index < tmcContent.length; index++) {
            const element = tmcContent[index];
            if (index == activeTabIndex) {
                element.classList.remove('tmc-hide');
                element.classList.add('tmc-show');
            } else {
                element.classList.add('tmc-hide');
                element.classList.remove('tmc-show');
            }
        }
    })

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