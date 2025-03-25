export class TimeUtils{
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

    /**
     * 获取当前时间戳（毫秒）
     */
    static timestamp(): number {
        return Date.now();
    }

    /**
     * 获取指定日期的时间戳（毫秒）
     */
    static getTimestamp(date: string | Date): number {
        try {
            return new Date(date).getTime();
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    /**
     * 格式化时间为指定格式
     * @param format 支持：YYYY-MM-DD HH:mm:ss
     */
    static formatDate(date: Date | string = new Date(), format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        try {
            const d = new Date(date);
            const formatObj = {
                YYYY: d.getFullYear(),
                MM: String(d.getMonth() + 1).padStart(2, '0'),
                DD: String(d.getDate()).padStart(2, '0'),
                HH: String(d.getHours()).padStart(2, '0'),
                mm: String(d.getMinutes()).padStart(2, '0'),
                ss: String(d.getSeconds()).padStart(2, '0')
            };

            return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => String(formatObj[match as keyof typeof formatObj]));
        } catch (e) {
            console.log(e);
            return '';
        }
    }

    /**
     * 判断是否为同一天
     */
    static isSameDay(date1: Date | string, date2: Date | string): boolean {
        try {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 获取指定日期是星期几
     * @returns 0-6 (0表示星期日)
     */
    static getWeekDay(date: Date | string = new Date()): number {
        try {
            return new Date(date).getDay();
        } catch (e) {
            console.log(e);
            return NaN;
        }
    }

    /**
     * 获取相对时间描述
     */
    static getRelativeTime(date: Date | string): string {
        try {
            const now = Date.now();
            const timestamp = new Date(date).getTime();
            const diff = now - timestamp;

            if (diff < 0) {
                return TimeUtils.formatDate(date);
            }

            const minute = 60 * 1000;
            const hour = 60 * minute;
            const day = 24 * hour;
            const month = 30 * day;
            const year = 12 * month;

            if (diff < minute) {
                return '刚刚';
            } else if (diff < hour) {
                return `${Math.floor(diff / minute)}分钟前`;
            } else if (diff < day) {
                return `${Math.floor(diff / hour)}小时前`;
            } else if (diff < month) {
                return `${Math.floor(diff / day)}天前`;
            } else if (diff < year) {
                return `${Math.floor(diff / month)}个月前`;
            } else {
                return `${Math.floor(diff / year)}年前`;
            }
        } catch (e) {
            console.log(e);
            return '';
        }
    }

    /**
     * 添加时间
     */
    static addTime(date: Date | string, num: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): Date {
        try {
            const d = new Date(date);
            switch (unit) {
                case 'year':
                    d.setFullYear(d.getFullYear() + num);
                    break;
                case 'month':
                    d.setMonth(d.getMonth() + num);
                    break;
                case 'day':
                    d.setDate(d.getDate() + num);
                    break;
                case 'hour':
                    d.setHours(d.getHours() + num);
                    break;
                case 'minute':
                    d.setMinutes(d.getMinutes() + num);
                    break;
                case 'second':
                    d.setSeconds(d.getSeconds() + num);
                    break;
            }
            return d;
        } catch (e) {
            console.log(e);
            return new Date();
        }
    }
}
export class DateUtils {
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
     * 获取月份范围内的所有月份
     */
    static getMonthRange(startDate: Date | string, endDate: Date | string): Date[] {
        const months: Date[] = [];
        let current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
            months.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    }

    /**
     * 按周对日期进行分组
     */
    static groupByWeek(dates: (Date | string)[]): Date[][] {
        const sortedDates = dates
            .map(d => new Date(d))
            .sort((a, b) => a.getTime() - b.getTime());

        const weeks: Date[][] = [];
        let currentWeek: Date[] = [];

        for (const date of sortedDates) {
            if (currentWeek.length === 0) {
                currentWeek.push(date);
            } else {
                const firstDate = currentWeek[0];
                if (DateUtils.isSameWeek(firstDate, date)) {
                    currentWeek.push(date);
                } else {
                    weeks.push(currentWeek);
                    currentWeek = [date];
                }
            }
        }

        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    }

    /**
     * 判断两个日期是否在同一周
     */
    static isSameWeek(date1: Date | string, date2: Date | string): boolean {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const weekStart1 = DateUtils.startOfWeek(d1);
        const weekStart2 = DateUtils.startOfWeek(d2);
        return weekStart1.getTime() === weekStart2.getTime();
    }

    /**
     * 获取指定年月的所有日期
     */
    static getDatesInMonth(year: number, month: number): Date[] {
        const dates: Date[] = [];
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }

        return dates;
    }

    /**
     * 获取日期是当年的第几周
     */
    static getWeekOfYear(date: Date | string): number {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    /**
     * 获取两个日期之间的季度列表
     */
    static getQuarterRange(startDate: Date | string, endDate: Date | string): { year: number; quarter: number }[] {
        const quarters: { year: number; quarter: number }[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        let currentDate = new Date(start);
        while (currentDate <= end) {
            quarters.push({
                year: currentDate.getFullYear(),
                quarter: DateUtils.getQuarter(currentDate)
            });

            // 移动到下一个季度
            currentDate.setMonth(currentDate.getMonth() + 3);
        }

        return quarters;
    }

    /**
     * 获取指定日期的节假日信息（示例）
     */
    static getHoliday(date: Date | string): string | null {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();

        // 这里可以根据实际需求扩展更多节日
        const holidays: { [key: string]: string } = {
            '1-1': '元旦',
            '5-1': '劳动节',
            '10-1': '国庆节'
        };

        const key = `${month}-${day}`;
        return holidays[key] || null;
    }

    /**
     * 格式化时间段
     */
    static formatDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}天${hours % 24}小时`;
        if (hours > 0) return `${hours}小时${minutes % 60}分钟`;
        if (minutes > 0) return `${minutes}分钟${seconds % 60}秒`;
        return `${seconds}秒`;
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

    /**
     * 获取日期的开始时间（00:00:00）
     */
    static startOfDay(date: Date | string): Date {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    /**
     * 获取日期的结束时间（23:59:59）
     */
    static endOfDay(date: Date | string): Date {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    }

    /**
     * 获取月份的第一天
     */
    static startOfMonth(date: Date | string): Date {
        const d = new Date(date);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    /**
     * 获取月份的最后一天
     */
    static endOfMonth(date: Date | string): Date {
        const d = new Date(date);
        d.setMonth(d.getMonth() + 1, 0);
        d.setHours(23, 59, 59, 999);
        return d;
    }

    /**
     * 获取日期是第几季度
     */
    static getQuarter(date: Date | string): number {
        const d = new Date(date);
        return Math.floor(d.getMonth() / 3) + 1;
    }

    /**
     * 获取工作日信息（周末返回false）
     */
    static isWorkday(date: Date | string): boolean {
        const d = new Date(date);
        const day = d.getDay();
        return day !== 0 && day !== 6;
    }

    /**
     * 获取两个日期之间的工作日数量
     */
    static getWorkdayCount(startDate: Date | string, endDate: Date | string): number {
        const dates = DateUtils.getDateRange(startDate, endDate);
        return dates.filter(date => DateUtils.isWorkday(date)).length;
    }

    /**
     * 获取日期所在周的周一
     */
    static startOfWeek(date: Date | string): Date {
        const d = new Date(date);
        const day = d.getDay() || 7;
        d.setDate(d.getDate() - (day - 1));
        d.setHours(0, 0, 0, 0);
        return d;
    }

    /**
     * 获取日期所在周的周日
     */
    static endOfWeek(date: Date | string): Date {
        const d = new Date(date);
        const day = d.getDay() || 7;
        d.setDate(d.getDate() + (7 - day));
        d.setHours(23, 59, 59, 999);
        return d;
    }

    /**
     * 获取年龄
     */
    static getAge(birthDate: Date | string): number {
        const birth = new Date(birthDate);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
}
