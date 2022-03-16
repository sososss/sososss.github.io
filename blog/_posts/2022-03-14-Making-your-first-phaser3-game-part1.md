---
title: Phaser3로 게임 만들기 part 1
date: 2022-03-14
tags:
  - Phaser
summary: Phaser3로 게임 만들기 첫번째 강의 입니다!
---

## Phaser 란?

Phaser는 HTML5 Game framework로 웹 브라우저에서 동작하는 게임을 쉽고 빠르게 만들수 있다. 웹의 장점인 그대로 누릴 수 있어 모바일이나 데스크탑에서 브라우저만 있다면 실행할 수 있다.

## Phaser 3 시작하기

먼저 Phaser를 사용하기 위해서는 필요한 파일을 html 파일에 추가해줘야 한다.

```index.html```
```
<html>
  <head>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
  </head>
  <body>
    <script></script>
  </body>
</html>
```

자! Phaser를 사용할 준비가 완료되었다.

이제 Phaser를 실행하기 위한 코드를 간략히 알아보겠다.

```
<script>
  var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };

  var game = new Phaser.Game(config);

  function preload ()
  {
  }

  function create ()
  {
  }

  function update ()
  {
  }
</script>
```

Phaser의 모든 API는 Phaser를 통해 접근할 수 있다. ```new Phaser.Game(config)```는 Game을 생성하는 코드로 [config](https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Core.GameConfig)를 통해 옵션을 변경할 수 있다. 
```type```는 rendering context를 선택하는 옵션으로 Phaser.AUTO는 WebGL이 사용가능할 경우 WebGL을 사용하고 아닐 경우 CANVAS를 기본으로 사용한다.
```width```와 ```height```는 게임의 가로, 세로 크기를 설정할 수 있다. ```scene```은 게임 Life-cycle에 맞춰 호출 되는 함수들을 설정할 수 있다. 위 코드에서는 ```preload```, ```create```, ```update```를 추가해주고 있다.

이제 위 코드를 실행해보면 아래와 같이 800x600 크기의 검은색 빈 게임화면이 생성된걸 알 수 있다.

<iframe width="100%" height="300" src="//jsfiddle.net/sososs/wt8a6ype/1/embedded/html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
