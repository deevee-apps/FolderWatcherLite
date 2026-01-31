"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const watch_controller_1 = require("../controllers/watch.controller");
exports.router = (0, express_1.Router)();
exports.router.post('/start', watch_controller_1.start);
exports.router.post('/stop', watch_controller_1.stop);
exports.router.get('/events', watch_controller_1.events);
