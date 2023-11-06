# onPlayerJumpOrLand

* 23.11.06.

* 플레이어 tag의 hasJumped 값에 '직전에 점프를 했는지'가 저장됩니다.
* hasJumped 값과 isJumping 값이 동일하면, 아무런 함수도 호출되지 않습니다.
* hasJumped 값과 isJumping 값에 차이가 생기는 순간, hasJumped 값에 isJumping의 값이 할당됩니다.
    * 이때 isJumping가 true라면 바로 직전에 점프를 한 것으로, false라면 바로 직전에 착지를 한 것으로 간주할 수 있습니다.

### 응용
* 무언가를 뛰어서 밟는 등, 감압판이나 버튼을 누르는 연출로 사용할 수 있습니다.
* 한쪽에서 뛰어서 다른쪽에 착지하는 게임 로직을 만들 수 있습니다.