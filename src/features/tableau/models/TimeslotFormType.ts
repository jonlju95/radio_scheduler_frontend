export type TimeslotFormType = {
    startTime: string;
    endTime: string;
    radioHostId: string;
    radioShowId: string;
    studioId: string;
    guests: {
        radioHostId: string;
    }[];
}
