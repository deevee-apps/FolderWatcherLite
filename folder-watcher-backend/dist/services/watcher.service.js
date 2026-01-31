"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watcherService = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
class WatcherService {
    constructor() {
        this.watcher = null;
        this.events = [];
    }
    start(path) {
        if (this.watcher)
            return;
        this.watcher = chokidar_1.default.watch(path, { persistent: true, ignoreInitial: true });
        this.watcher
            .on('add', p => this.push('added', p))
            .on('change', p => this.push('changed', p))
            .on('unlink', p => this.push('deleted', p));
    }
    stop() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }
    getEvents() {
        return this.events;
    }
    push(eventType, filename) {
        this.events.push({
            filename,
            eventType,
            timestamp: new Date().toISOString()
        });
    }
}
exports.watcherService = new WatcherService();
