const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK ='ATTACK';//MODE_ATTACK=0;
const MODE_STRONG_ATTACK ='STRONG_ATTACK';//STRONG_ATTACK=1;
const LOG_EVENT_PLAYER_ATTACK ='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK ='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK ='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL ='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER ='GAME_OVER';

const enteredValue = prompt('Maximum life for you and the Monster.','100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog =[];

if(isNaN(chosenMaxLife) || chosenMaxLife <=0){
    chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife ;
let currentPlayerHealth = chosenMaxLife ;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev,val, monsterHealth, playerHealth){
    let logEntry ={
            event : ev,
            value : val,
            finalMonsterValue : monsterHealth,
            finalPlayerHealth : playerHealth
        };
        if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target ='MONSTER';
        }else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry ={
            event : ev,
            value : val,
            target : 'MONSTER',
            finalMonsterValue : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }else if(ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry ={
            event : ev,
            value : val,
            target : 'PLAYER',
            finalMonsterValue : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry ={
            event : ev,
            value : val,
            target : 'PLAYER',
            finalMonsterValue : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }else if(ev === LOG_EVENT_GAME_OVER){
        logEntry ={
            event : ev,
            value : val,
            finalMonsterValue : monsterHealth,
            finalPlayerHealth : playerHealth
        };
}
      battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage =dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK ,
        playerDamage ,
        currentMonsterHealth,
        currentPlayerHealth
        );

    if (currentPlayerHealth <=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you would be dead but the bonus life saved you!');
        }

    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('you won!');  
        writeToLog(
            LOG_EVENT_GAME_OVER ,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
            ); 
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('you lost!');
        writeToLog(
            LOG_EVENT_GAME_OVER ,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
            ); 
    }else if(currentPlayerHealth <= 0 && currentMonsterrHealth <= 0) {
        alert('you have a draw!');
        writeToLog(
            LOG_EVENT_GAME_OVER ,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
            ); 
    }   

    if(currentMonsterHealth <=0 ||currentPlayerHealth <= 0){
        reset();
    }
}
function attackMonster(mode){
   let maxDamage;
   let logEvent;
  if(mode ==='ATTACK'){
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
   }else if(mode==='STRONG_ATTACK'){
    maxDamage = STRONG_ATTACK_VALUE;   
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
   }

   const damage = dealMonsterDamage(maxDamage);
   currentMonsterHealth -= damage;
   writeToLog(
     logEvent,
     damage,
    currentMonsterHealth,
    currentPlayerHealth
    ); 
   endRound();
}

function attackHandler() {
   attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >=chosenMaxLife - HEAL_VALUE){
     alert("you can't heal to more than your max initial health.");
     healValue = chosenMaxLife - currentPlayerHealth;
    }else{
      healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth +=healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
       ); 
    endRound();
    }

    function printLogHandler()
    {
        console.log(battleLog);
    }


attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click ',printLogHandler);