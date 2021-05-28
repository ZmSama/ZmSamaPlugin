<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-28 15:00:37
-->
<script lang="ts">
import { defineComponent, h, getCurrentInstance, onMounted, ref, VNode } from 'vue';
import Slider from './Slider.vue';
import throttle from '../utils/throttle';
export interface ISlider {
  sty?: Object;
  className?: string;
}
export default defineComponent({
  name: 'Swiper',
  components: {
    Slider,
  },
  props: {
    initial: {
      type: Number,
      default: 0,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    auto: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    // 因为setup中没有this，使用方法得到实例
    const instance = getCurrentInstance();

    // 轮播子内容
    const childrenNode = ref([]);
    // 初始index
    const initial = ref(props.initial);
    // 间隔时间
    const interval = ref(props.interval);
    // 定时器对象
    let timer = null;

    // 自动轮播
    const autoPlay = () => {
      timer = setInterval(() => {
        initial.value++;
        if (initial.value >= childrenNode.value.length) {
          initial.value = 0;
        }
      }, interval.value);
    };

    // 上一页(节流一下)
    const preSlider = throttle(() => {
      initial.value--;
      if (initial.value < 0) {
        initial.value = childrenNode.value.length - 1;
      }
    });

    // 下一页（节流一下）
    const nextSlider = throttle(() => {
      initial.value++;
      if (initial.value >= childrenNode.value.length) {
        initial.value = 0;
      }
    });

    // 点击指示器前往某一页
    const gotoSlider = (i: number) => {
      initial.value = i;
    };

    // 鼠标进入
    const enterSlider = () => {
      clearInterval(timer);
    };

    // 鼠标离开
    const leaveSlider = () => {
      props.auto && autoPlay();
    };

    // 处理每一项的样式
    const computedSty = (index: number, arr: Array<ISlider>) => {
      // 确保索引合法
      let len = arr.length;
      // 判断初始值
      index < 0 ? 0 : index >= len ? len - 1 : initial;
      // 第一项
      let temp1 = index - 1;
      // 第二项（中间项）
      let temp2 = index;
      // 第三项
      let temp3 = index + 1;

      // 判断起始值处于哪里
      temp1 < 0 && (temp1 = len + temp1);
      temp3 >= len && (temp3 = temp3 - len);

      // 修改每一项的样式

      return arr.map((item: ISlider, index) => {
        // 初始样式
        let transform = 'translate(-50%, -50%) scale(0.55)',
          zIndex = 0,
          className = '';

        // 根据索引确定项目的样式
        switch (index) {
          case temp2:
            zIndex = 1;
            transform = 'translate(-50%, -50%) scale(1)';
            className = ' is-active';
            break;
          case temp1:
            zIndex = 0;
            transform = 'translate(-100%, -50%) scale(0.85)';
            className = '';
            break;
          case temp3:
            zIndex = 0;
            transform = 'translate(-0%, -50%) scale(0.85)';
            className = '';
            break;
        }
        // 给每一项绑定样式
        item.sty = {
          transform,
          zIndex,
        };
        //  加类
        item.className = className;

        return item;
      });
    };

    onMounted(() => {
      // 这里就是要插入外部传入内容的地方，instance.slots.default()返回的是一个数组，
      // 数组内就是所有未定义名字的插槽内容,
      // 如果想在render中获得相同的内容则调用this.$solts. default()
      const arr = instance.slots.default();
      // 从上面取出所有的实际子节点,同时处理v-for循环和直接写组件的形式，
      // 还要防止用户使用非slider组件（使用v-for得到的将是数组、直接写就是对象）
      const Collection = Array.from(arr).map((item: VNode) => {
        // 说明是v-for指令的
        if (typeof item.type == 'symbol') {
          return item.children;
        } else if (item.type['name'] == 'Slider') {
          return item;
        } else {
          throw new Error('swiper组件内部只允许使用<slider></slider>组件');
        }
      });
      // 将上面得到的可能是二维数组打散成一维数组既是所有的实际子节点
      childrenNode.value = Collection.flat().map((item: VNode) => item.children);

      props.auto && autoPlay();
    });
    return {
      initial,
      computedSty,
      childrenNode,
      preSlider,
      nextSlider,
      gotoSlider,
      enterSlider,
      leaveSlider,
    };
  },
  render() {
    const {
      initial,
      computedSty,
      childrenNode,
      preSlider,
      nextSlider,
      gotoSlider,
      enterSlider,
      leaveSlider,
    } = this;
    // 轮播主体内容

    const sliderList = computedSty(initial, childrenNode);
    //  渲染轮播内容
    const slider = h(
      'div',
      {
        class: 'slider-content',
      },
      [
        sliderList.map((item, index) => {
          return h(
            'div',
            {
              class: {
                slider: true,
                'is-active': index === initial,
              },
              style: item.sty,
              onClick: () => gotoSlider(index),
              onMouseenter: () => enterSlider(),
              onMouseleave: () => leaveSlider(),
            },
            item.default()
          );
        }),
      ]
    );

    // // 底部点点
    let dotItem = childrenNode.map((item, index) => {
      return h('div', {
        class: {
          dot: true,
          'is-active': index == initial,
        },
        onClick: () => throttle(gotoSlider(index)),
      });
    });
    const dot = h(
      'div',
      {
        class: 'dot-wrap',
      },
      [dotItem]
    );

    // // 左右按钮
    const arrowLeft = h('div', {
      class: 'arrow-left',
      onClick: () => preSlider(),
      onMouseenter: () => enterSlider(),
      onMouseleave: () => leaveSlider(),
    });

    const arrowRight = h('div', {
      class: 'arrow-right',
      onClick: () => nextSlider(),
      onMouseenter: () => enterSlider(),
      onMouseleave: () => leaveSlider(),
    });

    //组合
    return h(
      'div',
      {
        class: 'slider-container',
      },
      [slider, dot, arrowLeft, arrowRight]
    );
  },
});
</script>
<style lang="scss" scoped></style>
