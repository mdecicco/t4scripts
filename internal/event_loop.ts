export function runEventLoop() {
    console.log('Event loop starting...');
    while (true) {
        try {
            if (!event_poll()) break;
        } catch (err) {
            console.log('Uncaught exception');
            console.error(err);
        }
    }
}