import type {MetaData} from "./MetaData.ts";
import type {ErrorInfo} from "./ErrorInfo.ts";

export interface ApiResponse<T> {
    status: boolean;
    data: T;
    metadata: MetaData;
    error: ErrorInfo[];
}