console.log("ffoefko")
import { getPostingDetail } from './community-api.js';


window.onload = async function communityPostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    const posting = await getPostingDetail(POSITING_ID)

    console.log(posting)
    const title = document.getElementById('gw-title');
    title.innerHTML = posting.title;

    const content = document.getElementById('gw-content');
    content.innerHTML = posting.content;

    const likeCount = document.getElementById('gw-like');
    likeCount.innerHTML = posting.like_count;

    console.log(posting.like_count)
    // 이미지는 나중에 
    const updatedAt = document.getElementById('gw-updated');
    updatedAt.innerHTML = posting.updatedAt;
}




const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('liked');
});