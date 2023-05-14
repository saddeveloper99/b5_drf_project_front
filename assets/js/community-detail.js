import {
    FRONT_BASE_URL,
    getPostingDetail,
    getPostingComment,
    viewPostingDetail,
    viewPostingComment,
    DeletePosting,
    writeComment,
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

// 좋아요 버튼
const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('liked');
});

