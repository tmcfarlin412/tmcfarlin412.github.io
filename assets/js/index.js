function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function selectTab(tabIndex) {
    styleTabSelected(tabIndex)
        if (tabIndex == 1) {
            window.history.pushState({tab: 1}, "", "?tab=portfolio");
        } else if (tabIndex== 2) {
            window.history.pushState({tab: 2}, "", "?tab=blog ");
        } else if (tabIndex == 3) {
            window.history.pushState({tab: 2}, "", "?tab=contact ");
        } else {
            window.history.pushState({tab: 0}, "", "?tab=intro");
        }
}

function styleTabSelected(tabIndex) {
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

function showProject(projectNode) {
    projectNode.classList.remove('tmc-collapse')
}

function hideProject(projectNode) {
    projectNode.classList.add('tmc-collapse')
}

function toggleProjectVisibility(projectId) {
    var projectNode = document.getElementById(projectId)
    if (projectNode.classList.contains('tmc-collapse')) {
        showProject(projectNode)
    } else {
        hideProject(projectNode)
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    // Button url handler
    document.addEventListener('click', function (event) {
        if (event.target.tagName == 'BUTTON') {
            var dataUrl = event.target.getAttribute('data-url');
            if (dataUrl) {
                var target = event.target.getAttribute('target');
                if (!target) {
                    target = '_self'
                }
                window.open(dataUrl, target);
            }
        }
    })

    // History
    window.onpopstate = function(e) {
        let tabIndex
        if (e.state && e.state.tab) {
            tabIndex = e.state.tab
        } else {
            tabIndex = 0
        }
        styleTabSelected(tabIndex)
    }

    const tabBar = document.querySelector('.mdc-tab-bar')
    mdc.tabBar.MDCTabBar.attachTo(tabBar);
    tabBar.addEventListener('MDCTabBar:activated', function (e) {
        selectTab(e.detail.index)
    })
    

    // set active tab based on query param
    const queryParamTab = getUrlParameter('tab')
    if (queryParamTab == 'portfolio') {
        styleTabSelected(1)  
    } else if (queryParamTab == 'blog') {
        styleTabSelected(2)
    } else if (queryParamTab == 'contact') {
        styleTabSelected(3)
    } else {
        styleTabSelected(0)
    }

    const postExcerpts = document.querySelectorAll('.tmc-blog-card')
    for (let index = 0; index < postExcerpts.length; index++) {
        const postExcerpt = postExcerpts[index];
        postExcerpt.addEventListener('click', function () {
            window.open(postExcerpt.getAttribute('data-url'), '_self')
        })
    }

    // Testimonials
    testimonialCount = document.querySelectorAll('.tmc-testimonial').length;
    document.querySelector('.tmc-row__testimonials .tmc-arrow-left').addEventListener('click', function() {
        showPreviousTestimonial()
    })

    document.querySelector('.tmc-row__testimonials .tmc-arrow-right').addEventListener('click', function() {
        showNextTestimonial()
    })

    /*

    PORTFOLIO

    */

   var projectHeaders = document.querySelectorAll('.tmc-portfolio__card--header')
   
   for (var i = 0; i < projectHeaders.length; i++) {
        projectHeaders[i].addEventListener('click', function(e) {
            toggleProjectVisibility(e.target.getAttribute('data-project-id'))
        })
        // hide
        hideProject(document.getElementById(projectHeaders[i].getAttribute('data-project-id')));
   }
});