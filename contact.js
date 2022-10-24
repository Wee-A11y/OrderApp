function submitClicked() {
    alert('Thank you for your message, we will get back to you as soon as possible');
}

function submit() {
    document.getElementsByClassName('submit')[0].addEventListener('click', submitClicked);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    submit();
}