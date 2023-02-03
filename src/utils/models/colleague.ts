import { JsonDecoder } from 'ts.data.json';

export type Colleague = {
    id: string;
    name: string;
};

export const ColleagueDecoder: JsonDecoder.Decoder<Colleague> = JsonDecoder.object<Colleague>(
    {
        id: JsonDecoder.string,
        name: JsonDecoder.string
    },
    'ColleagueDecoder'
);
