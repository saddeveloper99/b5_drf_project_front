import { getEditPosting, updatePosting } from "./community-api.js";


// 게시글 수정 시 기본값을 입력해주는 함수
// getEditPosting으로 서버에서 GET요청해서 데이터를 받아온다
// 로드 시 게시글 상세 가져오기
window.onload = async function fillEditPosting() {
    const posting = await getEditPosting()
    const titleInput = document.querySelector("#gwTitle");
    console.log(posting)
    $('#summernote').summernote('code', posting.content);
    titleInput.value = posting.title;
}

// 수정 버튼을 클릭 시 handleUpdateButtonClick 호출
const updateBtn = document.getElementById("editButton");
updateBtn.addEventListener("click", handleUpdateButtonClick);

// UpdatePosting으로 게시글 수정
function handleUpdateButtonClick() {
    updatePosting();
}

