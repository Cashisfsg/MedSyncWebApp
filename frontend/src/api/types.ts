import { API } from "../api";

export interface Doctor {
    doctor_id: number;
    full_name: string;
    specialty_name: string;
    address: string;
    price: number;
    avg_rating: number;
    reviews: number;
    photo_url: string;
}

type StrObj = Record<string, unknown>;

export type FlattenObjectKeys<T extends StrObj, K = keyof T> = K extends string
    ? T[K] extends StrObj
        ? `${K}.${FlattenObjectKeys<T[K]>}`
        : `${K}`
    : never;

export type TApi = typeof API;
export type TApiKeys = FlattenObjectKeys<TApi>;

export type GetByFlattenKey<
    T extends StrObj,
    K extends string
> = K extends `${infer K1}.${infer K2}`
    ? T[K1] extends StrObj
        ? GetByFlattenKey<T[K1], K2>
        : never
    : K extends keyof T
    ? T[K]
    : never;
