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
// 취소 버튼