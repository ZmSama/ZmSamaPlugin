/*
 * @Description:节流函数
 * @Autor: ZmSama
 * @Date: 2021-05-28 15:11:05
 */
export default function throttle(func: Function, wait = 500) {
  // 定义一个定时器
  let timer = null;
  // 上一次时间
  let previous = 0;
  // 返回一个匿名函数被调用者执行
  return function () {
    //  记录当前时间
    let now = new Date().getTime();
    // 剩余间隔时间  （用户希望的等待时间-当前时间-上一次执行的时间）
    let remaining = wait - (now - previous);
    // 间隔时间小于0了那么立即执行函数，第一次必定执行一次
    if (remaining <= 0) {
      console.log(111);

      clearInterval(timer);
      timer = null;
      //  记录能够执行的当前时间
      previous = now;
      //   调用方法
      func.call(this, ...arguments);
    } else if (!timer) {
      // 剩余间隔时间大于0时，就延迟执行相同间隔时间，并重置上一次时间的时候才能清除当前的定时器，所以下次如果间隔时间没有超过这个间隔的话将会被忽略从而达到了节流的效果
      timer = setTimeout(() => {
        console.log(222);

        clearInterval(timer);
        timer = null;
        previous = new Date().getTime();
        func.call(this, ...arguments);
      }, remaining);
    }
  };
}
