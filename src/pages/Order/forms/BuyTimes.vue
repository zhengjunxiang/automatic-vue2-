<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="90">
    <Form-item label="买入金额：" prop="amount">
      <Row>
        <Col span="18"><Input v-model="formValidate.amount" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="扫单范围：" prop="fanwei">
      <Row>
        <Col span="18"><Input v-model="formValidate.fanwei" icon="social"></Input></Col>
        <Col span="5" offset="1">(参考值：0.1%)</Col>
      </Row>
    </Form-item>
    <Form-item label="扫单比例：" prop="bili">
      <Row>
        <Col span="18"><Input v-model="formValidate.bili" icon="social"></Input></Col>
        <Col span="5" offset="1">(参考值：10%)</Col>
      </Row>
    </Form-item>
    <Form-item label="单笔委托上限：" prop="shangxian">
      <Row>
        <Col span="18"><Input v-model="formValidate.shangxian" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="最高价格：" prop="maxPrice">
      <Row>
        <Col span="18"><Input v-model="formValidate.maxPrice" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="委托间隔：" prop="jiange">
      <Row>
        <Col span="18"><Input v-model="formValidate.jiange" icon="second"></Input></Col>
        <Col span="5" offset="1">(参考值：10s)</Col>
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
        fanwei: '',
        bili: '',
        shangxian: '',
        maxPrice: '',
        jiange: ''
      },
      ruleValidate: {
        amount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        fanwei: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateFivePercent, trigger: 'blur' }
        ],
        bili: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateSdScale, trigger: 'blur' }
        ],
        shangxian: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        maxPrice: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        jiange: [
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
          cd(formValidate);
        } else {
          cd(null);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
