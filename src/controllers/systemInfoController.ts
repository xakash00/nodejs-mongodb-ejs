import { Request, Response } from 'express';
import os from 'os';
import { formatBytes, formatUptime } from '../utlis/fileHelper';



export const getSystemInfo = (req: Request, res: Response) => {
    const systemInfo = {
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: formatUptime(os.uptime()),
        memory: {
            total: formatBytes(os.totalmem()),
            free: formatBytes(os.freemem()),
            used: formatBytes(os.totalmem() - os.freemem()),
            usage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2) + '%'
        },
        cpu: {
            cores: os.cpus().length,
            model: os.cpus()[0].model,
            speed: `${(os.cpus()[0].speed / 1000).toFixed(2)} GHz`,
            loadavg: os.loadavg().map(load => load.toFixed(2))
        },
        network: Object.values(os.networkInterfaces())
            .flat()
            .filter(intf => intf && !intf.internal && intf.family === 'IPv4')
            .map(intf => ({
                name: intf!.address,
                address: intf!.address,
                mac: intf!.mac
            }))
    };

    res.render('system-info', {
        title: 'System Information',
        systemInfo,
        currentTime: new Date().toLocaleString()
    });
};