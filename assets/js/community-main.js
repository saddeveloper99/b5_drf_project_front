import { FRONT_BASE_URL, getPostings } from './community-api.js';

window.postingDetail = function (POSITING_ID) {
    window.location.href = `${FRONT_BASE_URL}/community-detail.html?posting_id=${POSITING_ID}`
    console.log(POSITING_ID)
}

window.onload = async function communityPostingList() {
    const postings = await getPostings()
    postings.forEach(posting => {
        const template = document.createElement("div");
        console.log(posting.id)
        template.innerHTML = `<div class="row" data-posting-id="${posting.id}" style="margin-bottom: 5%;">
                                <div class="gw-click" onclick="postingDetail(${posting.id})" style="width: 70%;">
                                <div style="display: flex;">
                                <h3 class="gw-post-title">${posting.title}</h3>
                                </div>
                                <div class="gw-post-content">${posting.content}</div>
                                </div>
                                <div class="gw-write-image-container">
                                <img class="gw-write-image" src="${posting.image}" alt="">
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
    });
}
