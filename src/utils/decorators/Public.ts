import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export type IS_PUBLIC_KEY_TYPE = boolean;
export const Public = () =>
	SetMetadata<string, IS_PUBLIC_KEY_TYPE>(IS_PUBLIC_KEY, true);
