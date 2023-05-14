import {
    FRONT_BASE_URL,
    getProductDetail,
    viewProductDetail,
} from './product-api.js';

// 로드 시 게시글 상세 내용 + 댓글 가져오기
window.onload = async function PostingDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const PRODUCT_ID = urlParams.get('product_id');
    const product = await getProductDetail(PRODUCT_ID) /* posting에 게시글 작성 유저 정보도 포함(시리얼라이저) */
    viewProductDetail(product)
    console.log(product)
}
