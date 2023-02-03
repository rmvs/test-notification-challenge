import { CategoryType } from "../models";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const API_ENDPOINTS = {
    HISTORY: `${BASE_URL}/history/`
};

export const CATEGORY_COLORS = {
    [CategoryType.FINANCE]: "volcano",
    [CategoryType.MOVIES]: "magenta",
    [CategoryType.SPORTS]: "cyan",
}