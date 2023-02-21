import { JsonDecoder } from 'ts.data.json';
import { User } from '../../users/entities/user.entity';
import { Company } from '../models/Company';

export const UserDecoder: JsonDecoder.Decoder<User> = JsonDecoder.object<User>(
	{
		id: JsonDecoder.string,
		name: JsonDecoder.string,
		age: JsonDecoder.number,
		company: JsonDecoder.constant(Company.Amazon),
		email: JsonDecoder.string,
		registered: JsonDecoder.string.chain<Date>((date) => {
			return JsonDecoder.constant(new Date(date));
		})
	},
	'UserDecoder'
);
