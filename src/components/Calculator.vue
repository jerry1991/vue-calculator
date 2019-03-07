<template>
  <div class="calc-container">
    <header class="calc-hd">
        <input type="text" readonly v-model="content" dir="ltr"/>
    </header>
    <section class="calc-bd">
        <button v-for="(item, index) in calcLayout" :class="`btn${index}`"  :key="index" @click="onPress">
          {{item}}
        </button>
    </section>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import Maths from "@/util/math";

@Component
class Calculator extends Vue {
    constructor() {
      super();
      this.storageData = [];
      this.lastPressKey = "";
      this.content = "";
      this.calcLayout = [
          '存储', '取存', '退格', '清屏', '累存', '积存', '清存', 
          '/',  '7', '8', '9', '*', '4', '5', '6', '-', '1',
          '2', '3', '+', '0', '.', '+/-', '='
      ];
    }

    onPress(event) {
      const key = event.target.textContent.replace(/\s+/g, '');

      if (this.checkLastPress(key)) return  

      if (/\d/.test(key) || /\./.test(key)) {
        this.content += key
      } else if (key === "+") {
        this.content += "+"
      } else if (key === "-") {
        this.content += "-"
      } else if (key === "*") {
        this.content += "*"
      } else if (key === "/") {
        this.content += "/"
      } else if (key === '+/-') {
        this.content = this.setOppsiteValue(this.content)
      } else if (key === "清屏") {
        this.content = ""
      } else if (key === "退格") {
        this.content = String(this.content).substring(0, String(this.content).length - 1)
      } else if (key === "存储") {
        this.saveData(this.content);
      } else if (key === "取存") {
        this.content = this.storageData[0] ? this.storageData[0] : '';
        this.storageData[0] && this.storageData.splice(0, 1);
      } else if (key === "累存") {
        this.save2nd(this.content, this.storageData, "add");
      } else if (key === "积存") {
        this.save2nd(this.content, this.storageData, "mul");
      } else if (key === "清存") {
        this.storageData = [];
      } else if (key === "=") {
        this.content = this.calcResult(this.content)
      }
    }

    checkLastPress(currentKey) {
      const keys = ['+', '-', '*', '/', '=', '.'];
      const operates = ['存储', '取存', '累存', '积存', '清存'];
      // 如果第一次直接按运算符号，直接取消
      if (this.content === "" && keys.includes(currentKey)) {
        return true
      }  
      // 如果连续点击了两次取存，或者连续点击了两次存储操作， 直接取消
      if (operates.includes(currentKey) && currentKey === this.lastPressKey) {
        return true
      }
      // 如果上一次按的是运算符号，第二次再按运算符直接取消
      if (currentKey === this.lastPressKey && keys.includes(currentKey)) {
        return true
      } else {
        this.lastPressKey = currentKey
      }
      return false
    }

    setOppsiteValue(content) {
      let result = '';

      if (!content) return '';

      if (content.charAt(0) === '-') {
        result = content.slice(1)
      } else {
        result = `-${content}`
      }

      return result
    }
    
    // 存储数据
    saveData(content) {
      let num;
      if (String(content).includes('.')) {
        num = parseFloat(content, 10) // 统一按10进制转换
      } else {
        num = parseInt(content, 10)
      }
      // 点击存储数据, 如果暂存区有值, 不再做存取动作
      if (this.storageData.length > 0) {
        return 
      } else {
        // 如果暂存区没值， 存入当前输入框内的值，并清空输入框内的值
        this.storageData.push(num);
        this.content = '';
      }
    }

    save2nd(content, storageData, type) {
      let result = '', temp = storageData;
      if (storageData[0] === undefined && type === 'add') {
        temp = 0; //加0
      } else if (storageData[0] === undefined && type === 'mul') {
        temp = 1; //乘1
      }
      if (type === 'add') {
        result = Maths.add(content, temp)
      } else {
        result = Maths.mul(content, temp);
      }

      this.storageData[0] = result; 
      this.content = '';
    }

    calcResult(result) {
      if (!result) return '';
      try {
        if (!result.includes('.')) {
          return eval(result)
        } else {
          // @todo 小数点存在的情况下， js计算会出现精度损失，不能使用eval
        }
      } catch (err) {
        console.warn(err);
      }
    }
                            
}

export default Calculator;
</script>

<style lang="scss">
@import "../style/calc.scss";
</style>
