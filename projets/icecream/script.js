const tast_btns = document.querySelectorAll(".choice__btn");
const place_btn = document.querySelector(".place__btn");
const glace = document.querySelector(".glace");
const glacePicture = document.querySelector(".glace-picture");
const glaceSource = glacePicture ? glacePicture.querySelector("source") : null;
const glace2 = document.querySelector(".poster__glace");
const posterPicture = document.querySelector(".poster-picture");
const posterSource = posterPicture ? posterPicture.querySelector("source") : null;
const btnLetter = document.querySelector(".search__button");
const textGlace = document.querySelector(".text__glace");

tast_btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("choice__btn")) {
      tast_btns.forEach((btn) => btn.classList.remove("win"));
      e.target.classList.add("win");
      const color = e.target.dataset.color;
      const link = e.target.dataset.src;
      if (glaceSource) glaceSource.srcset = `img/glace-${link}.webp`;
      if (glace) glace.src = `img/glace-${link}.png`;
      if (posterSource) posterSource.srcset = `img/glace-${link}.webp`;
      if (glace2) glace2.src = `img/glace-${link}.png`;

      console.log(btnLetter, color);
      btnLetter.style.backgroundColor = getComputedStyle(
        e.target
      ).backgroundColor;
      textGlace.style.backgroundColor = getComputedStyle(
        e.target
      ).backgroundColor;
    }
  })
);

const chargement = setTimeout(function () {
  document.querySelector(".loading").classList.add("hidden");
  document.querySelector(".content__1").classList.remove("hidden");
}, 5000);