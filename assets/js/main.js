const colors = ["#e71c99", "#ff602e", "#fc9b02", "#fac403", "#6fcc12", "#199bd3", "#3c34e4", "#8d01f8"];
const listGift = [
  {
    name: "Luc 1",
    percent: 15 / 100,
    image: "./assets/img/product-1.png",
    prize: "Tesst",
  },
  {
    name: "Luc 2",
    percent: 15 / 100,
    image: "./assets/img/product-2.png",
    prize: "Tesst",
  },
  {
    name: "Luc 3",
    percent: 10 / 100,
    image: "./assets/img/product-3.png",
    prize: "Tesst",
  },
  {
    name: "Luc 4",
    percent: 10 / 100,
    image: "./assets/img/product-4.png",
    prize: "Tesst",
  },
  {
    name: "Luc 5",
    percent: 15 / 100,
    image: "./assets/img/product-1.png",
    prize: "Tesst",
  },
  {
    name: "Luc 6",
    percent: 15 / 100,
    image: "./assets/img/product-2.png",
    prize: "Tesst",
  },
  {
    name: "Luc 7",
    percent: 10 / 100,
    image: "./assets/img/product-3.png",
    prize: "Tesst",
  },
  {
    name: "Luc 8",
    percent: 10 / 100,
    image: "./assets/img/product-4.png",
    prize: "Tesst",
  },
];
(() => {
  const $ = document.querySelector.bind(document);
  const wheel = $(".wheel");
  const btnSpin = $(".spin-btn");
  let timer = 7000; // Thời gian cho mỗi lần quay
  let isRotating = false; // Đang quay hay không?
  let currentRotate = 0;
  const giftSize = listGift.length;
  const rotate = 360 / giftSize;
  const skewY = 90 - rotate; // Độ nghiêng của 1 item
  const renderGift = () => {
    listGift.forEach((item, index) => {
      const itemGift = document.createElement("li");
      itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
      itemGift.innerHTML = `
                <p class="text-item" style="
                    background-color: ${colors[index % colors.length]};
                    transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                ">
                    <b>${item.name}</b>
                </p>
                <img class="wheel-img" src="${item.image}"
                    style="
                        left: ${rotate / 4}px;
                        bottom: ${rotate / 2}px;
                        transform: skewY(${skewY}deg);
                        display: none
                " />
            `;
      wheel.appendChild(itemGift);
    });
  };
  const rotateWheel = (currentRotate, index) => {
    wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
  };
  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];
    listGift.forEach((item, index) => {
      currentPercent += item.percent;
      randomNumber <= currentPercent &&
        list.push({
          ...item,
          index,
        });
    });
    return list[0];
  };
  const showGift = (gift) => {
    setTimeout(() => {
      isRotating = false;
      Swal.fire({
        title: `Chúc mừng bạn ${gift.name} đã trúng ${gift.prize}`,
        // imageUrl: gift.image,
        imageHeight: 200,
      });
    }, timer);
  };
  const spinner = () => {
    isRotating = true;
    const gift = getGift(Math.random());
    currentRotate += 360 * 10;
    rotateWheel(currentRotate, gift.index);
    showGift(gift);
  };
  btnSpin.addEventListener("click", () => {
    !isRotating && spinner();
  });
  renderGift();
})();
function resize() {
  var width = $(window).width();
  document.documentElement.style.setProperty("--size", width > 600 ? "500px" : width / 1.1 - 32 + "px");
}
resize();
