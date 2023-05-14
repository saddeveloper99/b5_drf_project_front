import {
    loadProfile,
    loadMypage,
} from './jeein_api.js';

// 로드 시 마이페이지에 넣을 정보 가져와서 집어넣기
window.onload = async function PostingDetail() {

    const urlParams = new URLSearchParams(window.location.search);
    const USER_ID = urlParams.get('user_id');

    loadMypage(USER_ID)
    loadProfile(USER_ID)

}