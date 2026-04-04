export interface Education {
    id: string;
    year: string;
    universityName: string;
}

export class EducationObj {
    static Education(): Education {
        return {
            id: '',
            year: '',
            universityName: ''
        }
    }
}