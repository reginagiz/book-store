
export type CartItem = {
    product: Product;
    quantity: number;
    id: number;
};
export type Product = {
    title: string;
    price: number;
    id: string;
    quantity: number;
    author: Author;
    avatar: Avatar
};
export type Author = {
    name: string;
};
export type Avatar = {
    url: string;
};
export type User = {
    name: string;
    email: string;
    id: string;
};
