export interface hospitalPostPayload {
    name: string;
    branch: number;
    address: {
        street: string;
        city: string;
        region: string;
        country: string;
        postalCode: string;
    };
}