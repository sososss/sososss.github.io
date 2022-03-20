---
title: Phaser3로 게임 만들기 part 3
date: 2022-03-20
tags:
  - Phaser
summary: Phaser3로 게임 만들기 세번째 강의 입니다!
---

코드: [https://github.com/sososss/Phaser3-Tutorials/blob/main/Making-your-first-phaser3-game/part3.html](https://github.com/sososss/Phaser3-Tutorials/blob/main/Making-your-first-phaser3-game/part3.html)

이번에는 배경 이미지와 캐릭터가 밟을 수 있는 바닥 이미지를 몇개 추가해보려고 한다. 아래 코드를 ```create```에 추가해보자.

```JavaScript
var platforms;

function create ()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}
```

위 코드 중 ```this.physics```를 통해 물리 엔진을 사용할 수 있는데 이를 위해서는 Game Config 설정도 변경이 필요하다. 아래와 같이 config 설정을 변경해보자.

```JavaScript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
```

물리 엔진 사용을 위해 ```physics``` 설정이 새롭게 추가되었다. Phaser의 경우 arcade, impact, matter 3가지 방식을 기본으로 제공하는데 차이점에 대해서는 추후 설명 하고 이번에는 ```arcade``` 방식을 사용한다. ```gravity: { y: 300 }```의 경우 y축 방향으로 300의 중력 효과를 주는 것을 의미한다. 이게 올바르게 동작하는 지는 다음 강의를 통해 확인 해보도록 하자.

<iframe width="100%" height="600" src="//jsfiddle.net/sososs/vcgryu3h/6/embedded/html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
