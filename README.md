<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="150" /></p>

<P align="center"><b>ArayTS</b>，A set of practical tools and services that make working with TypeScript in Vue projects easy and enjoyable.</P>
<hr />

<<<<<<< HEAD
### English | [简体中文](https://github.com/Kuingsmile/PicList/blob/dev/README.md)
[//]: # (### English)
=======
[//]: # (### English | [简体中文]&#40;https://github.com/Kuingsmile/PicList/blob/dev/README.md&#41;)
### English
>>>>>>> eb3dd321952ffd71bcf199241ff2f254f4517cbc
 Through ArayTS, you can easily use TypeScript in Vue3\other TS supported projects to improve development efficiency and reduce potential errors. Designed to simplify daily tasks, it provides developers with a set of practical tools and services to make using TypeScript in Vue projects easy and enjoyable.

### Use a package manager
I recommend that you install **ArayTS** using the **NPM** package manager.
```
npm install arayts --save
```
### Imported within the component
In **1.0.3 and below**, **ArayTS** does not support global import. You can use **ArayTS** by introducing it within the component.
```
<script lang="ts" setup>
  import {Email} from 'arayts'
</script>
```
### Manual
- E-mail verification:

    If correct, return true, if incorrect, return false.
    There are three ways to use the email verification function:
    1. Input the email address that needs to be verified.
        ```
        import {Email} from 'arayts';
        const isTrue = Email('3497547233@qq.com');
        ```
    2. Enter the email address whose format needs to be verified and the email domain name that needs to be verified for compliance.
        ```
        import {Email} from 'arayts';
        const isTrue = Email('3497547233@qq.com','qq.com');
        ```
    3. Enter the email address whose format needs to be verified and the array of email domain names that need to be verified for compliance.
        ```
        import {Email} from 'arayts';
        const isTrue = Email('3497547063@qq.com',["outlook.com","qq.com"]);
        ```
- Mobile phone number verification:

    If correct, return true, if incorrect, return false.
    There are three ways to use the mobile phone number verification function:
    1. Enter the mobile phone number whose format needs to be verified.
        ```
        import {Phone} from 'arayts';
        const isTrue = Phone('15156169999');
        ```
    2. Input the mobile phone number that needs to be verified and the region that needs to be verified for compliance.
        ```
        import {Phone} from 'arayts';
        const isTrue = Phone('15156169999','zh-CN');
        ```
    3. Pass in the mobile phone number whose format needs to be verified and the region array that needs to be verified for compliance.
        ```
        import {Phone} from 'arayts';
        const isTrue = Phone('15156169999',['zh-CN','en-hk']);
        ```

- Date operations:

    There are four date operation functions:
    1. Date acquisition (returns string type data).
        ```
        import {Time} from 'arayts';
        const date = Time.get();
        ```
    2. Determine the date range (return boolean type data).
        ```
        import {Time} from 'arayts';
        const verifiedDate = '2023/11/26';
        const previousDate = '2023/11/25';
        const laterDate = '2023/11/27';
        
        const isTrue = Time.range(verifiedDate,previousDate);//By default the latter date is the local date.
        const isTrueTwo = Time.range(verifiedDate,previousDate,laterDate);
        ```
    3. Date comparison (returns boolean type data).
        ```
        import {Time} from 'arayts';
        const previousDate = '2023/11/25';
        const laterDate = '2023/11/27';
            
        const isTrue = Time.order(previousDate,laterDate);
        const isTrue = Time.order(previousDate); //By default the latter date is the local date.
        ```
    4. Date calculation (return number type data).


        Currently, only the calculation of year, month and day is supported. If necessary, calculation can be added in future versions, please contact the administrator.
        
        There are three date calculation functions:
        1. Calculate the number of days.
            ```
            import {Time} from 'arayts';
            const previousDate = '2023/11/25';
            const laterDate = '2023/11/27';
            
            const days = Time.days(previousDate,laterDate);
            const days = Time.days(previousDate); //By default the latter date is the local date.
            ```
        2. Calculate the number of months.
           ```
            import {Time} from 'arayts';
            const previousDate = '2023/11/25';
            const laterDate = '2023/11/27';
            
            const months = Time.months(previousDate,laterDate);
            const months = Time.months(previousDate); //By default the latter date is the local date.
            ```
        3. Calculate the number of years.
             ```
            import {Time} from 'arayts';
            const previousDate = '2023/11/25';
            const laterDate = '2023/11/27';
            
            const years = Time.years(previousDate,laterDate);
            const years = Time.years(previousDate); //By default the latter date is the local date.
            ```
- Generate random numbers:
    Supports two usage methods, returning number type data:
    1. Only pass in the number of digits of the random number;

        ```
         import {random} from 'arayts';
            
         const data = random(4);
        ```
    2. Pass in the number of digits and range;

        ```
        import {random} from 'arayts';
            
        const data = random(4,0,100);
        ```
<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="200" /></p>
<P align="center"><b>ArayTS</b>，一套实用工具和服务，使 TypeScript 在 Vue 项目中变得轻松愉快。</P>
<hr />
