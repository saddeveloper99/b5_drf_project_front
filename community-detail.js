async function postingDetail() {
    const url = `${BACK_BASE_URL}/posting/${POSITING_ID}/`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        method: 'GET'
    })
}

const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('liked');
});