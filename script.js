let memVan6 = ["시즈", "백파이프", "사가", "사일라흐", "플레임테일", "비질", "이네스", "뮤엘시스", "불피스폴리아"];
let memGuard6 = ["실버애쉬", "스카디", "첸", "헬라그", "블레이즈", "쏜즈", "수르트", "마운틴", "팔라스", "니어 더 래디언트 나이트", "아이린", "가비알 디 인빈서블", "무에나", "총웨", "치우바이", "이그제큐터 디 엑스 포에데레", "외드레르", "레싱", "비비아나", "데겐블레허", "좌락", "울피아누스", "페페", "비나 빅토리아", "엔텔레키아", "레이즈 더 썬더브링어", "토가와 사키코"];
let memDefend6 = ["호시구마", "사리아", "니엔", "유넥티스", "블레미샤인", "머드락", "혼", "페넌스", "제시카 더 리버레이티드", "슈", "위", "산크타 믹사파라토", "호시구마 더 브리처"];
let memSnipe6 = ["엑시아", "슈바르츠", "W", "로사", "로즈몬티스", "아르케토", "Ash", "첸 더 홀룽데이", "파투스", "피아메타", "파죰카", "티폰", "레이", "위셔델", "나란투야", "르무엔"];
let memCast6 = ["이프리트", "에이야퍄들라", "모스티마", "케오베", "시", "패신저", "카넬리안", "골든글로우", "에벤홀츠", "린", "오올헤약", "로고스", "님프", "마르실", "라플란드 더 데카덴차", "블레이즈 디 이그나이팅 스파크", "네크라스"];
let memMedic6 = ["샤이닝", "나이팅게일", "켈시", "루멘", "리드 더 플레임 섀도우", "에이야퍄들라 더 크비트 아스카", "Mon3tr"];
let memSupp6 = ["안젤리나", "마젤란", "스즈란", "스카디 더 커럽팅 하트", "노시스", "링", "스테인리스", "사일런스 더 패러디그매틱", "비르투오사", "시빌라이트 에테르나", "트라고디아", "라이디언", "하루카"];
let memSpecial6 = ["아", "팬텀", "위디", "글래디아", "미즈키", "리", "스펙터 디 언체인드", "도로시", "텍사스 디 오메르토사", "키린R 야토", "스와이어 디 엘리건트 위트", "Ela", "아스카론", "크라운슬레이어", "쏜즈 더 로드스타", "엑시아 더 뉴 커버넌트"];
let memList6 = [[memVan6, "vanguard"], [memGuard6, "guard"], [memDefend6, "defender"], [memSnipe6, "sniper"], [memCast6, "caster"], [memMedic6, "medic"], [memSupp6, "supporter"], [memSpecial6, "specialist"]];

function createDiv(name, occ){
    const target = document.getElementById(occ);
    const newDiv = document.createElement('div');
    const newText = document.createElement('p');
    newText.innerText = name;
    newText.classList.add("nameTag");
    newDiv.appendChild(newText);
    newDiv.classList.add("item");
    newDiv.dataset.name = name;
    target.appendChild(newDiv);
};//캐릭터 칸 더하기

memList6.forEach(function(val){
    const target = document.getElementById(val[1]);
    const newDiv = document.createElement('div');
    const newText1 = document.createElement('p');
    const newText2 = document.createElement('p');
    const newText3 = document.createElement('p');
    newDiv.classList.add("scoreboard");
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
        createDiv(name, val[1]);
    });
});


//======================================================

const inputEl = document.getElementById("searchInput");

inputEl.addEventListener("beforeinput", (e) => {
    const inputValue = inputEl.value;
    const target = document.querySelector(`div[data-name='${inputValue}']`);

    if(target){
        if (!target.classList.contains("check")){
            const occ = target.parentElement;
            const scoreboard = occ.getElementsByClassName("scoreboard")[0];
            const scoreNow = scoreboard.getElementsByClassName("curr")[0];
            const scoreWhole = scoreboard.getElementsByClassName("whole")[0];
            scoreNow.innerText = Number(scoreNow.innerText) + 1;
            if(scoreNow.innerText == scoreWhole.innerText){
                scoreboard.style.backgroundColor = "green";
                scoreboard.style.color = "white";
            }
            e.preventDefault();
            target.style.backgroundImage = `url("./charimg/${inputValue.replace(/ /g,"")}.webp")`;
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