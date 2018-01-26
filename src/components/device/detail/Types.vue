<template>
  <div class="option">
    <ul>
      <li v-for="(type,index) in typesName" @click="selectTypeFn(index,$event)">{{type}}</li>
    </ul>
  </div>
</template>

<style>
  @media (min-width:1441px){
    .option{
      position: absolute;
      top:0;
      right: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.93);
      border: solid 1px #f7f7f7;
      border-top: 0;
      padding: 0 39px 45px 39px;
      box-shadow: 0 6px 12px 0 rgba(0,0,0,0.1);
      z-index: 999;
    }
    .option ul{
      list-style: none;
      display: block;
    }
    .selectedType{
      background:#fef9f3 !important;
      color:#f5c987 !important;
    }
    .option ul li{
      float: left;
      font-size: 0.8rem;
      letter-spacing: 0.2rem;
      line-height: 45px;
      color: #ccc;
      background:#f5f5f5;
      margin-right: 30px;
      margin-top: 30px;
      cursor:pointer;
      padding: 0 0.9rem;
    }
  }
  @media (max-width:1440px) and (min-width:1025px){
    .option{
     /* width: 95%;*/
      position: absolute;
      top:0;
      right: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.93);
      border: solid 1px #f7f7f7;
      border-top: 0;
      padding: 0 29.25px 33.75px 29.25px;
      box-shadow: 0 4.5px 12px 0 rgba(0,0,0,0.1);
      z-index: 999;
    }
    .option ul{
      list-style: none;
      display: block;
    }
    .selectedType{
      background:#fef9f3 !important;
      color:#f5c987 !important;
    }
    .option ul li{
      float: left;
      font-size: 0.6rem;
      letter-spacing: 0.15rem;
      line-height: 33.75px;
      margin-top: 22.5px;
      margin-right: 22.5px;
      cursor:pointer;
      padding: 0 0.675rem;
      color: #ccc;
      background:#f5f5f5;
    }
  }
  @media (max-width:1024px){
    .option{
     /* width: 95%;*/
      position: absolute;
      right:0;
      top:0;
      left: 0;
      background: rgba(255, 255, 255, 0.93);
      border: solid 1px #f7f7f7;
      border-top: 0;
      padding: 0 20.67px 23.85px 20.67px;
      box-shadow: 0 3.18px 12px 0 rgba(0,0,0,0.1);
      z-index: 999;
    }
    .option ul{
      list-style: none;
      display: block;
    }
    .option ul li{
      float: left;
      font-size: 0.42rem;
      letter-spacing: 0.1rem;
      line-height: 23.85px;
      color: #ccc;
      background:#f5f5f5;
      margin-top: 16px;
      margin-right:16px;
      cursor:pointer;
      padding: 0 0.45rem;
    }
    .selectedType{
      background:#fef9f3 !important;
      color:#f5c987 !important;
    }
  }


</style>
<script>
  import $ from 'jquery'
  export default {
    name: 'types',
    data: function () {
      return {
        typeIndexArr: [],
        isUnselected: true,
        isSelected: false,
        typesName: []
      }
    },
    methods: {
      selectTypeFn: function (index, event) {
       // console.log(event.currentTarget)
       /* if (!$(event.currentTarget).attr('class')) {
          $(event.currentTarget).attr('class', 'selected')
        } else {
          $(event.currentTarget).attr('class', '')
        } */
        $(event.currentTarget).toggleClass('selectedType')
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$http.get('../../../static/device/totalTypes.json').then(function (res) {
          this.typesName = res.body.totalTypes
        })
      })
    }
  }
</script>
