console.log("ffoefko")
import { getPostingDetail, writeComment, getPostingComment } from './community-api.js';

// 게시글 상세 내용, 유저 미니프로필 가져오기 핸들러
window.onload = async function communityPostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSTING_ID = urlParams.get('posting_id');
    const posting = await getPostingDetail(POSTING_ID)
    const comments = await getPostingComment(POSTING_ID)
    communityPostingContent(posting)
    communityPostingComment(comments)

}


async function communityPostingContent(posting) {
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
async function communityPostingComment() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    const comments = await getPostingComment(POSITING_ID)

    comments.forEach(comment => {
        const template = document.createElement("div");
        template.setAttribute("class", "gw-comment")
        template.innerHTML = `  <div class="gw-comment-writer">
                                    <img class="comment-image" src="${comment.image}" alt="">
                                    <div class="comment-writer">${comment.username}</div>
                                    <div style="display: flex; margin:auto 0 auto auto">
                                        <button class="gw-btn-comment gw-btn-nocolor">수정</button>
                                        <button class="gw-btn-comment gw-btn-nocolor">삭제</button>
                                    </div>
                                </div>
                                <div class="gw-comment-content"
                                    style="background-color:rgb(228, 228, 228); padding: 2%; border-radius: 10px;">
                                    <div style="width: 90%;">${comment.content}
                                    </div>
                                </div>`
        const comment_list = document.getElementById("gw-comment-list")
        comment_list.appendChild(template)
        console.log(comment)
    })

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

