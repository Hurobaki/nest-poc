import { string, boolean, union, literal, object, number, array, optional, z } from 'zod';

enum Category {
    Handbag = 'Handbag',
    Glasses = 'Glasses',
    Shirt = 'Shirt'
}

const categoryDecoder = union([literal(Category.Handbag), literal(Category.Glasses), literal(Category.Shirt)]);

const productDecoder = object({
    id: number(),
    name: string(),
    price: number(),
    available: boolean(),
    categories: array(categoryDecoder),
    description: optional(string())
});

type Product = z.infer<typeof productDecoder>;

const crocroBag: Product = {
    id: 123456,
    name: 'Crocobag',
    price: 200_000.45,
    available: false,
    categories: [Category.Handbag],
    description: 'A beautiful bag'
};
