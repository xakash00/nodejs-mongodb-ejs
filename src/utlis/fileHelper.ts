import fs from "fs-extra";
import { Blog } from "../models/blogModels";
import { config } from "../config/test-config";

const { DATA_FILE } = config

export const readBlogs = async (): Promise<Blog[]> => {
    try {
        const data = await fs.readJson(DATA_FILE)
        return data as Blog[]
    } catch (err) {
        return []
    }
}

export const writeBlog = async (data: Blog[]): Promise<void> => {
    await fs.writeJson(DATA_FILE, data, { spaces: 2 })
}

export const formatBytes = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
};

export const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${mins}m ${secs}s`;
};