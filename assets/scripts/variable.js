function attackMonster(mode){
    let maxDamage;
    if(mode ==='ATTACK'){
     maxDamage = ATTACK_VALUE;
    }else if(mode==='STRONG_ATTACK'){
     maxDamage = STRONG_ATTACK_VALUE;   
    }else if(mode==='HEAL_ATTACK'){
     maxDamage = HEAL_VALUE;
    }
 
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    const playerDamage =dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('you won!');   
    }else if(currentPlayerHealth <= 0 && currentPlayerHealth > 0){
        alert('you lost!');
    }else if(currentPlayerHealth <= 0 && currentPlayerHealth <= 0) {
        alert('you have a draw!');
    }
 }
 function attackHandler() {
    attackMonster('ATTACK');
 }
 
 function strongAttackHandler() {
     attackMonster('STRONG_ATTACK');
 }
 
 function healPlayerHandler(){
     increasePlayerHealth('HEAL_VALUE');
 }
 
 
 attackBtn.addEventListener('click',attackHandler);
 strongAttackBtn.addEventListener('click',strongAttackHandler);
 healBtn.addEventListener('click',healPlayerHandler);

 
function attackMonster(mode){
    const maxDamage = mode ===MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE