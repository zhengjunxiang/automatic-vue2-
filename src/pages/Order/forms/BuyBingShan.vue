<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="90">
    <Form-item label="买入金额：" prop="amount">
      <Row>
        <Col span="18"><Input v-model="formValidate.amount" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="单笔均值：" prop="avgAmount">
      <Row>
        <Col span="18"><Input v-model="formValidate.avgAmount" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="委托深度：" prop="orderDepth">
      <Row>
        <Col span="18"><Input v-model="formValidate.orderDepth" icon="social"></Input></Col>
        <Col span="5">(参考值：0.1%)</Col>
      </Row>
    </Form-item>
    <Form-item label="最高价格：" prop="borderPrice">
      <Row>
        <Col span="18"><Input v-model="formValidate.borderPrice" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
  </Form>
</template>
<script>
import {reg, mes} from '../../../utils/utils';
export default {
  name: "SellBinShang",
  data () {
    const validateNumber = (rule, value, callback) => {
      if(!reg.validatefloat.test(value)) {
        callback(new Error(mes.float));
      } else {
        callback();
      }
    };
    const validateDepthPercent = (rule, value, callback) => {
      if(!reg.depthPercent.test(value)) {
        callback(new Error(mes.depthPercent));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        amount: '',
        avgAmount: '',
        orderDepth: '',
        borderPrice: ''
      },
      ruleValidate: {
        amount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        avgAmount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        orderDepth: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateDepthPercent, trigger: 'blur' }
        ],
        borderPrice: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    returnFormData (cd) {
      const formValidate = this.formValidate;
      this.$refs['formValidate'].validate((valid) => {
        cd(formValidate);
        if (formValidate) {
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
