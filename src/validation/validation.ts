// src/emailValidator.ts
const Email = (email: string,domains?:string[] | string) =>{
    // 验证邮箱格式
    const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try{
        if (!emailFormatRegex.test(email)) {
            return false;
        }
        // 如果传递了域名，验证域名是否匹配
        if (domains) {
            if (typeof domains === 'string') {
                domains = [domains];
            }
            const emailDomain = email.split('@')[1];
            return domains.includes(emailDomain);
        }
        return true;  // 如果没有传递域名，只验证邮箱格式
    }catch (e){
        console.log(e)
        return false;
    }
}

class PhoneNumberValidator {
    private static patterns: Record<string, RegExp> = {
        'zh-CN': /^(\+?0?86-?)?1[345789]\d{9}$/,
        'en-hk': /^(\+?0?852-?)([6|9])\d{7}$/,
        'zh-TW': /^(\+?886-?|0)?9\d{8}$/,
        'ar-DZ': /^(\+?213|0)[567]\d{8}$/,
        'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
        'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
        'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
        'cs-CZ': /^(\+?420)? ?[1-9]\d{2} ?\d{3} ?\d{3}$/,
        'de-DE': /^(\+?49[ .-])?(\(\d{1,6}\))?[\d ./-]{3,20}(?:x|ext|extension?\d{1,4})?$/,
        'da-DK': /^(\+?45)?(\d{8})$/,
        'el-GR': /^(\+?30)?(69\d{8})$/,
        'en-AU': /^(\+?61|0)4\d{8}$/,
        'en-GB': /^(\+?44|0)7\d{9}$/,
        'en-HK': /^(\+?852-?)?[569]\d{3}-?\d{4}$/,
        'en-IN': /^(\+?91|0)?[789]\d{9}$/,
        'en-NZ': /^(\+?64|0)2\d{7,9}$/,
        'en-ZA': /^(\+?27|0)\d{9}$/,
        'en-ZM': /^(\+?26)?09[567]\d{7}$/,
        'es-ES': /^(\+?34)?(6\d|7[1234])\d{7}$/,
        'fi-FI': /^(\+?358|0)\s?(4(01245)?|50)\s?(\d\s?){4,8}\d$/,
        'fr-FR': /^(\+?33|0)[67]\d{8}$/,
        'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
        'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
        'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
        'ja-JP': /^(\+?81|0)\d{1,4}[ -]?\d{1,4}[ -]?\d{4}$/,
        'ms-MY': /^(\+?6?01)([145](?:-|\s)?\d{7,8}|[236789](?:\s|-)?\d{7})$/,
        'nb-NO': /^(\+?47)?[49]\d{7}$/,
        'nl-BE': /^(\+?32|0)4?\d{8}$/,
        'nn-NO': /^(\+?47)?[49]\d{7}$/,
        'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
        'pt-BR': /^(\+?55|0)-?[1-9]{2}-?[2-9]\d{3,4}-?\d{4}$/,
        'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
        'ru-RU': /^(\+?7|8)?9\d{9}$/,
        'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
        'tr-TR': /^(\+?90|0)?5\d{9}$/,
        'vi-VN': /^(\+?84|0)?((1(2(\d)|6([2-9])|88|99))|(9((?!5)\d)))(\d{7})$/,
    };
    static isValid(phoneNumber: string, regions?: string | string[]) {
        try{
            if (regions){
                if (typeof regions === 'string') {
                    regions = [regions];
                }
                // 匹配指定国家地区
                const selectedPatterns = regions.map((region) => this.patterns[region]).filter(Boolean);
                return selectedPatterns.some((pattern) => pattern.test(phoneNumber));
            }else {
                return this.patterns['zh-CN'].test(phoneNumber);
            }
        }catch (e){
            console.log(e)
            return false;
        }
    }
}

const Phone = (email: string,domains?: string | string[]) =>{
    return PhoneNumberValidator.isValid(email,domains);
}
export {Email,Phone};

