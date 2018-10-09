function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function onTabSelected(tabIndex) {
    // Ensure the correct tab is activated
    // set active tab based on query param
    const tabs = document.querySelectorAll('.mdc-tab')
    for (let index = 0; index < tabs.length; index++) {
        const tab = tabs[index];
        if (tabIndex == index) {
            // active tab
            tab.classList.add('mdc-tab--active')
            tab.querySelector('.mdc-tab-indicator').classList.add('mdc-tab-indicator--active')
        } else {
            tab.classList.remove('mdc-tab--active')
            tab.querySelector('.mdc-tab-indicator').classList.remove('mdc-tab-indicator--active')
        }
    }

    // Swap content as required
    const tmcContent = document.querySelectorAll('.tmc-content')
    for (let index = 0; index < tmcContent.length; index++) {
        const element = tmcContent[index];
        if (index == tabIndex) {
            element.classList.remove('tmc-hide');
            element.classList.add('tmc-show-grid');
        } else {
            element.classList.add('tmc-hide');
            element.classList.remove('tmc-show-grid');
        }
    }
}

var testimonialIndex = 0;
var testimonialCount = 0;
function refreshTestimonials() {
    const testimonialNodes = document.querySelectorAll('.tmc-testimonial')
    for (let index = 0; index < testimonialNodes.length; index++) {
        const testimonialNode = testimonialNodes[index];
        if (index == testimonialIndex) {
            testimonialNode.classList.add("tmc-show")
            testimonialNode.classList.remove("tmc-hide")
        } else {
            testimonialNode.classList.remove("tmc-show")
            testimonialNode.classList.add("tmc-hide")
        }
    }
}

function showNextTestimonial() {
    testimonialIndex = ++testimonialIndex % testimonialCount;
    refreshTestimonials()
}

function showPreviousTestimonial() {
    testimonialIndex = (++testimonialIndex + testimonialCount) % testimonialCount;
    refreshTestimonials()
}

document.addEventListener("DOMContentLoaded", function (event) {

    window.onpopstate = function(e) {
        let tabIndex
        if (e.state && e.state.tab) {
            tabIndex = e.state.tab
        } else {
            tabIndex = 0
        }
        onTabSelected(tabIndex)
    }

    const tabBar = document.querySelector('.mdc-tab-bar')
    mdc.tabBar.MDCTabBar.attachTo(tabBar);
    tabBar.addEventListener('MDCTabBar:activated', function (e) {
        onTabSelected(e.detail.index)
        if (e.detail.index == 1) {
            window.history.pushState({tab: 1}, "", "?tab=portfolio");
        } else if (e.detail.index == 2) {
            window.history.pushState({tab: 2}, "", "?tab=blog ");
        } else {
            window.history.pushState({tab: 0}, "", "?tab=intro");
        }
    })
    

    // set active tab based on query param
    const queryParamTab = getUrlParameter('tab')
    if (queryParamTab == 'portfolio') {
        onTabSelected(1)  
    } else if (queryParamTab == 'blog') {
        onTabSelected(2)
    } else {
        onTabSelected(0)
    }

    const postExcerpts = document.querySelectorAll('.tmc-post-excerpt')
    for (let index = 0; index < postExcerpts.length; index++) {
        const postExcerpt = postExcerpts[index];
        postExcerpt.addEventListener('click', function () {
            window.open(postExcerpt.getAttribute('data-url'), '_self')
        })
    }

    // Testimonials
    testimonialCount = document.querySelectorAll('.tmc-testimonial').length;
    document.querySelector('.tmc-row-testimonials .tmc-arrow-left').addEventListener('click', function() {
        showPreviousTestimonial()
    })

    document.querySelector('.tmc-row-testimonials .tmc-arrow-right').addEventListener('click', function() {
        showNextTestimonial()
    })
});