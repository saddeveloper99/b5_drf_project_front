export const BACK_BASE_URL = "http://127.0.0.1:8000";
export const FRONT_BASE_URL = "http://127.0.0.1:5500";
const token = localStorage.getItem("access");

// Product 리스트 GET 요청
export async function getProduct(PRODUCT_ID = null) {
  if (PRODUCT_ID == null) {
    const url = `${BACK_BASE_URL}/product/`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status == 200) {
      const response_json = await response.json();
      return response_json;
    } else {
      console.log("잠시 후 다시 시도해주세요");
    }
  }
}

// 게시글 목록 보여주기
export async function viewProductList() {
  const products = await getProduct();
  products.forEach((product) => {
    const template = document.createElement("div");
    template.setAttribute("class", "col-4 col-12-medium");
    // console.log(product)
    // 이미지 필드가 존재하는 경우에만 경로를 동적으로 변경
    let imagePath = "images/pic01.jpg"; // 기본 이미지 경로
    if (product.image) {
      imagePath = BACK_BASE_URL + "/" + product.image; // 이미지 경로를 적절히 수정해야 합니다.
    }
    console.log(product);
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
                            </div>`;
    const posting_list = document.getElementById("jy-product");
    posting_list.appendChild(template);

    /* 게시글 미리보기 엔터 연타 방지 */
    const pTags = document.querySelectorAll("p");
    for (let i = 0; i < pTags.length; i++) {
      if (pTags[i].childElementCount === 0) {
        pTags[i].parentNode.removeChild(pTags[i]);
      }
    }
  });
}

// 게시글 목록에서 클릭 시 상세페이지로 가기
window.productDetail = function (PRODUCT_ID) {
  window.location.href = `${FRONT_BASE_URL}/product-detail.html?product_id=${PRODUCT_ID}`;
  console.log(PRODUCT_ID);
};

// 게시글 상세 페이지 데이터 GET 요청 (유저 정보 포함)
export async function getProductDetail(PRODUCT_ID) {
  // console.log(POSTING_ID)
  const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (response.status == 200) {
    const response_json = await response.json();

    // 로그인 되있다면 payload에서 user_id를 받아 좋아요 여부 확인
    if (localStorage.getItem("payload")) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;
      response_json.isLiked = response_json.likes.includes(userId);
    }
    return response_json;
  } else {
    console.log("잠시 후 다시 시도해주세요");
  }
}

// 게시글 상세 페이지 보여주기
export async function viewProductDetail(product) {
  // console.log(posting)

  /* 게시글 */
  const name = document.getElementById("jy-name");
  name.innerHTML = product.name;

  const score = document.getElementById("jy-score");
  score.innerHTML = product.score;

  const intro = document.getElementById("jy-introduction");
  intro.innerHTML = product.introduction;

  const brand = document.getElementById("jy-brand");
  brand.innerHTML = product.brand;
}

// 리뷰 목록 GET 요청
export async function getProductReview(PRODUCT_ID) {
  // console.log(POSTING_ID)
  const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/review/`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    console.log("잠시 후 다시 시도해주세요");
  }
}

// 리뷰 detail GET 요청
export async function getProductReviewDetail(PRODUCT_ID,REVIEW_ID) {
    // console.log(POSTING_ID)
    const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/review/${REVIEW_ID}/`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const response_json = await response.json();
    console.log(response_json)
        // 로그인 되있다면 payload에서 user_id를 받아 좋아요 여부 확인
        if (localStorage.getItem("payload")) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.user_id;
            response_json.isLiked = response_json.likes.includes(userId);
        }
      return response_json;
    } else {
      console.log("잠시 후 다시 시도해주세요");
    }

  }

// 리뷰 목록 보여주기
export async function viewProductReview() {
  const urlParams = new URLSearchParams(window.location.search);
  const PRODUCT_ID = urlParams.get("product_id");
  const reviews = await getProductReview(PRODUCT_ID);

  reviews.forEach((review) => {
    const template = document.createElement("div");
    template.setAttribute("class", "jy-review");
    let profileimagePath = "images/default_profile.jpg"; // 기본 이미지 경로
    if (review.image && review.image !== "images/default_profile.jpg") {
      imagePath = BACK_BASE_URL + "/" + review.image;
    }
    // 로그인 되있다면 payload에서 user_id를 받아 좋아요 여부 확인
    if (localStorage.getItem("payload")) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.user_id;
        review.isLiked = review.likes.includes(userId);
    }
    else {
        review.isLiked = false
        console.log("review.isLiked : ",review.isLiked)
    }


    template.innerHTML = `<div class="user-profile">
          <img src="${profileimagePath}" alt="프로필 사진">
          <p class="jy-comment-username">${review.username}</p>
        </div>
    
        <div class="rating">
          <div class="stars">${"&#9733;".repeat(review.score)}</div>
          <div class="review">${review.content}</div>
        </div>
    
        <div class="review">
          <span class="date">2023-05-12</span>
          <button class="${review.isLiked ? "like-button liked" : "like-button"}" id="like-button-${review.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 21.35L3.54 12.82a6.25 6.25 0 0 1 0-8.84 6.25 6.25 0 0 1 8.84 0L12 5.67l.32-.29a6.25 6.25 0 0 1 8.84 0 6.25 6.25 0 0 1 0 8.84L12 21.35z" fill="#ccc"></path>
              <path class="like-icon" id="like-icon-${review.id}" 
              d="M12 21.35L3.54 12.82a6.25 6.25 0 0 1 0-8.84 6.25 6.25 0 0 1 8.84 0L12 5.67l.32-.29a6.25 6.25 0 0 1 8.84 0 6.25 6.25 0 0 1 0 8.84L12 21.35z" 
              ></path>
            </svg>
          </button>
        </div>
        <hr>`;

    const comment_list = document.getElementById("review-container");
    comment_list.appendChild(template);

    // 좋아요 버튼 클릭 이벤트 처리
    const likeButton = template.querySelector(`#like-button-${review.id}`);
    likeButton.addEventListener("click", async function () {
        likeButton.classList.toggle("liked");
        
        // 좋아요 상태 업데이트
        await ReviewLike(PRODUCT_ID,review.id);
    });
  });
}

export async function ProductLike(PRODUCT_ID) {
  const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/like/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    console.log("Request succeeded");
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

export async function ReviewLike(PRODUCT_ID, REVIEW_ID) {
  const url = `${BACK_BASE_URL}/product/${PRODUCT_ID}/review/${REVIEW_ID}/like/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    console.log("Request succeeded");
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}
