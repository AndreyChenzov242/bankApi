function ShowScramble() {
  setTimeout(() => {
    Scrambler({
      target: "#title-scramb",
      random: [500, 700],
      speed: 50,
      text: "Синхронізація платіжних доручень та виписок ",
      beforeEach: function () {
        $("#title-scramb").css({ "max-width": "100%" });
      },

      afterAll: function () {
        setTimeout(() => {
          Scrambler({
            target: "#title-scramb",
            random: [500, 700],
            speed: 50,
            text: "Залишки на рахунках в режимі онлайн",
            beforeEach: function () {
              $("#title-scramb").css({ "max-width": 500 });
            },
            afterAll: function () {
              setTimeout(() => {
                Scrambler({
                  target: "#title-scramb",
                  random: [500, 700],
                  speed: 50,
                  text: "отримання Курсів валют і котирування товарів",
                  beforeEach: function () {
                    $("#title-scramb").css({ "max-width": "100%" });
                  },
                  afterAll: function () {
                    setTimeout(() => {
                      Scrambler({
                        target: "#title-scramb",
                        random: [500, 700],
                        speed: 50,
                        text:
                          "інтернет-банкінг через улюблені Бухгалтерські програми",
                        beforeEach: function () {
                          $("#title-scramb").css({ "max-width": "100%" });
                        },
                      });
                    }, 5000);
                  },
                });
              }, 5000);
            },
          });
        }, 5000);
      },
    });
  }, 5000);
}

function ShowScrambleTmp() {
  setInterval(() => {
    ShowScramble();
  }, 25000);
}

ShowScramble();
ShowScrambleTmp();
