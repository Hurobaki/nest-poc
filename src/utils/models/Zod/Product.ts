import { string, boolean, z } from 'zod';

enum Category {
    Handbag = 'Handbag',
    Glasses = 'Glasses',
    Shirt = 'Shirt'
}

const categoryDecoder = z.union([z.literal(Category.Handbag), z.literal(Category.Glasses), z.literal(Category.Shirt)]);
