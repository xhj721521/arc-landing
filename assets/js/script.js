/*
* 现代网站 JavaScript
* 处理星空动画、滚动触发动画、多语言支持，
* 径向仪表更新、倒计​​时器、代币经济学饼图，
* 和页脚年份更新。
*/

// Starfield 动画类似于 new_site，但用于 #starfield
函数initStarfield ( ) {
 
  const canvas = document.getElementById ( 'starfield ' ) ;
  如果（！画布）返回；
  const ctx = canvas.getContext ( ' 2d' );
  让宽度，高度；
  const星星 = [];
  const numStars = 150 ;
  让动画ID；

  // 多个视差层的配置
  const层 = [
    {星星：[],数量：50 ,大小：[ 0.5 , 1 ],速度：[ 0.1 , 0.3 ] },
    {星星：[],数量：50 ,大小：[ 0.7 , 1.5 ],速度：[ 0.2 , 0.5 ] },
    {星星：[],数量：50 ,大小：[ 1 , 2 ],速度：[ 0.4 , 0.8 ] }
  ]；

  函数调整大小（）{
 
    宽度 = 画布。宽度=窗口。内部宽度；
    高度 = 画布。高度=窗口。内部高度；
  }

  函数initStars ( ) {
 
    星星。长度= 0 ；
    对于（让i = 0 ；i < numStars；i++）{
      星星。推（{
        x ：数学.随机（）*宽度，
        y ：数学.随机（）* 高度，
        大小：Math.random （）*
 1.5 + 0.5 ，
        速度：Math.random （）*
 0.5 + 0.2 ，
        alpha ：Math.random （）* 0.8 + 0.2
      });
    }
    层。forEach （层= > {
      层。星星=[]；
      对于（让i = 0 ；i < 层。计数；i ++）{
        层.星星.推（{
          x ：数学.随机（）*宽度，
          y ：数学.随机（）* 高度，
          尺寸：
            Math.random () * (layer.size [ 1 ] - layer.size [ 0 ] ) + layer.size [ 0 ] ,
          速度：
            Math.random () * (layer.speed [ 1 ] - layer.speed [ 0 ] ) + layer.speed [ 0 ] ，
          alpha ：Math.random （）* 0.8 + 0.2
        });
      }
    });
  }

  函数更新（）{
 
    ctx.clearRect ( 0,0 ,宽度,高度)
 ;
    ctx.填充样式= '#ffffff' ;
    星星。forEach （星星= > {
      ctx.globalAlpha =
 star.alpha ;​
      ctx.beginPath （）
 ；
      ctx.arc ( star.x , star.y ,
 star.size , 0 , Math.PI * 2 ) ;​​
      ctx.填充（）；
      星星。y + = 星星。速度；
      如果（星星。y >高度）{
        星星。y = 0 ；
        星号。x = Math.random ( ) *
宽度；
      }
    层。forEach （层= > {
      层.星星.forEach ( star = > {
        ctx.globalAlpha =
 star.alpha ;​
        ctx.beginPath （）
 ；
        ctx.arc ( star.x , star.y ,
 star.size , 0 , Math.PI * 2 ) ;​​
        ctx.填充（）；
        星星。y + = 星星。速度；
        如果（星星。y >高度）{
          星星。y = 0 ；
          星号。x = Math.random ( ) *
宽度；
        }
      });
    });
    请求动画帧（更新）；
    animationId = requestAnimationFrame (更新);
  }

  函数停止（）{
 
    如果（动画ID）{
      取消动画帧（动画ID）；
      动画ID =空；
    }
  }

  调整大小（）；
  初始化星星（）；
  窗口. addEventListener ( '调整大小' , () => {
    调整大小（）；
    初始化星星（）；
  });
  窗口.addEventListener ( 'beforeunload' ,停止)
 ;
  document.addEventListener ( 'visibilitychange' , ( )= > {
    如果（文档.隐藏）{
      停止（）;
    }别的{
      更新（）;
    }
  });
  更新（）;
}

// 使用 IntersectionObserver 触发滚动动画
函数initScrollAnimations ( ) {
 
  const观察者 = new IntersectionObserver ( entries => {
 
    条目.forEach （条目= > {
      如果（entry.isIntersecting ）{
        entry.target.classList.add ( '显示' ) ;
​​
        观察者.取消观察( entry.target );
      }
    });
  }, {阈值：0.1 });
  document.querySelectorAll ( ' . section-title, .feature-hex, .gauge-card, .benefit-item, .shareholder-card, .chart-wrapper, .carousel-item, .team-card, .roadmap-step, .contact' ) . forEach ( el => {
    el.classList.add ( '动画' ) ;
    观察者。观察（el）；
  });
}

// 使用 i18n.json 实现多语言支持
异步函数initI18n ( ) {
  
  尝试{
    const res = await fetch ( './assets/data/i18n.json' );
 
    const translations = await res.json ( ) ;
    // 从 <html lang> 初始化语言或恢复为英语
