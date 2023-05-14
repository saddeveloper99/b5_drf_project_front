// window.onload = () => {
//     console.log("로딩되었음")
// loadProfile(2)
// loadMypage(2)
//     // handleProfileUpdate()
// }
// loadProfileNotNew(3)
// loadNavMenu()

async function handleSignup() {
    const email = document.getElementById("ji_signup_email").value
    const password = document.getElementById("ji_signup_password").value
    // const password1 = document.getElementById("password1").value
    // const password2 = document.getElementById("password2").value
    const username = document.getElementById("username").value
    const gender = document.getElementById("gender").value
    const date_of_birth = document.getElementById("date_of_birth").value

    const response = await fetch('http://127.0.0.1:8000/user/signup/', {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "username": username,
            "gender": gender,
            "date_of_birth": date_of_birth
        })
    })

    // 회원가입 후 프로필 수정 페이지로 가입 정보를 전달하기 위해 로컬스토리지에 사용자 정보 저장
    const userInfo = {
        "email": email,
        "username": username,
        "gender": gender,
        "date_of_birth": date_of_birth,
    }

    localStorage.setItem("user-info", JSON.stringify(userInfo));

    // 회원가입 후 로그인 상태로 만들어주기(토큰을 로컬스토리지에 저장)
    const response_after_signup = await fetch("http://127.0.0.1:8000/user/login/", {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const response_json = await response_after_signup.json()

    localStorage.setItem("access", response_json.access)
    localStorage.setItem("refresh", response_json.refresh)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    localStorage.setItem("new", "True");

    window.location.href = "profile-update.html"
}

// 회원 가입 후 입력 정보를 프로필 수정 페이지로 
async function loadProfileAfterSignup() {
    if (localStorage.getItem("new") == "True") {
        localStorage.removeItem("new")
        const { email, username, gender, date_of_birth } = JSON.parse(localStorage.getItem("user-info"));
        localStorage.removeItem("user-info");
        console.log(email, username, gender, date_of_birth);

        const profile_email = document.getElementById("ji_profile_email");
        profile_email.innerText = email;
        const profile_username = document.getElementById("ji_profile_username");
        profile_username.setAttribute("placeholder", username);
        const profile_date_or_birth = document.getElementById("ji_profile_date_of_birth");
        profile_date_or_birth.setAttribute("placeholder", date_of_birth);
        if (gender == "F") {
            const option_female = document.getElementById("ji_option_female");
            option_female.setAttribute("selected", "selected");
        } else {
            const option_male = document.getElementById("ji_option_male");
            option_male.setAttribute("selected", "selected");
        }
    }
    else { }
}


async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const response = await fetch("http://127.0.0.1:8000/user/login/", {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const response_json = await response.json()

    localStorage.setItem("access", response_json.access)
    localStorage.setItem("refresh", response_json.refresh)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    const payload_parse = JSON.parse(jsonPayload)

    // 로그인 성공하면 메인페이지로 가기
    window.location.href = "index.html"

}


async function handleMock() {

    const response = await fetch('http://127.0.0.1:8000/user/mock/', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET",
    })

    console.log(response)
}

// 이미지 오류
async function handleProfileUpdate() {
    const email = JSON.parse(localStorage.getItem("payload")).email
    // const image = document.getElementById("file").files[0].name
    const username = document.getElementById("ji_profile_username").value
    const password = document.getElementById("ji_profile_password").value
    const gender = document.getElementById("ji_profile_gender").value
    const date_of_birth = document.getElementById("ji_profile_date_of_birth").value
    const preference = document.getElementById("ji_profile_preference").value
    const introduction = document.getElementById("ji_profile_introduction").value

    console.log(password, username, gender, date_of_birth, preference, introduction, image);

    const response = await fetch('http://127.0.0.1:8000/user/profile/', {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: JSON.stringify({
            "email": email,
            // "image": image,
            "password": password,
            "username": username,
            "gender": gender,
            "preference": preference,
            "introduction": introduction
        })
    })

    // 프로필 수정 성공하면 메인페이지로 가기
    // window.location.href = "index.html"

}

async function loadProfile(user_id) {
    const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, { method: "GET" })

    response_json = await response.json()

    const profile_image = document.getElementById("profile_image");
    profile_image.setAttribute("src", `http://127.0.0.1:8000${response_json.image}`);
    const profile_username = document.getElementById("profile_username");
    const profile_followers_count = document.getElementById("profile_followers_count");
    profile_followers_count.innerText = response_json.followers_count;
    const profile_followings_count = document.getElementById("profile_followings_count");
    profile_followings_count.innerText = response_json.followings_count;
    const profile_email = document.getElementById("profile_email");
    profile_email.innerText = response_json.email;
    const profile_introduction = document.getElementById("profile_introduction");
    profile_introduction.innerText = response_json.introduction;
    const profile_gender = document.getElementById("profile_gender");
    if (response_json.gender == "F") {
        profile_gender.innerText = "여성";
    } else {
        profile_gender.innerText = "남성";
    }
    profile_username.innerText = response_json.username + "의 프로필";
    const profile_date_of_birth = document.getElementById("profile_date_of_birth");
    profile_date_of_birth.innerText = response_json.date_of_birth;
    const profile_preference = document.getElementById("profile_preference");
    profile_preference.innerText = response_json.preference;
}

async function loadMypage(user_id) {
    const response = await fetch(`http://127.0.0.1:8000/user/mypage/${user_id}/`, { method: "GET" })

    response_json = await response.json()

    const postings = document.getElementById("profile_posting")

    const profile_postings_count = document.getElementById("profile_postings_count");
    profile_postings_count.innerText = response_json.posting_set.length;
    const profile_reviews_count = document.getElementById("profile_reviews_count");
    profile_reviews_count.innerText = response_json.productreview_set.length;

    console.log(response_json.posting_set)

    response_json.posting_set.slice(0, 5).forEach(element => {
        const list = document.createElement("li")
        const new_posting = document.createElement("a")
        new_posting.setAttribute("href", "#")
        new_posting.innerText = element.title
        list.appendChild(new_posting)
        postings.appendChild(list)
    })

    const reviews = document.getElementById("profile_review")

    response_json.productreview_set.slice(0, 5).forEach(element => {
        const list = document.createElement("li")
        const new_review = document.createElement("a")
        new_review.setAttribute("href", "#")
        new_review.innerText = element.content
        list.appendChild(new_review)
        reviews.appendChild(list)

    })

}


async function loadProfileNotNew(user_id) {
    const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, { method: "GET" })
    response_json = await response.json()
    // console.log(response_json)

    const profile_email = document.getElementById("ji_profile_email");
    profile_email.innerText = response_json.email;

    const profile_username = document.getElementById("ji_profile_username");
    profile_username.setAttribute("placeholder", response_json.username);

    const profile_date_or_birth = document.getElementById("ji_profile_date_of_birth");
    profile_date_or_birth.setAttribute("placeholder", response_json.date_of_birth);

    if (response_json.gender == "F") {
        const option_female = document.getElementById("ji_option_female");
        option_female.setAttribute("selected", "selected");
    } else {
        const option_male = document.getElementById("ji_option_male");
        option_male.setAttribute("selected", "selected");
    }

    const profile_image = document.getElementById("profile_image");
    if (response_json.image == null) {
        profile_image.setAttribute("src", "images/happy_rtan.gif");
    } else {
        profile_image.setAttribute("src", `http://127.0.0.1:8000${response_json.image}`);
    }

    const profile_followers_count = document.getElementById("profile_followers_count");
    profile_followers_count.innerText = response_json.followers_count;

    const profile_followings_count = document.getElementById("profile_followings_count");
    profile_followings_count.innerText = response_json.followings_count;

    const profile_introduction = document.getElementById("ji_profile_introduction");
    const profile_introduction_up = document.getElementById("profile_introduction");
    if (response_json.introduction == null) {
        profile_introduction.setAttribute("placeholder", "자기소개");
        profile_introduction_up.innerText = "자기소개를 작성해주세요.";
    } else {
        profile_introduction.setAttribute("placeholder", response_json.introduction);
        profile_introduction_up.innerText = response_json.introduction;
    }

    const profile_date_of_birth = document.getElementById("ji_profile_date_of_birth");
    profile_date_of_birth.setAttribute("placeholder", response_json.date_of_birth);

    const profile_preference = document.getElementById("ji_profile_preference");
    if (response_json.preference == null) {
        profile_preference.setAttribute("placeholder", "선호 음료");
    } else {
        profile_preference.setAttribute("placeholder", response_json.preference);
    }

    const response_writings = await fetch(`http://127.0.0.1:8000/user/mypage/${user_id}/`, { method: "GET" })

    response_json = await response_writings.json()

    const profile_postings_count = document.getElementById("profile_postings_count");
    profile_postings_count.innerText = response_json.posting_set.length;
    const profile_reviews_count = document.getElementById("profile_reviews_count");
    profile_reviews_count.innerText = response_json.productreview_set.length;

}


function loadNavMenu() {

    menu = document.getElementById("ji_login_logout")
    if (localStorage.getItem("access") != null) {
        // menu.remove()
        menu.innerText = "Welcome!"
    } else {
        menu.innerText = "LogIn/SignUp"
    }
}


function handleLogout() {
    localStorage.removeItem("refresh")
    localStorage.removeItem("access")
    localStorage.removeItem("payload")

    window.location.href = "index.html"

}

// 회원 탈퇴 후 로그아웃
async function handleDeactivate() {

    const response = await fetch(`http://127.0.0.1:8000/user/profile/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "DELETE"
    })
    handleLogout()
    response_json = await response.json()
    console.log(response_json)
}


//팔로우 리스트 페이지 로드
async function loadFollowList() {

    const response = await fetch(`http://127.0.0.1:8000/user/follow/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET"
    })

    response_json = await response.json()

    const follower_count = document.getElementById("ji_follower_count");
    follower_count.innerText = "Follower " + response_json[0].followers_count + "명";

    const following_count = document.getElementById("ji_following_count");
    following_count.innerText = "Following " + response_json[0].followings_count + "명";

    const followers = Object.values(response_json[2])

    followers.forEach(follower => {

        const template = document.createElement("section");
        template.setAttribute("class", "box feature-ji")
        if (follower[2] == '') {
            template.innerHTML = `
        <div class="row">
            <div class="col-4" style="margin-bottom: -4%;">
                <a href="#">
                    <div class="image featured-ji">
                        <img src="images/happy_rtan.gif" alt="" />
                    </div>
                </a>
            </div>
            <div class="col-8">
                <h3 style="margin-bottom: 0;">${follower[0]}</h3>
                <p style="margin-bottom: 10%;">${follower[1]}</p>
                <button type="button" class="button alt"
                    style="float: right; margin:3% 5% 5% 0;" onclick="handleFollow(${follower[3]})">팔로우</button>
            </div>
        </div>
    </section>`} else {
            {
                template.innerHTML = `
            <div class="row">
                <div class="col-4" style="margin-bottom: -4%;">
                    <a href="#">
                        <div class="image featured-ji">
                            <img src="http://127.0.0.1:8000/media/${follower[2]}/" alt="" />
                        </div>
                    </a>
                </div>
                <div class="col-8">
                    <h3 style="margin-bottom: 0;">${follower[0]}</h3>
                    <p style="margin-bottom: 10%;">${follower[1]}</p>
                    <button type="button" class="button alt"
                        style="float: right; margin:3% 5% 5% 0;" onclick="handleFollow(${follower[3]})">팔로우</button>
                </div>
            </div>
        </section>`}
        }
        const follower_list = document.getElementById("ji_follower-container")
        follower_list.appendChild(template)
    })

    const followings = Object.values(response_json[1])

    followings.forEach(following => {

        const template = document.createElement("section");
        template.setAttribute("class", "box feature-ji")
        if (following[2] == '') {
            template.innerHTML = `
        <div class="row">
            <div class="col-4" style="margin-bottom: -4%;">
                <a href="#">
                    <div class="image featured-ji">
                        <img src="images/happy_rtan.gif" alt="" />
                    </div>
                </a>
            </div>
            <div class="col-8">
                <h3 style="margin-bottom: 0;">${following[0]}</h3>
                <p style="margin-bottom: 10%;">${following[1]}</p>
                <button type="button" class="button alt"
                    style="float: right; margin:3% 5% 5% 0; color: crimson;" onclick="handleFollow(${following[3]})">팔로우 취소</button>
            </div>
        </div>
    </section>`} else {
            {
                template.innerHTML = `
            <div class="row">
                <div class="col-4" style="margin-bottom: -4%;">
                    <a href="#">
                        <div class="image featured-ji">
                            <img src="http://127.0.0.1:8000/media/${following[2]}/" alt="" />
                        </div>
                    </a>
                </div>
                <div class="col-8">
                    <h3 style="margin-bottom: 0;">${following[0]}</h3>
                    <p style="margin-bottom: 10%;">${following[1]}</p>
                    <button type="button" class="button alt"
                        style="float: right; margin:3% 5% 5% 0; color: crimson;" onclick="handleFollow(${following[3]})">팔로우 취소</button>
                </div>
            </div>
        </section>`}
        }
        const following_list = document.getElementById("ji_following-container")
        following_list.appendChild(template)
    })

}


async function handleFollow(user_id) {

    const response = await fetch(`http://127.0.0.1:8000/user/follow/${user_id}/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST"
    })

    window.location.href = "follow-list.html"

}


// 마이피드페이지 로드
async function loadMyfeed() {

    // 팔로우한 사람들이 작성한 게시글과 리뷰 정보 가져오기
    const response = await fetch(`http://127.0.0.1:8000/user/myfeed/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET"
    })

    response_json = await response.json()

    // 팔로우한 사람들의 게시글(게시글 제목)
    const follow_postings = document.getElementById("ji_myfeed_posting")

    const postings = response_json[0]
    postings.slice(0, 5).forEach(posting => {
        const list = document.createElement("li")
        const new_posting = document.createElement("a")
        new_posting.setAttribute("href", "#")
        new_posting.innerText = posting.title
        list.appendChild(new_posting)
        follow_postings.appendChild(list)

    })

    //팔로우한 사람들의 리뷰(리뷰 내용)
    const follow_reviews = document.getElementById("ji_myfeed_review")

    const reviews = response_json[1]
    reviews.slice(0, 5).forEach(element => {
        const list = document.createElement("li")
        const new_review = document.createElement("a")
        new_review.setAttribute("href", "#")
        new_review.innerText = element.content
        list.appendChild(new_review)
        follow_reviews.appendChild(list)

    })

    // 좋아요한 게시글, 상품, 리뷰 정보 가져오기
    const response_like = await fetch(`http://127.0.0.1:8000/user/myfeed/like/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET"
    })

    response_json = await response_like.json()

    // 좋아요한 게시글(게시글 제목)
    const like_postings = document.getElementById("ji_myfeed_like_posting")

    const myfeed_like_postings = response_json[1]
    myfeed_like_postings.slice(0, 5).forEach(posting => {
        const list = document.createElement("li")
        const new_posting = document.createElement("a")
        new_posting.setAttribute("href", "#")
        new_posting.innerText = posting.title
        list.appendChild(new_posting)
        like_postings.appendChild(list)

    })

    // 좋아요한 상품(상품명)
    const like_products = document.getElementById("ji_myfeed_like_product")

    const myfeed_like_products = response_json[0].like_products

    myfeed_like_products.slice(0, 5).forEach(element => {
        const list = document.createElement("li")
        const new_product = document.createElement("a")
        new_product.setAttribute("href", "#")
        new_product.innerText = element.name
        list.appendChild(new_product)
        like_products.appendChild(list)

    })

    // 좋아요한 리뷰(리뷰 내용)
    const like_reviews = document.getElementById("ji_myfeed_like_review")

    const myfeed_like_reviews = response_json[0].like_reviews

    myfeed_like_reviews.slice(0, 5).forEach(element => {
        const list = document.createElement("li")
        const new_review = document.createElement("a")
        new_review.setAttribute("href", "#")
        new_review.innerText = element.content
        list.appendChild(new_review)
        like_reviews.appendChild(list)

    })
}