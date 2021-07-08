const Handlebars = require("handlebars");
//basic   html-loader!
let VanButton = require("../template/button.html");
let bottomScript = require("../template/bottomScript.html");
let VanCalendar = require("../template/VanCalendar.html");

let VanCalendarMethod = require("../template/methods/VanCalendar.html");

let compoentTexts = {
  VanButton: VanButton,
  VanCalendar: VanCalendar,
  // "VanImage": VanImage,
};

let compentMethods = {
  VanCalendar: VanCalendarMethod,
};

// 注册条件表达式 helper
Handlebars.registerHelper("compare", function(left, operator, right, options) {
  if (arguments.length < 3) {
    throw new Error('Handlerbars Helper "compare" needs 2 parameters');
  }
  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "!==": function(l, r) {
      return l !== r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator]) {
    throw new Error(
      'Handlerbars Helper "compare" doesn\'t know the operator ' + operator
    );
  }

  var result = operators[operator](left, right);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

let generateObj = {
  generateVueCode(obj) {
    var allCodeText = "<template>" + "\r\n";
    allCodeText = allCodeText + "<div>" + "\r\n";
    ;
    var templateShowText = this.generateVueCodeFromObjToText(obj);
    ;
    allCodeText = allCodeText + templateShowText + "\r\n";
    ;
    allCodeText = allCodeText + "</div>" + "\r\n";
    allCodeText = allCodeText + "</template>" + "\r\n";

    // 获取vue代码底部script标签代码
    var template = Handlebars.compile(bottomScript);
    var varsObj = this.getBottomScriptVars(obj);
    var methodsObj = this.getBottomScriptMethods(obj);

    var bottomScriptText = template({
      data: varsObj,
      methdos: methodsObj,
    });
    allCodeText = allCodeText + bottomScriptText + "\r\n";

    return allCodeText;
  },
  // 遍历json 找到isModeal为true(获取data下的内容)
  getBottomScriptVars(obj) {
    
    let varsObj = {};
    // for (var i = 0; i < obj.length; i++) {
    var propValues = obj.propValues;
    for (var j = 0; j < propValues.length; j++) {
      if (propValues[j].isModel == true) {
        console.log(propValues[j].key + obj.id + "为isModel");
        if (this.isObject(propValues[j].value)) {
          //为对象需要用json格式化
          var str = JSON.stringify(propValues[j].value);
          varsObj[propValues[j].key + obj.id] = str;
        } else if (this.isBoolean(propValues[j].value)) {
          var str = propValues[j].value;
          varsObj[propValues[j].key + obj.id] = str;
        } else {
          var str = '"' + propValues[j].value + '"';
          varsObj[propValues[j].key + obj.id] = str;
        }
      }
    }
    // }
    // }
    console.log(JSON.stringify(varsObj));
    return varsObj;
  },

  // 遍历json，找到methods模板并传入json编译成最终的methods代码。
  getBottomScriptMethods(obj) {
    let methodsObj = {};
    // for (var i = 0; i < obj.length; i++) {

    var componentName = obj.componentName;
    if (compentMethods[componentName] != null) {
      console.log(componentName + "有方法");
      var template = Handlebars.compile(compentMethods[componentName]);
      var tempateText = template({
        myItem: obj,
      });
      methodsObj[componentName + obj.id] = tempateText;
    }
    // }
    console.log("methodsObj:" + JSON.stringify(methodsObj));
    return methodsObj;
  },
  // 根据每个组件的模板文件，传入json，编译成所需的组件代码。
  generateVueCodeFromObjToText(obj) {
    var compoentName = obj.componentName;
    var compoentText = compoentTexts[compoentName];
    ;
    var template = Handlebars.compile(compoentText);
    var templateShowText = template({
      myItem: obj,
    });
    console.log(templateShowText);
    return templateShowText;
  },
  isObject(data) {
    return Object.prototype.toString.call(data) === "[object Object]";
  },
  isBoolean(data) {
    return Object.prototype.toString.call(data) === "[object Boolean]";
  },
};

export default generateObj;
