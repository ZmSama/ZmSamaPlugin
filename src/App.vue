<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-28 14:40:41
-->
<template>
  <div class="app">
    <div class="swiper-container">
      <swiper :initial="2" :interval="3000" :auto="true">
        <slider name="slider2" v-for="item in source" :key="item.id">
          <img :src="item.pic" alt="" srcset="" />
        </slider>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const source = [
      {
        id: 1,
        label: 'Slider1',
        color: '#ff3399',
        pic: 'http://p1.music.126.net/O5hmcHHdJpABcArdHOXXZw==/109951166006223055.jpg?imageView&quality=89',
      },
      {
        id: 2,
        label: 'Slider2',
        color: '#99ffff',
        pic: 'http://p1.music.126.net/uhxClMS2xY2b48a-PsoG9g==/109951166006290269.jpg?imageView&quality=89',
      },
      {
        id: 3,
        label: 'Slider3',
        color: '#66cc00',
        pic: 'http://p1.music.126.net/Rgqg8zqkKiewTUMjh0GMCg==/109951166005126541.jpg?imageView&quality=89',
      },
      {
        id: 4,
        label: 'Slider4',
        color: '#0066ff',
        pic: 'http://p1.music.126.net/oMXHYkRHy5XbE0905ljqZg==/109951166005813356.jpg?imageView&quality=89',
      },
      {
        id: 5,
        label: 'Slider5',
        color: '#00ff33',
        pic: 'http://p1.music.126.net/IXXt2TECvZIeEVNUr1E_gA==/109951166004785770.jpg?imageView&quality=89',
      },
    ];
    return {
      source,
    };
  },
});
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .swiper-container {
    width: 80%;
    height: 300px;
    position: relative;
  }
}
</style>
