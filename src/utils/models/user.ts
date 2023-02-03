import { JsonDecoder } from 'ts.data.json';
import { Colleague, ColleagueDecoder } from './colleague';
import { Gender, GenderDecoder } from './gender';

export type User = {
    id: string;
    name: string;
    gender: Gender;
    age: number;
    company: string;
    email: string;
    phone: string;
    address: string;
    registered: Date;
    colleague: Colleague[];
};

export const UserDecoder: JsonDecoder.Decoder<User> = JsonDecoder.object<User>(
    {
        id: JsonDecoder.string,
        name: JsonDecoder.string,
        gender: GenderDecoder,
        age: JsonDecoder.number,
        company: JsonDecoder.string,
        email: JsonDecoder.string,
        phone: JsonDecoder.string,
        address: JsonDecoder.string,
        registered: JsonDecoder.string.chain<Date>(date => {
            return JsonDecoder.constant(new Date(date));
        }),
        colleague: JsonDecoder.array(ColleagueDecoder, 'UserColleagueDecoder')
    },
    'UserDecoder'
);
