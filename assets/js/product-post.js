// 상품 등록 페이지


// 이미지 업로드
const inputFile = document.querySelector(".input-file");
const inputFileInfo = document.querySelector(".input-file__info");
const previewImage = document.querySelector(".preview-image");

inputFile.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        previewImage.src = reader.result;
    });

    if (file) {
        reader.readAsDataURL(file);
    }
});


// 등록 버튼
const form = document.getElementById('product-post-form');
const url = 'API 주소';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});


// 취소 버튼
const cancelButton = document.getElementById('cancel-btn');

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();

    history.back();
});