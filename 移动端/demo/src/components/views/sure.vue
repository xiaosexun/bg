<template>
  <div>
    <div class="container">
      <header class="header">
        <div class="wrap">
          <go-back></go-back>
          <h2>确认订单</h2>
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <div class="add">
        <div class="txt">
          <p class="user">
            收货人：youSou
            <span>18287617277</span>
          </p>
          <p class="address">
            收货地址：
            <span>北京市海淀区银泉路清林苑6号楼中公优就业总部3层</span>
          </p>
        </div>
        <a href="#" class="edit">
          <img src="../../assets/images/order/arrow.jpg" />
        </a>
      </div>
      <div class="des">
        <div class="wrap">
          <div class="box1 clearfix">
            <img src="../../assets/images/order/shop.jpg" alt />
            <div>
              <p class="p1">雅诗兰黛眼霜</p>
              <p class="p2">规格：50g</p>
            </div>

            <p class="p3">
              <span>￥</span> 120.00
            </p>
          </div>
          <div class="box2 clearfix">
            <span>购买数量：</span>
            <ul class="clearfix">
              <li>-</li>
              <li class="num">1</li>
              <li>+</li>
            </ul>
          </div>
          <div class="box3">
            <span>配送方式</span>
            <span>XX快递</span>
          </div>
        </div>
      </div>
      <div class="discount">
        <div class="wrap">
          <div class="box1">
            <span>优惠劵</span>
            <span>无可用</span>
          </div>
          <div class="box2">
            <span>使用积分</span>
            <div>
              <span class="sp1">输入积分</span>
              <span class="sp2">使用</span>
              <span class="sp3">
                可用
                <i>50</i>积分
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="price">
        <div class="wrap">
          <ul>
            <li>
              <span>商品金额</span>
              <span class="red">￥68.00</span>
            </li>
            <li>
              <span>运费</span>
              <span class="red">+￥0.00</span>
            </li>
            <li>
              <span>优惠劵</span>
              <span class="red">-￥0.00</span>
            </li>
            <li>
              <span>会员优惠</span>
              <span class="red">-￥0.00</span>
            </li>
            <li>
              <span>积分抵扣</span>
              <span class="red">-￥0.00</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="pay">
        <div class="wrap clearfix">
          <p>
            实付金额：
            <span>￥68.00</span>
          </p>
          <input type="submit" value="提交订单" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="" scoped>
@import '../../assets/css/sure.css'
</style>