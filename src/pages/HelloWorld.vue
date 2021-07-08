<template>
  <div class="wrapper">
    <button @click="generateCode('basicCompoents')">生成按钮数据</button>
    <button @click="generateCode('formCompoents')">生成日历数据</button>

    <el-dialog title="" :visible.sync="codeDialogVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="vue代码" name="vueCode">
          <codemirror
            style="text-align: left !important;"
            :value="codeText"
            :options="cmOptions"
            class="code"
          >
          </codemirror>
        </el-tab-pane>
        <!-- <el-tab-pane label="html代码" name="htmlCode"
          >功能正在开发中，敬请期待</el-tab-pane
        > -->
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="codeDialogVisible = false">取 消</el-button>
        <el-tooltip
          class="item"
          effect="dark"
          content="复制代码后请放入vscode中进行代码格式化"
          placement="top-start"
        >
          <!-- <el-button type="primary" @click="copyCode" class="copyCode"
            >复制代码</el-button
          > -->
        </el-tooltip>
      </span>
    </el-dialog>

    <!-- <el-dialog title="" :visible.sync="jsonDialogVisible">
      <codemirror style="text-align: left !important;" :value="codeText" :options="cmOptions" class="code">
      </codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jsonDialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="copyJson" class="copyJson"
          >复制代码</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
var beautify_html = require("js-beautify").html;
import "codemirror/theme/ambiance-mobile.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
import handlebars from "@/handlebars";
import { basicCompoents, formCompoents } from "../components/h5";
import {outExportFileByStr} from "../until/exportFile";
import fs from "fs";
export default {
  name: "HelloWorld",
  components: {
    codemirror,
  },
  created() {},
  data() {
    return {
      num: 0,
      codeText: "",
      codeDialogVisible: false,
      activeName: "vueCode",
      cmOptions: {
        value: "",
        mode: "text/javascript",
        theme: "ambiance-mobile",
        lineNumbers: true,
      },
    };
  },
  methods: {
    generateCode(type) {
      let newObj = {};
      if (type == "basicCompoents") {
        newObj = JSON.parse(JSON.stringify(basicCompoents[0]));
      } else if (type == "formCompoents") {
        newObj = JSON.parse(JSON.stringify(formCompoents[0]));
      }
      newObj.id = this.setNum();
      this.codeText = beautify_html(handlebars.generateVueCode(newObj));
      console.log(this.codeText);
      this.codeDialogVisible = true;
      console.log(this)
      outExportFileByStr(this.codeText, 'aa.vue')
    },
    setNum() {
      this.num = this.num + 1;
      return this.num;
    },
  },
  mounted() {
    
  },
};
</script>

<style>
.wrapper .CodeMirror {
  height: 500px;
}
.wrapper .CodeMirror-line {
  height: 25px;
}
.wrapper .el-link {
  margin-left: 10px;
  margin-right: 10px;
}
</style>