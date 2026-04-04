export interface Guild {
    id: string;
    name: string;
}

export class GuildObj {
    static Guild(): Guild {
        return {
            id: '',
            name: ''
        }
    }
}