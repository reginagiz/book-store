
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
    avatar?: Avatar
};
export type Author = {
    name: string;
};
export type Avatar = {
    url: string;
};
export type Customer = {
    name: string;
    email: string;
    id: string;
};
export type Address = {
    id: string;
    country: string;
    city: string;
    street: string;
    index: string;
    build: string;
};
export type Order = {
    id: string;
    address: Address;
    customer: Customer;
    createdAt: string;
    totalprice: number;
    cart: [CartItem];
};