import {
    FRONT_BASE_URL,
    getProductDetail,
    viewProductDetail,
    getProductReview,
    viewProductReview,
    ProductLike,
    ReviewLike,
} from './product-api.js';

// 로드 시 게시글 상세 내용 + 댓글 가져오기
window.onload = async function PostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const PRODUCT_ID = urlParams.get('product_id');
    const product = await getProductDetail(PRODUCT_ID) /* posting에 게시글 작성 유저 정보도 포함(시리얼라이저) */
    const reviews = await getProductReview(PRODUCT_ID) /* posting에 게시글 작성 유저 정보도 포함(시리얼라이저) */
    viewProductDetail(product)
    viewProductReview(reviews)
    console.log(reviews)
    // 좋아요 여부에 따라 하트 아이콘 변경
    const likeIcon = document.querySelector('#product-like-icon');
    if (product.isLiked) {
        likeIcon.style.fill = '#ff5b5b'; // 채워진 하트 색상
    } else {
        likeIcon.style.fill = '#ccc'; // 비어있는 하트 색상
    }
}

const likeButton = document.querySelector('#product-like-button');
likeButton.addEventListener('click', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const PRODUCT_ID = urlParams.get('product_id');

  // 좋아요 상태 업데이트
  await ProductLike(PRODUCT_ID);

  // 상품 정보 다시 가져오기
  const product = await getProductDetail(PRODUCT_ID);

  // 좋아요 여부에 따라 하트 아이콘 변경
  const likeIcon = document.querySelector('#product-like-icon');
  if (product.isLiked) {
    likeIcon.style.fill = '#ff5b5b'; // 채워진 하트 색상
  } else {
    likeIcon.style.fill = '#ccc'; // 비어있는 하트 색상
  }
});
