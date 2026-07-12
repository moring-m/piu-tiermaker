export interface Song {
    title: string;

    jacket: string;

    channel: number;

    limit: number;

    charts: {
        single: number[];

        double: number[];

        halfDouble: number[];

        coop: number[];
    };
}