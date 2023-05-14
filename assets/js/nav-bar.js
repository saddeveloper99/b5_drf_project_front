window.addEventListener("load", function () {
    var header = document.querySelector('#header');
    console.log(header);
    const max = 7;
    const randomInt = Math.floor(Math.random() * (max)) + 1;
    console.log(randomInt)
    header.innerHTML += `<div id="logo">
                            <h1 class="afasfsa">
                                <a class="logobox" href="index.html">
                                    <img src="images/logos/logo${randomInt}.png" alt="">
                                </a>
                            </h1>
                            <span>by 가보장고</span>
                        </div>`
});
