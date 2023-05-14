export async function loadProfile(user_id) {
    const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, { method: "GET" })
    console.log(response)
    const response_json = await response.json()

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

export async function loadMypage(user_id) {

    const response = await fetch(`http://127.0.0.1:8000/user/mypage/${user_id}/`, { method: "GET" })

    const response_json = await response.json()

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


export async function loadProfileForUpdate(user_id) {
    const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, { method: "GET" })
    const response_json = await response.json()

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

    const response_json_ = await response_writings.json()

    const profile_postings_count = document.getElementById("profile_postings_count");
    profile_postings_count.innerText = response_json_.posting_set.length;
    const profile_reviews_count = document.getElementById("profile_reviews_count");
    profile_reviews_count.innerText = response_json_.productreview_set.length;

}



export async function loadProfileAfterSignup() {
    if (localStorage.getItem("new") == "True") {
        localStorage.removeItem("new")
        const { email, username, gender, date_of_birth } = JSON.parse(localStorage.getItem("user-info"));
        localStorage.removeItem("user-info");
        // console.log(email, username, gender, date_of_birth);

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