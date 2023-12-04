<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="150" /></p>
<P align="center"><b>ArayTS</b>，一套实用工具和服务，使在 Vue 项目中使用 TypeScript 变得轻松愉快。</P>
<hr />

### :hear_no_evil: 简体中文 | [English](https://github.com/Reset-Sheep/ArayTS/blob/main/README.md)

通过 ArayTS，您可以轻松在 Vue3 或其他支持 TypeScript 的项目中使用 TypeScript，提高开发效率并减少潜在错误。旨在简化日常任务，它为开发人员提供了一套实用工具和服务，使在 Vue 项目中使用 TypeScript 变得轻松愉快。
 <p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/_08aab89c-1522-4364-8791-ce68b1465146.jpg" alt="bg" /></p>

### 使用包管理器

我建议您使用 **NPM** 包管理器安装 **ArayTS**。
```
npm install arayts --save
```

### 在组件内引入
我建议您使用在组件内引入的方式来使用 **ArayTS**。

在需要使用的vue文件中引入：
```
<script lang="ts" setup>
  import {Email} from 'arayts' 
</script>
```

<!-- ### 全局引入
在main.ts文件中引入：
```
import { createApp } from 'vue'
import App from './App.vue'
import arayts from 'arayts'

const app = createApp(App)
app.use(App)
app.use(arayts)
app.mount('#app')
```
如果您使用全局引入，需要在以下所有方法之前使用`arayts`调用函数，例如：
```
const isTrue = arayts.Email('3497547233@qq.com');
const date = arayts.Time.get();
``` -->

### 操作手册
#### :tada: 电子邮件验证：

如果正确，返回 true，如果不正确，返回 false。
有三种使用电子邮件验证功能的方式：
1. 输入需要验证的电子邮件地址。
  ```
  import { Email } from 'arayts'; 
  const isTrue = Email('3497547233@qq.com');
  ```
2. 输入需要验证格式的电子邮件地址和需要验证符合性的电子邮件域名。
  ```
  import { Email } from 'arayts'; 
  const isTrue = Email('3497547233@qq.com', 'qq.com');
  ```
3. 输入需要验证格式的电子邮件地址和需要验证符合性的电子邮件域名数组。
  ```
  import { Email } from 'arayts'; 
  const isTrue = Email('3497547063@qq.com', ["outlook.com", "qq.com"]);
  ```
#### :tada: 手机号码验证：

如果正确，返回 true，如果不正确，返回 false。
有三种使用手机号码验证功能的方式：
1. 输入需要验证格式的手机号码。
  ```
  import { Phone } from 'arayts'; 
  const isTrue = Phone('15156169999');//默认中国地区
  ```
2. 输入需要验证的手机号码和需要验证符合性的地区。
  ```
  import { Phone } from 'arayts'; 
  const isTrue = Phone('15156169999', 'zh-CN');
  ```
3. 传入需要验证格式的手机号码和需要验证符合性的地区数组。
  ```
  import { Phone } from 'arayts'; 
  const isTrue = Phone('15156169999', ['zh-CN', 'en-hk']);
  ```

附上语言（文化）代码与国家地区对照表：
<table><thead><tr><th style="text-align:left"><div><div class="table-header"><p>简体中文(中国)</p></div></div></th><th style="text-align:left"><div><div class="table-header"><p>zh-cn</p></div></div></th><th style="text-align:left"><div><div class="table-header"><p>繁体中文(中国台湾)</p></div></div></th><th style="text-align:left"><div><div class="table-header"><p>zh-tw</p></div></div></th></tr></thead><tbody><tr><td style="text-align:left"><div><div class="table-cell"><p>繁体中文(中国香港)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>zh-hk</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(中国香港)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-hk</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(美国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-us</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(英国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-gb</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(全球)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ww</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(加拿大)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ca</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(澳大利亚)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-au</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(爱尔兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ie</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(芬兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-fi</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>芬兰语(芬兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fi-fi</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(丹麦)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-dk</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>丹麦语(丹麦)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>da-dk</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(以色列)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-il</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>希伯来语(以色列)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>he-il</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(南非)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-za</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(印度)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-in</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(挪威)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-no</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(新加坡)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-sg</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(新西兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-nz</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(印度尼西亚)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-id</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(菲律宾)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ph</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(泰国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-th</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>英语(马来西亚)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-my</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>英语(阿拉伯)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-xa</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>韩文(韩国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ko-kr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>日语(日本)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ja-jp</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>荷兰语(荷兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>nl-nl</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>荷兰语(比利时)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>nl-be</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>葡萄牙语(葡萄牙)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>pt-pt</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>葡萄牙语(巴西)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>pt-br</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>法语(法国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-fr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>法语(卢森堡)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-lu</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>法语(瑞士)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-ch</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>法语(比利时)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-be</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>法语(加拿大)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-ca</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(拉丁美洲)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-la</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(西班牙)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-es</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(阿根廷)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-ar</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(美国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-us</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(墨西哥)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-mx</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(哥伦比亚)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-co</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(波多黎各)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-pr</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>德语(德国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>de-de</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>德语(奥地利)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>de-at</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>德语(瑞士)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>de-ch</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>俄语(俄罗斯)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ru-ru</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>意大利语(意大利)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>it-it</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>希腊语(希腊)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>el-gr</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>挪威语(挪威)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>no-no</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>匈牙利语(匈牙利)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>hu-hu</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>土耳其语(土耳其)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>tr-tr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>捷克语(捷克共和国)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>cs-cz</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>斯洛文尼亚语</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>sl-sl</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>波兰语(波兰)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>pl-pl</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>瑞典语(瑞典)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>sv-se</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>西班牙语(智利)</p></div></div></td></tr></tbody></table>

#### :tada: 日期操作：

有四个日期操作函数：
1. 获取日期（返回字符串类型数据）。
     ```
     import { Time } from 'arayts'; 
     const date = Time.get();
     const date = Time.get("YYYY=MM=DD"); //可以自定义返回的日期格式，但是要包括YYYY、MM、DD中的一种或两种或全部
     ```
2. 确定日期范围（返回布尔类型数据）。
     ```
     import { Time } from 'arayts';
     const verifiedDate = '2023/11/26';
     const previousDate = '2023/11/25';
     const laterDate = '2023/11/27';
      
     const isTrue = Time.range(verifiedDate, previousDate); // 默认情况下，后一天是本地日期。
     const isTrueTwo = Time.range(verifiedDate, previousDate, laterDate);
     ```
3. 日期比较（返回布尔类型数据）。
     ```
     import { Time } from 'arayts';
     const previousDate = '2023/11/25';
     const laterDate = '2023/11/27';
          
     const isTrue = Time.order(previousDate, laterDate);
     const isTrue = Time.order(previousDate); // 默认情况下，后一天是本地日期。
     ```
4. 日期计算（返回数字类型数据）。

   目前仅支持年、月和日的计算。如有需要，可以在将来的版本中添加计算，请与管理员联系。

   有三个日期计算函数：
    1. 计算天数。
         ```
         import { Time } from 'arayts';
         const previousDate = '2023/11/25';
         const laterDate = '2023/11/27';
         
         const days = Time.days(previousDate, laterDate);
         const days = Time.days(previousDate); // 默认情况下，后一天是本地日期。
          ```
    2. 计算月数。
         ```
         import { Time } from 'arayts';
         const previousDate = '2023/11/25';
         const laterDate = '2023/11/27';
         
         const months = Time.months(previousDate, laterDate);
         const months = Time.months(previousDate); // 默认情况下，后一天是本地日期。
         ```
    3. 计算年数。
         ```
         import { Time } from 'arayts';
         const previousDate = '2023/11/25';
         const laterDate = '2023/11/27';
         
         const years = Time.years
          ```
#### :tada: 生成随机数：
支持两种使用方式，返回number类型数据：

1、只传入随机数的位数；

  ```
  import {random} from 'arayts';
            
  const data = random(4);
  ```
2、传入位数和范围；

  ````
  import {random} from 'arayts';
            
  const data = random(4,0,100);
  ````

#### :tada: 临时存储函数：
临时存储函数功能支持存储函数后在任何页面进行调用，大大节省代码冗余，提高代码复用。
```
// 自定义的函数
import { Storage } from 'arayts';

function existingFunction() {
    console.log(123)
}
Storage.save('myFunction', existingFunction);   //保存函数到仓库
const storedFunction = Storage.get('myFunction');   //从仓库调用函数
storedFunction();   //调用函数
Storage.remove('myFunction');   //删除该条函数
Storage.clear();    //清空函数
```

#### :tada: 密码加密：
在ArayTS@1.2.8及以上版本中，密码加密功能在Vue项目中已取消使用，仅可使用其中的salt方法获取盐值，因为webpack > 5版本中取消了crypto等内置模块的使用，正在积极寻求同等替代。

<!-- 密码加密功能共有四种可选加密方式（pbkdf2，bcrypt，scrypt，md5），且每种加密方式有丰富的可选值，具体如下： -->
<!-- 1. salt方法，获取盐值； -->
salt方法，获取盐值；
```
import { salt } from 'arayts';  
const salt = salt(16); // 16 表示字节长度，不写默认 16 。
```

<!-- 2. pbkdf2加密；
```
import { pbkdf2 } from 'arayts';  

const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232",-1,-1,"",""); //后四位全部选取默认值，作用同上一句
const data3 = pbkdf2("123","2323232",10,9,"sha512","base64");

// "123"：密码，必填
// "2323232"：盐值，必填
// 10：迭代次数，选填，后默认值10000
// 9：位数，选填，默认值64
// "sha512"：算法，选填，默认值'sha512'，可选值'sha512'、'sha1'、'sha256'、'md5'
// "base64"：编码，选填，默认值'hex'，可选值'hex'、'base64'
```

3. bcrypt加密；
```
import { bcrypt } from 'arayts';  

const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232","",""); //后二位全部选取默认值，作用同上一句
const data3 = pbkdf2("123","2323232","sha512","base64");

// "123"：密码，必填
// "2323232"：盐值，必填
// "sha512"：算法，选填，默认值'sha512'，可选值'sha512'、'sha1'、'sha256'、'md5'
// "base64"：编码，选填，默认值'hex'，可选值'hex'、'base64'
```

4. scrypt加密；
```
import { scrypt } from 'arayts';  
    
const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232",-1,""); //后二位全部选取默认值，作用同上一句
const data3 = pbkdf2("123","2323232",10,"base64");

// "123"：密码，必填
// "2323232"：盐值，必填
// 10：位数，选填，默认值64
// "base64"：编码，选填，默认值'hex'，可选值'hex'、'base64'
```

5. md5加密；
```
import { md5 } from 'arayts';  

const data = pbkdf2("123");
const data2 = pbkdf2("123",""); //后一位全部选取默认值，作用同上一句
const data3 = pbkdf2("123","base64");

// "123"：密码，必填
// "base64"：编码，选填，默认值'hex'，可选值'hex'、'base64'
``` -->
#### :tada: 浏览器兼容CSS：
提供了一个能够解决不同浏览器的兼容性问题的函数：
```
import { applyStyles } from 'arayts';

const myElement = document.getElementById('example') as HTMLElement;
if (myElement) {
  applyStyles(myElement);
}
```

#### :tada: 数据过滤：
在`ArayTS@1.3.*`版本中暂时仅提供模糊匹配的功能：
```
import { fuzzyFilter } from 'arayts';

const userInput = "你好";
const dataArray = [
  { name: "你好世界" },
  { name: "你好小鸟" },
  { name: "你小鸟好" },
  { name: "Hello World" },
  // 其他数据项...
];

const filteredItems = fuzzyFilter(userInput, dataArray, "name"，100);
console.log(filteredItems);

// userInput：过滤数据的参考
// dataArray：需要过滤的数据数组，对象名可自定义
// "name"：需要过滤的字段名
// 100：最符合过滤数据的前100个
```

#### :tada: 页面监听：
返回的数据都是对象。
1. 监听鼠标位置
```
import {Doc} from 'arayts';

const currentPosition = Doc.getMouse();
console.log(`Mouse Position: x=${currentPosition.x}, y=${currentPosition.y}`);
```

2. 监听滚动条位置
```
import {Doc} from 'arayts';

const currentPosition2 = Doc.getScroll();
console.log(`Mouse Position: x=${currentPosition2.x}, y=${currentPosition2.y}`);
```
<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="200" /></p>
<P align="center"><b>ArayTS</b>，一套实用工具和服务，使 TypeScript 在 Vue 项目中变得轻松愉快。</P>
<hr />
