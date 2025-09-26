function createDiv(name, occ, i){
    const target = document.getElementById(occ);
    const newDiv = document.createElement('div');
    const newText = document.createElement('div');
    newText.innerText = name;
    newText.classList.add("nameTag");
    newDiv.appendChild(newText);
    newDiv.classList.add("item");
    newDiv.dataset.star = `${i+1}star`;
    newDiv.dataset.name = name;
    target.appendChild(newDiv);
};//캐릭터 칸 더하기

let finCnt = 0;

document.getElementsByTagName("form")[0].onsubmit = function(e){
    e.preventDefault();
    let starTarget = [
        this.one.checked,this.two.checked,
        this.three.checked,this.four.checked,
        this.five.checked,this.six.checked
    ]
    let posTarget = [
        this.vanguard.checked,this.guard.checked,
        this.defender.checked,this.sniper.checked,
        this.supporter.checked,this.specialist.checked
    ]


    let starCheck = false;
    let posCheck = false;
    starTarget.forEach((val) => {
        if(val) starCheck = true;
    })
    posTarget.forEach((val) => {
        if(val) posCheck = true;
    })
    if(!starCheck || !posCheck){
        warn2();
        return;
    }

    for(let i = 5; i >= 0; i--){
        if(starTarget[i]){
            memList[i].forEach((val) => {
                if(!this[val[1]].checked) return;
                if(!val || val[0].length == 0) return;
                const target = document.getElementById(val[1]);
                if(!target) return;

                const newDiv = document.createElement('div');
                const newText1 = document.createElement('p');
                const newText2 = document.createElement('p');
                const newText3 = document.createElement('p');
                newDiv.innerText = `${"★".repeat(i+1)}    `;
                newDiv.style.whiteSpace = "pre";
                newDiv.classList.add("scoreboard");
                newDiv.dataset.scoreboard = `${i+1}star`;
                newText1.innerText = 0;
                newText1.classList.add("curr");
                newText2.innerText = ` / `;
                newText2.style.whiteSpace = "pre";
                newText3.innerText = `${val[0].length}`;
                newText3.classList.add("whole");
                newDiv.appendChild(newText1);
                newDiv.appendChild(newText2);
                newDiv.appendChild(newText3);
                target.appendChild(newDiv);
                finCnt += 1;

                val[0].forEach(function(name){
                    createDiv(name, val[1], i);
                });

            });
        }
    }; //선택한 오퍼들 추가하기

    document.querySelectorAll(".container").forEach((val) => {
        if (val.querySelectorAll(".scoreboard").length === 0) {
            val.remove();
        }
    }); // 비어있는 직군들 지우기

    let form = document.getElementById("overlay");
    form.style.display = "none";

}


//====================================================== 여기서부터 입력 확인하는 부분

const inputEl = document.getElementById("searchInput");

inputEl.addEventListener("beforeinput", (e) => {
    const inputValue = inputEl.value;
    const target = document.querySelector(`div[data-name='${inputValue}']`);

    if(target){
        if (!target.classList.contains("check")){
            const occ = target.parentElement;
            const scoreboard = occ.querySelector(`[data-scoreboard="${target.dataset.star}"]`);
            const scoreNow = scoreboard.getElementsByClassName("curr")[0];
            const scoreWhole = scoreboard.getElementsByClassName("whole")[0];
            scoreNow.innerText = Number(scoreNow.innerText) + 1;
            if(scoreNow.innerText == scoreWhole.innerText){
                scoreboard.style.backgroundColor = "green";
                scoreboard.style.color = "white";
                finCnt -= 1;
                if(finCnt == 0){
                    console.log("finished!");
                    frame();
                }
            }
            target.style.backgroundImage = `url("./charimgs/${target.dataset.star}/${inputValue.replace(/ /g,"")}.webp")`;
            //파일명에 띄어쓰기 없어서 정규식으로 공백 지워준거임 (replace)
            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            target.getElementsByClassName("nameTag")[0].style.display = "block";
            setTimeout(() => inputEl.value = "", 0);
            target.classList.add("check");
        }else{
            if(!target.classList.contains("check2")){
                target.classList.add("check2");
            }else{
                console.log(target);
                if (e.inputType.startsWith("insert")){
                    setTimeout(() => warn(), 0);
                }
            }
        }
    }
});

function warn(){
    document.getElementById("dupCheck").style.display = "block";
    setTimeout(() => document.getElementById("dupCheck").style.display = "none", 1000);
}

function warn2(){
    document.getElementById("warn").style.display = "block";
    setTimeout(() => document.getElementById("warn").style.display = "none", 1000);
}
//================================================== 이미지 preload하기

// 페이지 로딩 완료 후 실행
(function preloadImages() {
    const loaded = [];
    for (let i = 0; i < memList.length; i++) {
        memList[i].forEach(val => {
            if (!val || !val[0] || val[0].length === 0) return;
            val[0].forEach(name => {
                // 파일명에서 공백 제거
                const fileName = name.replace(/ /g, "");
                const src = `./charimgs/${i+1}star/${fileName}.webp`;
                const img = new Image();
                img.src = src;
                loaded.push(img);
            });
        });
    }
    console.log(`✅ ${loaded.length} images preloaded`);
})();

//==================================================== 컨페티 코드 긁어오기
 //https://github.com/catdad/canvas-confetti?tab=readme-ov-file

var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
    colors: ['#ffe7db', '#162e5b', '#018577', '#8be3dc']
  });
}

function frame(){
    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    fire(0.2, {
    spread: 60,
    });
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}
