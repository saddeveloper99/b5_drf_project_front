export const BACK_BASE_URL = "http://127.0.0.1:8000"
export const FRONT_BASE_URL = "http://127.0.0.1:5500"
const token = localStorage.getItem('access')

// 게시글 리스트 GET 요청
export async function getPostings() {
    const url = `${BACK_BASE_URL}/posting/`
    const response = await fetch(url, {
        method: 'GET'
    })

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        console.log("잠시 후 다시 시도해주세요")
    }
}

// 게시글 상세 GET 요청
export async function getPostingDetail(POSITING_ID) {
    console.log(POSITING_ID)
    const url = `${BACK_BASE_URL}/posting/${POSITING_ID}/`
    const response = await fetch(url, {
        method: 'GET'
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        console.log("잠시 후 다시 시도해주세요")
    }
}

window.postingDetail = function (POSITING_ID) {
    window.location.href = `${FRONT_BASE_URL}/community-detail.html?posting_id=${POSITING_ID}`
    console.log(POSITING_ID)
}

export async function getWriter(POSITING_ID) {
    console.log(POSITING_ID)
    const url = `${BACK_BASE_URL}/posting/${POSITING_ID}/`
}

// 게시글 작성 POST 요청
export async function writePosting() {
    const gwTitle = document.getElementById('gwTitle').value;
    const summernote = $('#summernote').summernote('code');

    const formdata = new FormData();
    formdata.append('title', gwTitle);
    formdata.append('content', summernote);

    /* value 확인하기 */
    for (let value of formdata.values()) {
        console.log(value);
    }

    const url = `${BACK_BASE_URL}/posting/`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })

    if (response.status == 201) {
        alert("작성 완료");
        window.location.replace(`${FRONT_BASE_URL}/community-main.html`);
    }
}


// 댓글 작성 POST 요청
export async function writeComment(POSITING_ID) {
    const url = `${BACK_BASE_URL}/posting/${POSITING_ID}/comment/`;
    const content = document.getElementById('post-comment').value;
    console.log(content)

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
    if (response.status == 201) {
        alert("작성 완료");
        window.location.reload()
    }
}

// 댓글 목록 GET 요청
export async function getPostingComment(POSITING_ID) {
    console.log(POSITING_ID)
    const url = `${BACK_BASE_URL}/posting/${POSITING_ID}/comment/`
    const response = await fetch(url, {
        method: 'GET'
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        console.log("잠시 후 다시 시도해주세요")
    }
}