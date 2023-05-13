export const BACK_BASE_URL = "http://127.0.0.1:8000"
export const FRONT_BASE_URL = "http://127.0.0.1:5500"


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

export async function writePosting() {
    const gwTitle = document.getElementById('gwTitle').value;
    const summernote = document.getElementById('summernote').value;

    let token = localStorage.getItem("access")

    const formdata = new FormData();
    formdata.append('gwTitle', gwTitle);
    formdata.append('gwContent', summernote);
    const url = `${BACK_BASE_URL}/posting/`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })

    if (response.status == 200) {
        alert("작성 완료");
        window.location.replace(`${FRONT_BASE_URL}/`);
    }
}