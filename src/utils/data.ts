import { JsonDecoder } from 'ts.data.json';
import dataJson from './data.json';
import { UserDecoder } from './decoders/user';
import { UserAuth } from '../modules/auth/entities/userAuth.entity';

const dataResult = JsonDecoder.array(UserDecoder, 'UserDecoderArray').decode(
	dataJson
);

export const users = dataResult.isOk() ? dataResult.value : [];

export const registeredUsers: UserAuth[] = [
	{
		userId: '63dd1ca94902653ce9344fdc',
		email: 'lowerymclean@confrenzy.com',
		password: 'password'
	},
	{
		userId: '63dd1ca9dceaf5ca2c30a19c',
		email: 'blevinssawyer@ezent.com',
		password: 'password'
	},
	{
		userId: '63dd1ca9bc9ef5da14592799',
		email: 'howardstephens@koffee.com',
		password: 'password'
	},
	{
		userId: '63dd1ca9ae64ffb728cd41c1',
		email: 'jodisantos@portaline.com',
		password: 'password'
	},
	{
		userId: '63dd1ca97dfa16b2703e8a5a',
		email: 'ricemurphy@suretech.com',
		password: 'password'
	}
];
