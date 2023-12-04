<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="150" /></p>

<P align="center"><b>ArayTS</b>，A set of practical tools and services that make working with TypeScript in Vue projects easy and enjoyable.</P>
<hr />

### :hear_no_evil: English | [简体中文](https://github.com/Reset-Sheep/ArayTS/blob/main/README.CN.md)

Through ArayTS, you can easily use TypeScript in Vue3\other TS supported projects to improve development efficiency and reduce potential errors. Designed to simplify daily tasks, it provides developers with a set of practical tools and services to make using TypeScript in Vue projects easy and enjoyable.

Through ArayTS, you can easily use TypeScript in Vue3\other TS supported projects to improve development efficiency and reduce potential errors. Designed to simplify daily tasks, it provides developers with a set of practical tools and services to make using TypeScript in Vue projects easy and enjoyable.

 <p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/_08aab89c-1522-4364-8791-ce68b1465146.jpg" alt="bg" /></p>

### Use a package manager
I recommend that you install **ArayTS** using the **NPM** package manager.
```
npm install arayts --save
```
### Imported within the component
I recommend you to use **ArayTS** the way you introduce it inside the component.

Introduced in the vue file that needs to be used:
```
<script lang="ts" setup>
  import {Email} from 'arayts'  //If introduced globally, this sentence does not need to be written
</script>
```

### Global introduction
Introduced in the main.ts file:

```
import { createApp } from 'vue'
import App from './App.vue'
import arayts from 'arayts'

const app = createApp(App)
app.use(App)
app.use(arayts)
app.mount('#app')
```
If you use global import, you need to use `arayts` to call the function before all the following methods, for example:
```
const isTrue = arayts.Email('3497547233@qq.com');
const date = arayts.Time.get();
```

### Manual
#### :tada: E-mail verification:

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

#### :tada: Mobile phone number verification:

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

#### :tada: Date operations:

There are four date operation functions:
1. Date acquisition (returns string type data).
     ```
     import {Time} from 'arayts';
     const date = Time.get();
     const date = Time.get("YYYY=MM=DD"); //The returned date format can be customized, but it must include one, two or all of YYYY, MM, DD
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

#### :tada: Generate random numbers:

Supports two usage methods, returning number type data:
1. Only pass in the number of digits of the random number;

     ```
      import {random} from 'arayts';
         
      const data = random(4);
     ```
2. Pass in the number of digits and range;

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

#### :tada: Temporary storage function:
The temporary storage function function supports storing functions and calling them on any page, which greatly saves code redundancy and improves code reuse.
```
// custom function
import { Storage } from 'arayts';

function existingFunction() {
    console.log(123)
}
Storage.save('myFunction', existingFunction);   //Save function to repository
const storedFunction = Storage.get('myFunction');   //Call function from repository
storedFunction();   //Call functions
Storage.remove('myFunction');   //Delete this function
Storage.clear();    //Clear function
```

#### :tada: Password encryption:
The password encryption function has four optional encryption methods (pbkdf2, bcrypt, scrypt, md5). Each encryption method has rich optional values, as follows:
1. Salt method, obtain salt value;
```
import { salt } from 'arayts';   
const salt = salt(16); // 16 represents the byte length, the default value is 16 if not written.
```

2. pbkdf2 encryption;
```
import { pbkdf2 } from 'arayts';   

const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232",-1,-1,"",""); //Select the default value for all the last four digits, the effect is the same as the previous sentence
const data3 = pbkdf2("123","2323232",10,9,"sha512","base64");

// "123": Password, required
// "2323232": salt value, required
// 10: Number of iterations, optional, default value is 10000
// 9: Supplementary, optional, default value 64
// "sha512": algorithm, optional, default value 'sha512', optional values 'sha512', 'sha1', 'sha256', 'md5'
// "base64": encoding, optional, default value 'hex', optional values 'hex', 'base64'
```

3. bcrypt encryption;
```
import { bcrypt } from 'arayts';   

const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232","",""); //Select the default value for all the last two digits, the effect is the same as the previous sentence
const data3 = pbkdf2("123","2323232","sha512","base64");

// "123": Password, required
// "2323232": salt value, required
// "sha512": algorithm, optional, default value 'sha512', optional values 'sha512', 'sha1', 'sha256', 'md5'
// "base64": encoding, optional, default value 'hex', optional values 'hex', 'base64'
```

4. scrypt encryption;
```
import { scrypt } from 'arayts';   
    
const data = pbkdf2("123","2323232");
const data2 = pbkdf2("123","2323232",-1,""); //Select the default value for all the last two digits, the effect is the same as the previous sentence
const data3 = pbkdf2("123","2323232",10,"base64");

// "123": Password, required
// "2323232": salt value, required
// 10: Number of digits, optional, default value 64
// "base64": encoding, optional, default value 'hex', optional values 'hex', 'base64'
```

5、md5 encryption；
```
import { md5 } from 'arayts';   

const data = pbkdf2("123");
const data2 = pbkdf2("123",""); //Select the default value for all the last digits, the effect is the same as the previous sentence
const data3 = pbkdf2("123","base64");

// "123": Password, required
// "base64": encoding, optional, default value 'hex', optional values 'hex', 'base64'
```

<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="200" /></p>
<P align="center"><b>ArayTS</b>，A set of practical tools and services that make working with TypeScript in Vue projects easy and enjoyable.</P>
<hr />
