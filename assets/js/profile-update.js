import {
    loadProfileForUpdate,
    loadProfileAfterSignup,
} from './jeein_api.js';

// 로드 시 넣을 정보 가져와서 집어넣기
window.onload = async function PostingDetail() {

    const urlParams = new URLSearchParams(window.location.search);
    const USER_ID = urlParams.get('user_id');
    if (USER_ID != null) {
        loadProfileForUpdate(USER_ID)
    } else {
        loadProfileAfterSignup()
    }


}
