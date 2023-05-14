import { getPostings, FRONT_BASE_URL, token } from './community-api.js';

// 로드 시 게시글 목록 가져오기
window.onload = async function handlePostingList() {
    getPostings();
}

// 글쓰기 버튼 클릭 시 작성페이지로 이동
const writeBtn = document.getElementById("gw-gowrite");
writeBtn.addEventListener("click", () => {

    /* if token으로 작성 권한 1차적으로 걸러내기
    여기서 넘어가도 토큰이 유효한지 작성버튼 누를 때 다시 검사함 */
    if (token) {
        window.location.href = `${FRONT_BASE_URL}/community-write.html`;
    }
    else {
        alert("로그인한 사용자만 작성할 수 있습니다!")
    }
});

