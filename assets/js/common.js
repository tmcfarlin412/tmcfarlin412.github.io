document.addEventListener("DOMContentLoaded", function (event) {
    const toastNode = document.getElementById('toast')
    function toast(text) {
        toastNode.innerText = text;
        toastNode.style.opacity = 1;

        setTimeout(function() {
            toastNode.style.opacity = 0;
        }, 2000)
    }

    nodes = document.body.querySelectorAll('.tmc-copy');
    const copyOnClickListener = function(event) {
        const el = document.createElement('textarea');
        el.value = this.getAttribute('data-copy');
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el); 
        toast("Text copied to clipboard");
    };
    for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        element.addEventListener('click', copyOnClickListener);
    }
});