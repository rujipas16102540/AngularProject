export interface Interest {
    id: string;
    name: string;
}

export class InterestObj {
    static Interest(): Interest {
        return {
            id: '',
            name: ''
        }
    }
}