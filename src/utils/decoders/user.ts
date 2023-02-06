import { JsonDecoder } from 'ts.data.json';
import { User } from '../../users/entities/user.entity';

export const UserDecoder: JsonDecoder.Decoder<User> = JsonDecoder.object<User>(
    {
        id: JsonDecoder.string,
        name: JsonDecoder.string,
        age: JsonDecoder.number,
        company: JsonDecoder.string,
        email: JsonDecoder.string,
        registered: JsonDecoder.string.chain<Date>(date => {
            return JsonDecoder.constant(new Date(date));
        })
    },
    'UserDecoder'
);
