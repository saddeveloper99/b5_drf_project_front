console.log("ffoefko")
import { getPostingDetail, writeComment } from './community-api.js';

// 게시글 상세 내용, 유저 미니프로필 가져오기 핸들러
window.onload = async function communityPostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    const posting = await getPostingDetail(POSITING_ID)

    // console.log(posting)
    // 작성자 
    const writer = document.querySelectorAll('.gw-writer')
    writer.forEach(name => {
        name.innerHTML = posting.username;
    });

    const writerImages = document.querySelectorAll('.gw-w-img');
    writerImages.forEach(image => {
        image.src = posting.user_image;
    });

    const following = document.getElementById('gw-b-following')
    following.innerHTML = posting.followings_count

    const follower = document.getElementById('gw-b-follower')
    follower.innerHTML = posting.followers_count

    const introduction = document.getElementById('gw-banner-bio')
    introduction.innerHTML = posting.introduction

    const userId = document.getElementById('gw-writer-image')
    userId.setAttribute('data-user-id', posting.user_id);

    // 게시글
    const title = document.getElementById('gw-title');
    title.innerHTML = posting.title;

    const content = document.getElementById('gw-content');
    content.innerHTML = posting.content;

    const updatedAt = document.getElementById('gw-created');
    updatedAt.innerHTML = posting.updated_at;

    const isUpdated = document.getElementById('gw-is-updated');
    const a = posting.is_updated ? "수정일" : "작성일";
    isUpdated.innerHTML = a

    const likeCount = document.getElementById('gw-like');
    likeCount.innerHTML = posting.like_count;
}

// 코멘트 가져오기 핸들러
window.onload = async function communityPostingComment() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    const comment = await getPostingComment(POSITING_ID)
}

// 댓글 작성
function handleCommentWriteBtnClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    writeComment(POSITING_ID);
}

const writeButton = document.getElementById("gw-w-comment");
writeButton.addEventListener("click", handleCommentWriteBtnClick);

// 좋아요 버튼
const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('liked');
});

