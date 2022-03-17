---
title: Phaser3로 게임 만들기 part 2
date: 2022-03-17
tags:
  - Phaser
summary: Phaser3로 게임 만들기 두번째 강의 입니다!
---

코드: [https://github.com/sososss/Phaser3-Tutorials/blob/main/Making-your-first-phaser3-game/part2.html](https://github.com/sososss/Phaser3-Tutorials/blob/main/Making-your-first-phaser3-game/part2.html)

## 필요한 파일 읽어오기

게임 화면을 만들었으니 이제 필요한 이미지 들을 한 번 넣어보도록 하자. 게임에 필요한 이미지들의 경우 앞에서 설명한 scene의 callback 들 중 ```preload```에 정의해주면 된다. ```preload```의 경우 게임이 생성 되기 전에 호출이 되기 때문에 게임에 필요한 리소스들을 게임 실행 전에 미리 준비할 수 있게 된다.

``` JavaScript
function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
    'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}
```

위 코드는 4개의 이미지와 1개의 spritesheet 파일을 로드하고 있다. 필요한 이미지를 읽기 위해서는 ```this.load.image(이름, 경로)```를 입력해주면 된다. 이때 ```이름```은 읽은 이미지를 사용할 수 있는 키 값이 되기 때문에 필요할 때 이 이름을 통해 사용하면 된다.

## 화면에 이미지 그리기

이번에는 이미지를 그리기 위해 게임이 생성될 때 호출 되는 ```create``` callback에 코드를 넣어보도록 하자.

``` JavaScript
function create() {
  this.add.image(400, 300, 'sky');
}
```

이미지를 추가하기 위해서는 ```this.add.image```을 사용하고 여기서 400과 300은 이미지를 놓을 위치를 뜻한다. 그런데 이미지의 크기가 게임 화면 크기와 동일한 800 x 600인데 왜 400과 300으로 위치를 지정할까? 바로 Game Object들의 경우 가운데를 기반으로 좌표를 계산하기 때문이다. 따라서 800x600크기의 이미지의 가운데 좌표인 400과 300으로 설정해줘야 정 가운데로 이미지가 올바르게 위치하게 된다.

> 개발자들에게 익숙한(?) 왼쪽 상단(0,0) 부터 시작하는 방식을 사용하고 싶을 경우 ```this.add.image(0, 0, 'sky').setOrigin(0, 0)```을 사용하면 된다.


``` JavaScript
function create() {
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');
}
```

이미지들의 경우 추가한 순서대로 화면에 그려지기 때문에 위 코드의 경우 sky가 그려지고 그 위에 star가 아래와 같이 그려지게 된다. 만약 star를 먼저 그리고 sky를 그려게되면 별 이미지가 하늘 이미지에 가려져 하늘만 보이지게 된다.

<iframe width="100%" height="600" src="//jsfiddle.net/sososs/h91xogtk/12/embedded/html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

참조: [https://phaser.io/tutorials/making-your-first-phaser-3-game/part2](https://phaser.io/tutorials/making-your-first-phaser-3-game/part2)
