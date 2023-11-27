<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="150" /></p>
<P align="center"><b>ArayTS</b>，一套实用工具和服务，使在 Vue 项目中使用 TypeScript 变得轻松愉快。</P>
<hr />

### 简体中文 | [English](https://github.com/Reset-Sheep/ArayTS/blob/main/README.md)

通过 ArayTS，您可以轻松在 Vue3 或其他支持 TypeScript 的项目中使用 TypeScript，提高开发效率并减少潜在错误。旨在简化日常任务，它为开发人员提供了一套实用工具和服务，使在 Vue 项目中使用 TypeScript 变得轻松愉快。
 <p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/_08aab89c-1522-4364-8791-ce68b1465146.jpg" alt="bg" /></p>
### 使用包管理器
我建议您使用 **NPM** 包管理器安装 **ArayTS**。
```
npm install arayts --save
```
### 在组件内导入
在 **1.0.3 及以下版本**，**ArayTS** 不支持全局导入。您可以通过在组件内引入的方式来使用 **ArayTS**。
```
<script lang="ts" setup>
  import {Email} from 'arayts'
</script>
```
### 操作手册
- 电子邮件验证：

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
- 手机号码验证：

  如果正确，返回 true，如果不正确，返回 false。
  有三种使用手机号码验证功能的方式：
    1. 输入需要验证格式的手机号码。
        ```
        import { Phone } from 'arayts';
        const isTrue = Phone('15156169999');
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

       - 日期操作：

         有四个日期操作函数：
           1. 获取日期（返回字符串类型数据）。
               ```
               import { Time } from 'arayts';
               const date = Time.get();
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
<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="200" /></p>
<P align="center"><b>ArayTS</b>，一套实用工具和服务，使 TypeScript 在 Vue 项目中变得轻松愉快。</P>
<hr />
