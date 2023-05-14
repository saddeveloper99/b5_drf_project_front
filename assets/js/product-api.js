export const BACK_BASE_URL = "http://127.0.0.1:8000"
export const FRONT_BASE_URL = "http://127.0.0.1:5500"
const token = localStorage.getItem('access')

// Product 리스트 GET 요청
export async function getProduct(PRODUCT_ID = null) {
    if (PRODUCT_ID == null) {
        const url = `${BACK_BASE_URL}/product/`
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
export async function viewProductList() {
    const products = await getProduct()
    products.forEach(product => {
        const template = document.createElement("div");
        template.setAttribute("class", "col-4 col-12-medium")
        // console.log(product)
        // 이미지 필드가 존재하는 경우에만 경로를 동적으로 변경
        let imagePath = "images/pic01.jpg"; // 기본 이미지 경로
        if (product.image) {
        imagePath = BACK_BASE_URL +"/"+ product.image; // 이미지 경로를 적절히 수정해야 합니다.
        }
        console.log(product)
        template.innerHTML = `<div class="col-4 col-12-medium" data-product-id="${product.id}">
                                <section class="box feature">
                                    <a onclick="productDetail(${product.id})" class="image featured"><img src="${imagePath}" alt="" /></a>
                                    <div class="inner">
                                        <header>
                                            <h2>${product.name}</h2>
                                            <h5>${product.brand}</h5>
                                            <h6>likes:${product.likes_count}</h6>
                                        </header>
                                    </div>
                                </section>
                            </div>`
        const posting_list = document.getElementById("jy-product")
        posting_list.appendChild(template)

        /* 게시글 미리보기 엔터 연타 방지 */
        const pTags = document.querySelectorAll('p');
        for (let i = 0; i < pTags.length; i++) {
            if (pTags[i].childElementCount === 0) {
                pTags[i].parentNode.removeChild(pTags[i]);
            }
        }

    });
}


// 게시글 목록에서 클릭 시 상세페이지로 가기
window.productDetail = function (PRODUCT_ID) {
    window.location.href = `${FRONT_BASE_URL}/product-detail.html?product_id=${PRODUCT_ID}`
    console.log(PRODUCT_ID)
}

// 게시글 상세 페이지 데이터 GET 요청 (유저 정보 포함)
export async function getProductDetail(PRODUCT_ID) {
    // console.log(POSTING_ID)
    const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/`
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


// 게시글 상세 페이지 보여주기
export async function viewProductDetail(product) {
    // console.log(posting)

    /* 게시글 */
    const name = document.getElementById('jy-name');
    name.innerHTML = product.name;

    const score = document.getElementById('jy-score');
    score.innerHTML = product.score;

    const intro = document.getElementById('jy-introduction');
    intro.innerHTML = product.introduction;

    const brand = document.getElementById('jy-brand');
    brand.innerHTML = product.brand;

    /* 작성자 */
    const writer = document.querySelectorAll('.gw-writer')
    writer.forEach(name => {
        name.innerHTML = posting.username;
    });

    const writerImages = document.querySelectorAll('.gw-w-img');
    writerImages.forEach(image => {
        image.src = posting.user_image;
    });

    const following = document.getElementById('gw-b-following')
    following.innerHTML = posting.followings_count

    const follower = document.getElementById('gw-b-follower')
    follower.innerHTML = posting.followers_count

    const introduction = document.getElementById('gw-banner-bio')
    introduction.innerHTML = posting.introduction

    const userId = document.getElementById('gw-writer-image')
    userId.setAttribute('data-user-id', posting.user_id);
}