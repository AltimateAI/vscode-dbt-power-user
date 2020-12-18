class DbtClientJobQueue {
    private promise = new Promise(() => {});

    addJob(fn: (value: unknown) => unknown) {
        this.promise = this.promise.then(fn, fn);
    }
}