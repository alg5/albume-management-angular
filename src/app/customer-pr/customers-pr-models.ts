export class PackageModel
{
    id: number;
    name: string;
    amount: number;
    used: number;
}
export class AbonementModel
{
    id: number;
    name: string;
    packages: Array<PackageModel>;
}
export class CustomerPrModel
{
    id: string;
    username: string;
    abonements: Array<AbonementModel>;
}
export class CustomerPrAPI
{
    GetUserById: CustomerPrModel;
    ErrorCode: number;
}
export class CustomerPrStorage
{
    user: CustomerPrModel;
    timestamp: Date;
}

// var objects = new { GetUserById = user, ErrorCode = errorCode };
export const HOURS_EXPIRE = 48;  //2
export const LOCAL_STORAGE_CUSTOMER_PR_KEY: string = "customerpr";
