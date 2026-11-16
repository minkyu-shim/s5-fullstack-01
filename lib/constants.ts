// Shared with Client Components, so this file must not import the data

// French scale, easiest first
export const GRADES = ["4a", "4b", "4c", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a"];

export const ROUTE_COLORS = ["black", "blue", "green", "orange", "pink", "purple", "red", "white", "yellow"];

export const ASCENT_STYLES = ["FLASH", "REDPOINT", "ATTEMPT"] as const;
export type AscentStyle = (typeof ASCENT_STYLES)[number];
