// mousePositionTracker.ts

interface MousePosition {
    x: number;
    y: number;
}

class MousePositionTracker {
    private position: MousePosition = { x: 0, y: 0 };

    constructor() {
        this.trackMousePosition();
    }

    getScroll(): MousePosition {
        return {
            x: window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode as HTMLElement || document.body).scrollLeft,
            y: window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode as HTMLElement || document.body).scrollTop,
        };
    }
    getMouse(): MousePosition {
        return this.position;
    }

    private trackMousePosition(): void {
        document.addEventListener('mousemove', (event: MouseEvent) => {
            this.position = {
                x: event.clientX,
                y: event.clientY,
            };
        });
    }
}

const Doc = new MousePositionTracker();
export default Doc;
