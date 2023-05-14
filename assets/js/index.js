// 메인 피드 페이지

export const BACK_BASE_URL = "http://127.0.0.1:8000"
export const FRONT_BASE_URL = "http://127.0.0.1:5500"
const token = localStorage.getItem('access')

// #################### 게시글 리스트 ####################

// 게시글 리스트 GET 요청
export async function getPostings(POSTING_ID = null) {
    if (POSTING_ID == null) {
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
}

// 게시글 목록 보여주기 
export async function viewPostingList() {
    const postings = await getPostings()
    postings.forEach(posting => {
        const template = document.createElement("div");
        template.setAttribute("class", "gw-posting-each")
        console.log(posting.id)
        template.innerHTML = `<div class="row" data-posting-id="${posting.id}">
                                <div class="gw-click" onclick="postingDetail(${posting.id})" style="width: 100%;">
                                    <div style="display: flex;">
                                        <h3 class="gw-post-title">${posting.title}</h3>
                                    </div>
                                    <div class="gw-post-content">${posting.content}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="margin-right: 10px;">
                                        <img class="gw-main-writer-image" src="${posting.user_image}" alt="">
                                    </div>
                                    <div class="gw-post-writer">${posting.username}</div>
                                </div>
                                <div class="gw-main-comments-count">댓글 ${posting.comment_count}</div>
                                <div style="margin: 0 5% 0 0;">
                                    <object class="like-icon" data="assets/css/images/heart.svg" type="image/svg+xml"></object>
                                    <span class="gw-post-likes">${posting.like_count}</span>
                                </div>
                                </div>`
        const posting_list = document.getElementById("gw-container")
        posting_list.appendChild(template)

        /* 이미지 있을때, 이미지 태그 오른쪽으로 띄워주기위한 속성 설정 */
        const images = document.querySelectorAll(".gw-post-content p img")
        if (images != null) {
            for (let i = 0; i < images.length; i++) {
                images[i].setAttribute("class", "gw-summer-image")
                images[i].style.removeProperty("width");
            }
        }
        /* 게시글 미리보기 엔터 연타 방지 */
        const pTags = document.querySelectorAll('p');
        for (let i = 0; i < pTags.length; i++) {
            if (pTags[i].childElementCount === 0) {
                pTags[i].parentNode.removeChild(pTags[i]);
            }
        }
        /* 이미지 여러개 시 썸네일 1개만 표시하기? */
        console.log(images)
    });
}



// 게시글 목록에서 클릭 시 상세페이지로 가기
window.postingDetail = function (POSTING_ID) {
    window.location.href = `${FRONT_BASE_URL}/community-detail.html?posting_id=${POSTING_ID}`
    console.log(POSTING_ID)
}

