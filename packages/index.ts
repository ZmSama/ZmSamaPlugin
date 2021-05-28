/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-28 15:01:02
 */
import Swiper from './swiper/Swiper.vue';
import Slider from './swiper/Slider.vue';

const ZmSamaPlugin = {
  install: (Vue: any, options?: any) => {},
};

const COMPONENTS = [Swiper, Slider];

ZmSamaPlugin.install = function (Vue, options) {
  // 如果传入配置就使用配置
  if (options && options.components) {
    const components = options.components;
    components.forEach((item: any) => {
      COMPONENTS.forEach(component => {
        if (component.name == item) {
          Vue.component(component.name, component);
        }
      });
    });
    // 否则全局注册
  } else {
    COMPONENTS.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default ZmSamaPlugin;
