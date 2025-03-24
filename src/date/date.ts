class TimeUtils{
    private static getFormattedLocalDate(): string {
        const now = new Date();
        return now.toLocaleDateString();
    }
    static get(format?:string) {
        try{
            const localDate = TimeUtils.getFormattedLocalDate();
            if (!format || format === "YYYY/MM/DD") {
                return localDate;
            } else {
                const localDateArray = localDate.split("/");
                format = format.replace(/YYYY/g, localDateArray[0])
                    .replace(/MM/g, localDateArray[1])
                    .replace(/DD/g, localDateArray[2]);
                return format;
            }
        }catch (e){
            console.log(e)
            return '';
        }
    }
    static range(verifiedDate:string,previousDate:string,laterDate?:string): boolean {
        try{
            const start = new Date(previousDate);
            const end = laterDate ? new Date(laterDate) : new Date();
            const verified = new Date(verifiedDate);
            return verified >= start && verified <= end;
        }catch (e){
            console.log(e)
            return false;
        }
    }
    static days(previousDate:string,laterDate?:string): number {
        try{
            const localDate = new Date(TimeUtils.getFormattedLocalDate());
            const start = new Date(previousDate);
            const end = laterDate ? new Date(laterDate) : localDate;
            // 将日期转换为时间戳，计算天数差值，然后转换为天数
            const timeDiff = end.getTime() - start.getTime();
            return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        }catch (e){
            console.log(e)
            return NaN;
        }
    }
    static months(previousDate: string, laterDate?: string): number {
        try {
            const localDate = new Date(TimeUtils.getFormattedLocalDate());
            const start = new Date(previousDate);
            const end = laterDate ? new Date(laterDate) : localDate;

            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

            // 如果结束日期的天数小于开始日期的天数，减去一个月
            if (end.getDate() < start.getDate()) {
                return months - 1;
            }

            return months;
        } catch (e) {
            console.log(e);
            return NaN;
        }
    }
    static years(previousDate: string, laterDate?: string): number {
        try {
            const start = new Date(previousDate);
            const end = laterDate ? new Date(laterDate) : new Date();

            const years = end.getFullYear() - start.getFullYear();

            // 如果结束日期的月份小于开始日期的月份，减去一个年份
            if (end.getMonth() < start.getMonth()) {
                return years - 1;
            }

            // 如果月份相同，但结束日期的天数小于开始日期的天数，也减去一个年份
            if (end.getMonth() === start.getMonth() && end.getDate() < start.getDate()) {
                return years - 1;
            }

            return years;
        } catch (e) {
            console.log(e);
            return NaN;
        }
    }
    static order(previousDate: string, laterDate?: string): boolean {
        try {
            const start = new Date(previousDate);
            const end = laterDate?new Date(laterDate): new Date(TimeUtils.getFormattedLocalDate());
            return start <= end;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
class DateUtils {
    private static readonly DEFAULT_FORMAT = 'YYYY/MM/DD';
    private static readonly TIME_FORMAT = 'HH:mm:ss';
    private static readonly FULL_FORMAT = 'YYYY/MM/DD HH:mm:ss';

    /**
     * 格式化日期
     */
    static format(date: Date | string | number, format: string = DateUtils.DEFAULT_FORMAT): string {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const formatMap: { [key: string]: number | string } = {
            'YYYY': d.getFullYear(),
            'MM': DateUtils.padZero(d.getMonth() + 1),
            'DD': DateUtils.padZero(d.getDate()),
            'HH': DateUtils.padZero(d.getHours()),
            'mm': DateUtils.padZero(d.getMinutes()),
            'ss': DateUtils.padZero(d.getSeconds()),
            'SSS': DateUtils.padZero(d.getMilliseconds(), 3)
        };

        return Object.entries(formatMap).reduce((result, [key, value]) => {
            return result.replace(new RegExp(key, 'g'), String(value));
        }, format);
    }

    /**
     * 解析日期字符串
     */
    static parse(dateStr: string, format: string = DateUtils.DEFAULT_FORMAT): Date {
        // 处理日期和时间部分
        const [datePart, timePart] = dateStr.split(' ');
        
        // 解析日期
        const dateParts = datePart.split(/[/-]/);
        if (dateParts.length !== 3) {
            throw new Error('Invalid date format');
        }
        
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // 月份从0开始
        const day = parseInt(dateParts[2]);
        
        // 创建日期对象，默认时间为0
        const date = new Date(year, month, day);
        
        // 如果有时间部分，解析并设置时间
        if (timePart) {
            const timeParts = timePart.split(':');
            if (timeParts.length >= 1) date.setHours(parseInt(timeParts[0]));
            if (timeParts.length >= 2) date.setMinutes(parseInt(timeParts[1]));
            if (timeParts.length >= 3) date.setSeconds(parseInt(timeParts[2]));
        }
        
        return date;
    }

    /**
     * 日期比较
     */
    static compare(date1: Date | string, date2: Date | string): number {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getTime() - d2.getTime();
    }

    /**
     * 日期加减
     */
    static add(date: Date | string, amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): Date {
        const d = new Date(date);
        switch (unit) {
            case 'year':
                d.setFullYear(d.getFullYear() + amount);
                break;
            case 'month':
                d.setMonth(d.getMonth() + amount);
                break;
            case 'day':
                d.setDate(d.getDate() + amount);
                break;
            case 'hour':
                d.setHours(d.getHours() + amount);
                break;
            case 'minute':
                d.setMinutes(d.getMinutes() + amount);
                break;
            case 'second':
                d.setSeconds(d.getSeconds() + amount);
                break;
        }
        return d;
    }

    /**
     * 获取时间差
     */
    static diff(date1: Date | string, date2: Date | string, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): number {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diff = d2.getTime() - d1.getTime();

        switch (unit) {
            case 'year':
                return DateUtils.diffYears(d1, d2);
            case 'month':
                return DateUtils.diffMonths(d1, d2);
            case 'day':
                return Math.floor(diff / (1000 * 60 * 60 * 24));
            case 'hour':
                return Math.floor(diff / (1000 * 60 * 60));
            case 'minute':
                return Math.floor(diff / (1000 * 60));
            case 'second':
                return Math.floor(diff / 1000);
            default:
                return diff;
        }
    }

    /**
     * 是否为有效日期
     */
    static isValid(date: any): boolean {
        if (!date) return false;
        const d = new Date(date);
        return !isNaN(d.getTime());
    }

    /**
     * 是否为闰年
     */
    static isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * 获取月份天数
     */
    static getDaysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * 获取日期范围
     */
    static getDateRange(start: Date | string, end: Date | string): Date[] {
        const dates: Date[] = [];
        let current = new Date(start);
        const endDate = new Date(end);

        while (current <= endDate) {
            dates.push(new Date(current));
            current = DateUtils.add(current, 1, 'day');
        }

        return dates;
    }

    /**
     * 获取相对时间描述
     */
    static getRelativeTime(date: Date | string): string {
        const d = new Date(date);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const diffMinutes = Math.floor(diff / (1000 * 60));
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return '刚刚';
        if (diffMinutes < 60) return `${diffMinutes}分钟前`;
        if (diffHours < 24) return `${diffHours}小时前`;
        if (diffDays < 30) return `${diffDays}天前`;
        return DateUtils.format(d);
    }

    // 私有辅助方法
    private static padZero(num: number, length: number = 2): string {
        return String(num).padStart(length, '0');
    }

    private static diffYears(d1: Date, d2: Date): number {
        const years = d2.getFullYear() - d1.getFullYear();
        if (d2.getMonth() < d1.getMonth() || 
            (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())) {
            return years - 1;
        }
        return years;
    }

    private static diffMonths(d1: Date, d2: Date): number {
        const months = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
        if (d2.getDate() < d1.getDate()) {
            return months - 1;
        }
        return months;
    }
}

export default DateUtils;
