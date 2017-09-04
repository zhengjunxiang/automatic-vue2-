<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="90">
    <Form-item label="卖出数量：" prop="amount">
      <Row>
        <Col span="18"><Input v-model="formValidate.amount" icon="social-bitcoin"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="扫单范围：" prop="orderDepth">
      <Row>
        <Col span="18"><Input v-model="formValidate.orderDepth" icon="social"></Input></Col>
        <Col span="5">(参考值：0.1%)</Col>
      </Row>
    </Form-item>
    <Form-item label="扫单比例：" prop="tradeRatio">
      <Row>
        <Col span="18"><Input v-model="formValidate.tradeRatio" icon="social"></Input></Col>
        <Col span="5">(参考值：10%)</Col>
      </Row>
    </Form-item>
    <Form-item label="单笔委托上限：" prop="borderAmount">
      <Row>
        <Col span="18"><Input v-model="formValidate.borderAmount" icon="social-bitcoin"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="最低价格：" prop="borderPrice">
      <Row>
        <Col span="18"><Input v-model="formValidate.borderPrice" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="委托间隔：" prop="tradeInterval">
      <Row>
        <Col span="18"><Input v-model="formValidate.tradeInterval" icon="second"></Input></Col>
        <Col span="5">(参考值：10s)</Col>
      </Row>
    </Form-item>
  </Form>
</template>
<script>
import {reg, mes} from '../../../utils/utils';
export default {
  name: "SellTimes",
  data () {
    const validateNumber = (rule, value, callback) => {
      if(!reg.validatefloat.test(value)) {
        callback(new Error(mes.float));
      } else {
        callback();
      }
    };
    const validateFivePercent = (rule, value, callback) => {
      if(!reg.fivePercent.test(value)) {
        callback(new Error(mes.fivePercent));
      } else {
        callback();
      }
    };
    const validateSdScale = (rule, value, callback) => {
      if(!reg.sdScale(value)) {
        callback(new Error(mes.sdScale));
      } else {
        callback();
      }
    };
    const validateEntrustInterval = (rule, value, callback) => {
      if(!reg.entrustInterval(value)) {
        callback(new Error(mes.entrustInterval));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        amount: '',
        orderDepth: '',
        tradeRatio: '',
        borderAmount: '',
        borderPrice: '',
        tradeInterval: ''
      },
      ruleValidate: {
        amount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        orderDepth: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateFivePercent, trigger: 'blur' }
        ],
        tradeRatio: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateSdScale, trigger: 'blur' }
        ],
        borderAmount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        borderPrice: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        tradeInterval: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateEntrustInterval, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    returnFormData (cd) {
      const formValidate = this.formValidate;
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          cd(formValidate)
        } else {
          cd(null);
        }
      })
    },
    reset() {
      this.formValidate = {
        amount: '',
        orderDepth: '',
        tradeRatio: '',
        borderAmount: '',
        borderPrice: '',
        tradeInterval: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
