// Euvin Keel
// 11/19/2021

const groupLabel = 'GROUP LABEL';
const timerLabel = 'TIMER LABEL';

// Gets all buttons from index.html and adds event listeners to them
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
    })
} else {
    init();
}

class ReallySpecialError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ReallySpecialError';
    }
}

function startErrorHandler() {
    window.onerror = function(msg, source, lineNum, colNum, err) {
        console.log(`AUTO LOGGER: An error was caught with msg ${msg}`);
    }
}

function init() {
    startErrorHandler();
    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let output = document.querySelector('output');
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;
        output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
    });

    let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

    // Start your code here
    // You may move this JS to another file if you wish
    // yes i think i will
    try {
        let input = document.querySelector('inputz');
        input.innerHTML = "this shouldn't happen";
    } catch(err) {
        console.log('Caught an error!');
        console.log(err);
    } finally {
        console.log('Onto the button event stuff');
    }

    // this calculator really hates the number 7
    // so it'll throw a special error if the calculator
    // returns a 7 from any operation
    // listens to whenever output is changed
    let output = document.querySelector('output');
    let outputObserver = new MutationObserver(() => {
        console.log("output changed");
        if (output.innerHTML == 7) {
            throw new ReallySpecialError('7 is a bad number');
        }
    });
    outputObserver.observe(output, {characterData: true, subtree: true, childList: true});

    errorBtns.forEach(btn => {
        switch (btn.innerHTML) {
            case 'Console Log':
                btn.addEventListener('click', () => {
                    console.log('Console Log pressed');
                });
                break;
            case 'Console Error':
                btn.addEventListener('click', () => {
                    console.error('Console Error pressed');
                });
                break;
            case 'Console Count':
                btn.addEventListener('click', () => {
                    console.count('Console Count');
                });
                break;
            case 'Console Warn':
                btn.addEventListener('click', () => {
                    console.warn('Console Warn pressed');
                });
                break;
            case 'Console Assert':
                btn.addEventListener('click', () => {
                    console.assert(true, 'Console Assert pressed');
                });
                break;
            case 'Console Clear':
                btn.addEventListener('click', () => {
                    console.clear();
                });
                break;
            case 'Console Dir':
                btn.addEventListener('click', () => {
                    console.log('Console Dir pressed: Form JSON is...');
                    console.dir(form);
                });
                break;
            case 'Console dirxml':
                btn.addEventListener('click', () => {
                    console.log('Console Dir pressed: Form XML is...');
                    console.dirxml(form);
                });
                break;
            case 'Console Group Start':
                btn.addEventListener('click', () => {
                    console.group(groupLabel);
                });
                break;
            case 'Console Group End':
                btn.addEventListener('click', () => {
                    console.groupEnd(groupLabel);
                });
                break;
            case 'Console Table':
                btn.addEventListener('click', () => {
                    let myArray = [1,2,3,4,5];
                    console.table(myArray);
                });
                break;
            case 'Start Timer':
                btn.addEventListener('click', () => {
                    console.time(timerLabel);
                });
                break;
            case 'End Timer':
                btn.addEventListener('click', () => {
                    console.timeEnd(timerLabel);
                });
                break;
            case 'Console Trace':
                btn.addEventListener('click', () => {
                    console.trace();
                });
                break;
            case 'Trigger a Global Error':
                btn.addEventListener('click', () => {
                    throw new Error("A global error was triggered");
                });
                break;
            default:
                console.error('some unrecognized button was clicked');
                break;
            }
        }
    );
}