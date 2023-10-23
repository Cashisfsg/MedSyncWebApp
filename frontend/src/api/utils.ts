import { API } from "./api";
import { TApi, TApiKeys, GetByFlattenKey } from "./types";

export const getApi = <T extends TApiKeys>(
    schema: T
): GetByFlattenKey<TApi, T> => {
    return schema.split(".").reduce((acc: any, key) => {
        if (typeof acc !== "object" || acc === null) {
            return undefined;
        }

        return acc[key];
    }, API);
};
