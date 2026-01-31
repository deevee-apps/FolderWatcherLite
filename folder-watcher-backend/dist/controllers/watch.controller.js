"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.stop = exports.start = void 0;
const watcher_service_1 = require("../services/watcher.service");
const start = (req, res) => {
    const { path } = req.body;
    if (!path)
        return res.status(400).json({ error: 'path is required' });
    watcher_service_1.watcherService.start(path);
    res.status(200).json({ status: 'watching' });
};
exports.start = start;
const stop = (_req, res) => {
    watcher_service_1.watcherService.stop();
    res.status(200).json({ status: 'stopped' });
};
exports.stop = stop;
const events = (_req, res) => {
    res.json(watcher_service_1.watcherService.getEvents());
};
exports.events = events;
