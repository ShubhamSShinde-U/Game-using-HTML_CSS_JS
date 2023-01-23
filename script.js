let xp = 0;
let health =100;
let gold=50;
let currentWeapon=0;
let fighting;
let monterHealth;
let invetory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const Text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monterHealthText = document.querySelector("#monsterHealth");

const locations =[
    {
        name:"town square",
        "button text":["Go to store","Go to Cave","Go to Dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"You are in the town square. You see a sign that says \"store\""

    },
    {
        name:"store",
        "button text":["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"You entered the store."

    },
    {
        name:"cave",
        "button text":["Fight slime","Fight fanged beast","Go to  town square"],
        "button functions":[fightSlime,fightBeast,goTown],
        text:"You entered the cave. You see some monsters."

    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button functions":[attack,dodge,goTown],
        text:"You are fighting monster"

    },
    {
        name:"kill monster",
        "button text":["Go to town square","Go to town square","Go to town square"],
        "button functions":[goTown,goTown,essterEgg],
        text:"The monster scress Arg! as it dies. You gain experience points and find gold."
    },
    {
        name:"lose",
        "button text":["Replay?","Replay?","Replay?"],
        "button functions":[restart,restart,restart],
        text:"You die."
    },
    {
        name:"win",
        "button text":["Replay?","Replay?","Replay?"],
        "button functions":[restart,restart,restart],
        text:"You defeat the dragon! YOU WIN THE GAME!."
    },
    {
        name:"esterEgg",
        "button text":["2","8","Go to town Square"],
        "button functions":[pickTwo,pickEight,goTown],
        text:"You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!" 
    }
];
const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];

const monsters =[
    {
        name:'slime',
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
];
//intialise the buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display ="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    Text.innerText = location["text"];

}

function goTown(){
    document.getElementById("section").style.backgroundImage = "url(./Store.png)";
    update(locations[0]);
}

function goStore(){
    document.getElementById("section").style.backgroundImage = "url(./Store.png)";
    update(locations[1]);
}
function goCave(){
    document.getElementById("section").style.backgroundImage = "url(./Store.png)";
    update(locations[2]);
}


function buyHealth(){
    if(gold>=10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        Text.innerText="You don't have enough gold to buy health";
    }

}
function buyWeapon(){
    if(currentWeapon<weapons.length-1){
        if(gold>=30){
            gold-=gold;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a "+newWeapon+".";
            invetory.push(newWeapon);
            text.innerText+= "In your inventory you have: "+invetory;
        }else{
            text.innerText = "You do not have enough gold to buy a weapon";
        }
    }
    else{
        Text.innerText = "You have highest weapon!";
        button2.innerText="Sell weapons for 15 gold";
        button1.onclick = sellWeapon;
    }
    
}

function sellWeapon(){
    if(invetory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = invetory.shift();
        Text.innerText = "You sold a "+currentWeapon+".";
        Text.innerText += "In your inventory you have "+ invetory;

    }
    else{
        Text.innerText = "Don't sell your only weapon";
    }
}



function fightSlime(){
    fighting =0;
    gofight();
}
function fightBeast(){
    fighting =1;
    gofight();
}
function fightDragon(){
    fighting =2;
    gofight();
}
function gofight(){
    update(locations[3]);
    monterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monterHealthText.innerText = monterHealth;
}

function attack(){
    Text.innerText = "The"+monsters[fighting].name +" attacks";
    Text.innerText += " You attack it with your "+weapons[currentWeapon].name +".";
    if(isMonsterHit() ){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }
    else{
        Text.innerText  = "You miss!";
    }
    monterHealth -=weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;
    healthText.innerText = health;
    monterHealthText.innerText = monterHealth;
    if(health<=0){
        lose();
    }
    else if(monterHealth<=0){
        if(fighting === 2){
            winGame();
        }
        else defeatMonster();
    }
    if(Math.random()<=.1 && currentWeapon>1){
        Text.innerText = "Your "+invetory.pop()+" breaks.";
        currentWeapon--;
    }
}
function dodge(){
    Text.innerText ="You dodge the attack from the "+monsters[fighting].name+".";
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level*6.7);  
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
xp = 0;
health =100;
gold=50;
currentWeapon=0;
invetory = ["stick"];
goldText.innerText=gold;
healthText.innerText =health;
xpText.innerText = xp;
goTown();
}
function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}
function getMonsterAttackValue(level){
    let hit = (level*5) - (Math.floor(Math.random()*xp));
    return hit;
}

function isMonsterHit(){
    return Math.random() > .2 || health<=20;//if vslue > 0.2 then true if not then false
}  
function essterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
}
function pick(guess){
    let numbers =[];
    while(numbers.length<10){
        numbers.push(Math.floor(Math.random() *11));
    }
    Text.innerText = "You picked"+guess+". Here are the random numbers:\n";
    for(let i=0;i<10;i++){
        Text.innerText +=numbers[i]+"\n";
    }
    if(numbers.indexOf(guess)!==-1){
        Text.innerText= "Right! You win 20 gold";
        gold += 20;
        goldText.innerText = gold;
    }
    else{
        Text.innerText="Wrong! You lose 10 health";
        health -=10;
        healthText.innerText = health;   
        if(health<=0){
            lose();
        } 
    }
}