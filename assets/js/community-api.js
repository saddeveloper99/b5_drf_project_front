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

