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
  import {Email} from 'arayts'  
</script>
```

<!-- ### Global introduction
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
``` -->

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

Attached is a comparison table of language (culture) codes and country regions:
<table><thead><tr><th style="text-align:left"><div><div class="table-header"><p>Simplified Chinese (China)</p></div> </div></th><th style="text-align:left"><div><div class="table-header"><p>zh-cn</p></div></div ></th><th style="text-align:left"><div><div class="table-header"><p>Traditional Chinese (Taiwan, China)</p></div></div ></th><th style="text-align:left"><div><div class="table-header"><p>zh-tw</p></div></div></ th></tr></thead><tbody><tr><td style="text-align:left"><div><div class="table-cell"><p>Traditional Chinese (Hong Kong, China) </p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>zh-hk</p ></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English (Hong Kong, China)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-hk</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (United States)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-us</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English ( United Kingdom)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-gb< /p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p> English (global)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en- ww</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English (Canada)< /p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ca</p> </div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Australia )</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-au</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English (Ireland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ie</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Finland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-fi</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Finnish (Finland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fi-fi </p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p >English(Denmark)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-dk</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Danish (Denmark)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>da-dk</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Israel)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-il</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Heber Laiyu (Israel)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>he -il</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"> <p>English (South Africa)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-za</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English ( India)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-in</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Norway)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-no</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English ( Singapore)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-sg< /p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p> English (New Zealand)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en- nz</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English (Indonesia)< /p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-id</p> </div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Philippines )</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-ph</ p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English (Thailand)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-th</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>English (Malaysia)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >en-my</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>English ( Arabic)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>en-xa< /p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p> Korean (South Korea)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ko- kr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Japanese (Japan)< /p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ja-jp</p> </div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>Dutch ( Netherlands)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>nl-nl</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Dutch (Belgium)</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>nl-be</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table- cell"><p>Portuguese (Portugal)</p></div></div></td><td style="text-align:left"><div><div class="table-cell "><p>pt-pt</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>Portuguese (Brazil)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >pt-br</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell "><p>French (France)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"> <p>fr-fr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p> French (Luxembourg)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr- lu</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell">< p>French (Switzerland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>fr-ch</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>French (Belgium)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >fr-be</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell "><p>French (Canada)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"> <p>fr-ca</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p> Spanish (Latin America)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p> es-la</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell" ><p>Spanish (Spain)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"> <p>es-es</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p> Spanish(Argentina)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-ar</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>Spanish (United States)</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>es-us</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Spain Language (Mexico)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es- mx</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell">< p>Spanish (Colombia)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >es-co</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Spanish (Puerto Rico)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>es-pr </p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p >German (Germany)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>de-de</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>German (Austria)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >de-at</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell "><p>German (Switzerland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"> <p>de-ch</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p> Russian (Russia)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>ru- ru</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell">< p>Italian (Italy)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >it-it</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Greek (Greece)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>el-gr</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell"><p>Norwegian (Norway)</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>no-no</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Hungary Language (Hungary)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>hu- hu</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell">< p>Turkish (Turkey)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p >tr-tr</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Czech (Czech Republic)</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>cs- cz</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table-cell">< p>Slovenian</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>sl-sl</p></div></div></td><td style="text-align:left"><div><div class="table-cell"><p>Polish (Poland)</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>pl-pl</p></div></div></td></tr><tr><td style="text-align:left"><div><div class="table- cell"><p>Swedish (Sweden)</p></div></div></td><td style="text-align:left"><div><div class="table-cell "><p>sv-se</p></div></div></td><td style="text-align:left"><div><div class="table-cell">< p>Spanish (Chile)</p></div></div></td></tr></tbody></table>

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
In ArayTS@1.2.8 and above, the password encryption function has been canceled in the Vue project. You can only use the salt method to obtain the salt value. Because the use of built-in modules such as crypto has been canceled in webpack > 5 versions, it is being actively used. Find equivalent alternatives.

salt method, obtain the salt value;
```
import { salt } from 'arayts';
const salt = salt(16); // 16 represents the byte length, the default is 16 if not written.
```
<!-- 1. Salt method, obtain salt value;
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
``` -->

#### :tada: Browser compatible with CSS:
Provides a function that can solve the compatibility issues of different browsers:
```
import { applyStyles } from 'arayts';

const myElement = document.getElementById('example') as HTMLElement;
if (myElement) {
  applyStyles(myElement);
}
```

#### :tada: Data filtering:
In the `ArayTS@1.3.0` version, only the fuzzy matching function is temporarily provided:
```
import { fuzzyFilter } from 'arayts';

const userInput = "Hello";
const dataArray = [
  { name: "Hello World" },
  { name: "Hello little bird" },
  { name: "Hello little bird" },
  { name: "Hello World" },
  // Other data items...
];

const filteredItems = fuzzyFilter(userInput, dataArray, "name", 100);
console.log(filteredItems);

// userInput: reference for filtering data
// dataArray: the data array that needs to be filtered, the object name can be customized
// "name": the field name that needs to be filtered
// 100: The top 100 that best match the filtered data
```

#### :tada: Page monitoring:
The data returned are all objects.
1. Monitor mouse position
```
import {Doc} from 'arayts';

const currentPosition = Doc.getMouse();
console.log(`Mouse Position: x=${currentPosition.x}, y=${currentPosition.y}`);
```

2. Monitor the scroll bar position
```
import {Doc} from 'arayts';

const currentPosition2 = Doc.getScroll();
console.log(`Mouse Position: x=${currentPosition2.x}, y=${currentPosition2.y}`);
```
<p align="center"><img src="https://github.com/Reset-Sheep/ArayTS/blob/img/logo.jpg" alt="arayts" width="200" /></p>
<P align="center"><b>ArayTS</b>，A set of practical tools and services that make working with TypeScript in Vue projects easy and enjoyable.</P>
<hr />
