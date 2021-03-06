import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

/**
 * Boolean whether the website is running on a localhost
 */

export const isLocal: boolean = typeof window === "object" && window.location.hostname === "localhost";

const storageApiUrl: string | false | null = typeof window === "object" && localStorage.getItem("apiUrl");

/**
 * Boolean whether ms auth logs are enabled or not
 */

export const authLogsEnabled: boolean = false;

/**
 * Api url
 */

export const apiUrl = storageApiUrl ? storageApiUrl : process.env.NEXT_PUBLIC_API_URL;

const storageEnableLogs: string | false | null = typeof window === "object" && localStorage.getItem("logs");

/**
 * Boolean whether only local logs are enabled
 */

export const onlyLocalLogs: boolean = !(typeof storageEnableLogs === "string" && storageEnableLogs === "true");

/**
 * Debounce delay for search requests
 */

export const searchDebounceDelay: number = 300;
