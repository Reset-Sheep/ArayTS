import { describe, test, expect } from '@jest/globals';
import DateUtils from '../date/date';

describe('DateUtils Tests', () => {
    describe('format', () => {
        test('should format date correctly', () => {
            const date = new Date('2023-12-25 13:14:15');
            expect(DateUtils.format(date)).toBe('2023/12/25');
            expect(DateUtils.format(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-12-25 13:14:15');
        });

        test('should handle invalid date', () => {
            expect(DateUtils.format('invalid date')).toBe('');
        });
    });

    describe('parse', () => {
        test('should parse date string correctly', () => {
            const date = DateUtils.parse('2023/12/25');
            expect(date.getFullYear()).toBe(2023);
            expect(date.getMonth()).toBe(11); // 月份从0开始
            expect(date.getDate()).toBe(25);
        });

        test('should parse date with custom format', () => {
            const date = DateUtils.parse('2023-12-25 13:14:15', 'YYYY-MM-DD HH:mm:ss');
            expect(date.getHours()).toBe(13);
            expect(date.getMinutes()).toBe(14);
            expect(date.getSeconds()).toBe(15);
        });
    });

    describe('compare', () => {
        test('should compare dates correctly', () => {
            expect(DateUtils.compare('2023/12/25', '2023/12/26')).toBeLessThan(0);
            expect(DateUtils.compare('2023/12/25', '2023/12/25')).toBe(0);
            expect(DateUtils.compare('2023/12/26', '2023/12/25')).toBeGreaterThan(0);
        });
    });

    describe('add', () => {
        test('should add time correctly', () => {
            const date = new Date('2023-12-25');
            expect(DateUtils.format(DateUtils.add(date, 1, 'day'))).toBe('2023/12/26');
            expect(DateUtils.format(DateUtils.add(date, 1, 'month'))).toBe('2024/01/25');
            expect(DateUtils.format(DateUtils.add(date, 1, 'year'))).toBe('2024/12/25');
        });
    });

    describe('diff', () => {
        test('should calculate difference correctly', () => {
            expect(DateUtils.diff('2023/01/01', '2024/01/01', 'year')).toBe(1);
            expect(DateUtils.diff('2023/01/01', '2023/02/01', 'month')).toBe(1);
            expect(DateUtils.diff('2023/01/01', '2023/01/02', 'day')).toBe(1);
        });
    });

    describe('isValid', () => {
        test('should validate dates correctly', () => {
            expect(DateUtils.isValid('2023/12/25')).toBe(true);
            expect(DateUtils.isValid('invalid')).toBe(false);
            expect(DateUtils.isValid(null)).toBe(false);
        });
    });

    describe('isLeapYear', () => {
        test('should identify leap years correctly', () => {
            expect(DateUtils.isLeapYear(2020)).toBe(true);
            expect(DateUtils.isLeapYear(2021)).toBe(false);
            expect(DateUtils.isLeapYear(2000)).toBe(true);
            expect(DateUtils.isLeapYear(1900)).toBe(false);
        });
    });

    describe('getDaysInMonth', () => {
        test('should return correct days in month', () => {
            expect(DateUtils.getDaysInMonth(2023, 1)).toBe(28); // 二月
            expect(DateUtils.getDaysInMonth(2020, 1)).toBe(29); // 闰年二月
            expect(DateUtils.getDaysInMonth(2023, 0)).toBe(31); // 一月
            expect(DateUtils.getDaysInMonth(2023, 3)).toBe(30); // 四月
        });
    });

    describe('getDateRange', () => {
        test('should return correct date range', () => {
            const range = DateUtils.getDateRange('2023/12/25', '2023/12/27');
            expect(range.length).toBe(3);
            expect(DateUtils.format(range[0])).toBe('2023/12/25');
            expect(DateUtils.format(range[1])).toBe('2023/12/26');
            expect(DateUtils.format(range[2])).toBe('2023/12/27');
        });
    });

    describe('getRelativeTime', () => {
        test('should return relative time description', () => {
            const now = new Date();
            const oneMinuteAgo = DateUtils.add(now, -1, 'minute');
            const oneHourAgo = DateUtils.add(now, -1, 'hour');
            const oneDayAgo = DateUtils.add(now, -1, 'day');

            expect(DateUtils.getRelativeTime(now)).toBe('刚刚');
            expect(DateUtils.getRelativeTime(oneMinuteAgo)).toMatch(/分钟前/);
            expect(DateUtils.getRelativeTime(oneHourAgo)).toMatch(/小时前/);
            expect(DateUtils.getRelativeTime(oneDayAgo)).toMatch(/天前/);
        });
    });
});