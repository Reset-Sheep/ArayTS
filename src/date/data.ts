class Time{
    private static getFormattedLocalDate(): string {
        const now = new Date();
        return now.toLocaleDateString();
    }
    static get(format?:string) {
        try{
            const localDate = Time.getFormattedLocalDate();
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
            const localDate = new Date(Time.getFormattedLocalDate());
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
            const localDate = new Date(Time.getFormattedLocalDate());
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
    static order(previousDate: string, laterDate: string): boolean {
        try {
            const start = new Date(previousDate);
            const end = new Date(laterDate);
            return start <= end;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
export {Time};
