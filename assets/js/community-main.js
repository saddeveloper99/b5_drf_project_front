import { viewPostingList } from './community-api.js';

// 로드 시 게시글 목록 가져오기
window.onload = async function handlePostingList() {
    viewPostingList();
}

// 글쓰기 버튼 클릭 시 작성페이지로 이동
// const writeBtn = document.getElementById("editButton");
// writeBtn.addEventListener("click", handleWriteButtonClick);

/* if token으로 작성 권한 1차적으로 걸러내기
여기서 넘어가도 토큰이 유효한지 작성버튼 누를 때 다시 검사함 */