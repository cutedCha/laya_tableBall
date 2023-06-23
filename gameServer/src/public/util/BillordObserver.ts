export default class EventEmitterBase {
    events: { [key: string]: Function[] } = {}
    constructor() {
        this.events = {};
    }
    on(event: string, listener: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    once(event: string, listener: Function) {
        const onceFun = ()=>{
            listener()
            this.off(event,onceFun)
        }
        this.on(event,onceFun)
    }
    off(event: string, listener: Function) {
        if (this.events[event]) {
            const index = this.events[event].indexOf(listener);
            if (index !== -1) {
                this.events[event].splice(index, 1);
            }
        }
    }
    offAll() {
        this.events = {}
    }
    emit(event: string|number, ...args: any) {
        if (this.events[event]) {
            this.events[event].forEach(listener => {
                listener(...args);
            });
        }
    }
}