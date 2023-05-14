window.onload = async function loadArticles() {
  const response = await fetch("http://127.0.0.1:8000/product/2/review/ ", {
    method: "GET",
  });

  responseData  = await response.json();
  console.log(responseData);
// 리뷰를 생성하고 페이지에 추가하는 함수
function createReview(reviewData) {
  // 리뷰 컨테이너를 선택
  const reviewContainer = document.querySelector('.review-container');

  // 리뷰 HTML 템플릿을 생성
  const reviewTemplate = `
  <div class="col-8 col-12-medium imp-medium" data-review-id="${reviewData.id}">
    <div class="user-profile">
      <img src="profile-picture.jpg" alt="프로필 사진">
      <p class="jy-comment-username">${reviewData.username}</p>
    </div>
    <div class="rating">
      <div class="stars">${'&#9733;'.repeat(reviewData.score)}${'&#9734;'.repeat(5 - reviewData.score)}</div>
      <div class="review">${reviewData.content}</div>
    </div>
    <div class="review">
      <span class="date">${reviewData.date}</span>

      </div>
    </div>
    `;
  
    // 리뷰 템플릿을 DOM 요소로 변환
    const div = document.createElement('div');
    div.innerHTML = reviewTemplate;
    const reviewElement = div.firstChild;
  
    // 페이지에 리뷰 요소 추가
    reviewContainer.appendChild(reviewElement);
    };
  
  // responseData 배열의 각 데이터에 대해 리뷰를 생성하고 페이지에 추가
  responseData.forEach(createReview);

  }
  
  export const BACK_BASE_URL = "http://127.0.0.1:8000"
  export const FRONT_BASE_URL = "http://127.0.0.1:5500"
  const token = localStorage.getItem('access')








const likeButton = document.querySelector(".like-button");
likeButton.addEventListener("click", function () {
  likeButton.classList.toggle("liked");
});
