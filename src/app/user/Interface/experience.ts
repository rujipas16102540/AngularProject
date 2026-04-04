export interface Experience {
    id: string;
    fromUntil: string;
    position: string;
}

export class ExperienceObj {
    static Experience(): Experience {
        return {
            id: '',
            fromUntil: '',
            position: ''
        }
    }
}



