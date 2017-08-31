<template>
  <div class="balance-container">
    <table border="0" cellpadding="0" cellspacing="0" >
      <tr>
        <th rowspan="2" style='width: 120px'><span class="table-cell">平台</span></th>
        <th colspan="2" v-for="item in coinTypes">
          <span class="table-cell">{{item}}</span>
        </th>
      </tr>
      <tr>
        <th v-for="index in freeAndFreezedLen">
          <span class="table-cell">{{index % 2 ? '可用' : '冻结'}}</span>
        </th>
      </tr>
      <tr v-for="platform in (userSunInfo.platform && Object.keys(userSunInfo.platform))">
        <th><span class="table-cell">{{platform}}</span></th>
          <td v-for="index in freeAndFreezedLen">
            <span class="table-cell" v-if="index % 2">{{
              userSunInfo.platform[platform][coinTypes[parseInt(index/2)]] && userSunInfo.platform[platform][coinTypes[parseInt(index/2)]].free
            }}</span>
            <span class="table-cell" v-else>{{
              userSunInfo.platform[platform][coinTypes[parseInt(index/2-1)]] && userSunInfo.platform[platform][coinTypes[parseInt(index/2-1)]].freezed
            }}</span>
          </td>
      </tr>
      <tr>
        <th><span class="table-cell">总和</span></th>
        <td v-for="item in sun">
          <span class="table-cell">{{item}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "Balance",
  props: ["userSunInfo"],
  computed: {
    freeAndFreezedLen() {
      return this.userSunInfo.type && this.userSunInfo.type.length*2 || 0
    },
    coinTypes() {
      return this.userSunInfo.type || []
    },
    sun() {
      const sunArr = [],
            platform = this.userSunInfo.platform || {},
            classifyArr = ['可用', '冻结'],
            coinTypes = this.userSunInfo.type || [];
      let total = 0;
      coinTypes.map(coin => {
        classifyArr.map((item, index) => {
          total = 0;
          Object.keys(platform).map(p => {
            total = total - 0;
            index % 2 ?
              (total += platform[p][coin] ? platform[p][coin].freezed-0 : '') :
              (total += platform[p][coin] ? platform[p][coin].free-0 : '');
          });
          coin === 'cny' ? (total = total.toFixed(2)) : (total = total.toFixed(5))
          sunArr.push(total);
        });
      })
      return sunArr;
    }
  }
}
</script>
<style lang="less">
@import './balance.less';

</style>
