export interface Skill {
    id: string
    name: string;
    level: number;
}

export class USkillObj {
    static Skill(): Skill {
        return {
            id: '',
            name: '',
            level: 0,
        }
    }
}