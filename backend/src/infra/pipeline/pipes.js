import PipeTemplate from './template.js';

export class PipeA extends PipeTemplate {

    constructor(pipeType) {
        super(pipeType);
    }

    process(unprocessed) {
        console.log('A');
        return unprocessed;
    }
};

export class PipeB extends PipeTemplate {

    constructor(pipeType) {
        super(pipeType);
    }

    process(unprocessed) {
        console.log('B');
        return unprocessed;
    }
};

export class PipeC extends PipeTemplate {

    constructor(pipeType) {
        super(pipeType);
    }

    process(unprocessed) {
        console.log('C');
        return unprocessed;
    }
};