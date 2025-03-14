// 生成的类型定义文件
type Generated = {
    user: {
        id: number /* int */,
        name: string,
        email: string /* email */,
        age: number /* int */,
        isActive: boolean,
        roles: string[],
        profile: {
            avatar: string /* url */,
            joinDate: Date
        }
    }
};

interface IGenerated {
    user: {
        id: number /* int */,
        name: string,
        email: string /* email */,
        age: number /* int */,
        isActive: boolean,
        roles: string[],
        profile: {
            avatar: string /* url */,
            joinDate: Date
        }
    }
}
