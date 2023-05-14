import {
    FRONT_BASE_URL,
    getPostingDetail,
    getPostingComment,
    viewPostingDetail,
    viewPostingComment,
    DeletePosting,
    writeComment,
    BACK_BASE_URL,
    token
} from './community-api.js';

// 로드 시 게시글 상세 내용 + 유저 미니프로필 + 댓글 가져오기
window.onload = async function PostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSTING_ID = urlParams.get('posting_id');
    const posting = await getPostingDetail(POSTING_ID) /* posting에 게시글 작성 유저 정보도 포함(시리얼라이저) */
    const comments = await getPostingComment(POSTING_ID) /* comments에 댓글 작성 유저 정보도 포함(시리얼라이저) */
    viewPostingDetail(posting)
    viewPostingComment(comments)
}

// 수정 버튼 클릭 시 수정 페이지로 이동 
const updateBtn = document.getElementById("gw-edit-btn");
updateBtn.addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postingId = urlParams.get("posting_id");
    const updateUrl = `${FRONT_BASE_URL}/community-update.html?posting_id=${postingId}`;
    window.location.replace(updateUrl);
});

// 삭제 버튼 클릭 시 handleDelteButtonClick 함수 호출
const deleteBtn = document.getElementById("gw-delete-btn");
deleteBtn.addEventListener("click", handleDelteButtonClick);

// DeletePosting으로 게시글 삭제
function handleDelteButtonClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSTING_ID = urlParams.get('posting_id');
    console.log("ok")
    DeletePosting(POSTING_ID);
}

// 댓글 작성 버튼 클릭 시 handleCommentWriteBtnClick 호출
const writeButton = document.getElementById("gw-w-comment");
writeButton.addEventListener("click", handleCommentWriteBtnClick);

// writeComment로 댓글 작성
function handleCommentWriteBtnClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const POSITING_ID = urlParams.get('posting_id');
    writeComment(POSITING_ID);
}

// 좋아요 버튼 기능
const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', async function () {
    likeButton.classList.toggle('liked');
    const urlParams = new URLSearchParams(window.location.search);
    const POSTING_ID = urlParams.get('posting_id');
    const url = `${BACK_BASE_URL}/posting/${POSTING_ID}/like/`
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
            'content': content
        })
    })
    const response_json = await response.json()
    console.log(response_json)
    const likeCount = document.querySelector('.like-count');
    likeCount.innerHTML = response_json.like_count
});



// // 댓글 수정 버튼 클릭 시 댓글 수정창 열기
// window.updateComment = function (event, commentId) {
//     // 수정버튼에서 가장가까운 상위 div = parent
//     const parent = event.target.closest('.gw-parent')
//     console.log(parent);
//     // parent의 하위 요소 중 form 찾기
//     const child = parent.querySelector("div .edit-form");
//     child.style.width = "100%"
//     child.style.display = "block"
// }
// const commentUpdateBtn = document.getElementById("gw-edit-btn");
// commentUpdateBtn.addEventListener("click", () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const postingId = urlParams.get("posting_id");
//     const updateUrl = `${FRONT_BASE_URL}/community-update.html?posting_id=${postingId}`;
//     window.location.replace(updateUrl);
// });

// // 댓글 삭제 버튼 클릭 시 handleDelteButtonClick 함수 호출
// const commentDeleteBtn = document.getElementById("gw-delete-btn");
// commentDeleteBtn.addEventListener("click", handleCommentDelteButtonClick);

// // deleteComment으로 게시글 삭제
// function handleCommentDelteButtonClick() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const POSTING_ID = urlParams.get('posting_id');
//     console.log("ok")
//     DeletePosting(POSTING_ID);
// }
