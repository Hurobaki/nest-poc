import { decodeType, record, number, string, boolean, array, optional, union, decode } from 'typescript-json-decoder';

enum Category {
    Handbag = 'Handbag',
    Glasses = 'Glasses',
    Shirt = 'Shirt'
}

const categoryDecoder = union(decode(Category.Handbag), decode(Category.Glasses), decode(Category.Shirt));

const productDecoder = record({
    id: number,
    name: string,
    price: number,
    available: boolean,
    categories: array(categoryDecoder),
    description: optional(string)
});

type Product = decodeType<typeof productDecoder>;

const crocroBag: Product = {};

const turtleGlasses: Product = {
    id: 123456,
    name: 'Turtle glasses',
    price: 564.99,
    available: false,
    categories: [Category.Glasses],
    description: 'Very beautiful glasses'
};
