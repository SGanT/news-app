export class ApiObserver {
    public next;
    public error = (error: any) => console.warn('API error ', error);
    public complete = () => {};
    constructor(nextFn: any) {
        this.next = nextFn;
    }
}