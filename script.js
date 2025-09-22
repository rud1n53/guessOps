let testTarget = [true,true,true,true,true,true]

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

for(let i = 5; i >= 0; i--){
    if(testTarget[i]){
        memList[i].forEach(function(val){
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

            val[0].forEach(function(name){
                createDiv(name, val[1], i);
            });

        });
    }
};


//======================================================

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
            }
            target.style.backgroundImage = `url("./charimgs/${target.dataset.star}/${inputValue.replace(/ /g,"")}.webp")`;
            //파일명에 띄어쓰기 없어서 정규식으로 공백 지워준거임 (replace)
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