export default [
  {
    title: "Clicks and double clicks",
    editor: {
      html: ``,
      js: `const {
  fromEvent,
  operators: {
    bufferTime,
    filter,
    map,
  },
} = rxjs;
const click$ = fromEvent(document, "click");
click$.subscribe(() => console.log("click"));

click$
  .pipe(bufferTime(500))
  .pipe(map(arr => arr.length), filter(len => len === 2 ))
  .subscribe(x => console.log("double click"));
`,
    },
  },
  {
    title: "Basic promises",
    editor: {
      html: ``,
      js: `const p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve(42);
    },3000)
})

rxjs.from(p).subscribe(val => console.log(val));
`,
    },
  },
  {
    title: "ThrottleTime",
    editor: {
      html: ``,
      js: `//Throttling
// One click allowed per 2 seconds
const { fromEvent, operators: { throttleTime } } = rxjs;
fromEvent(document, "click")
  .pipe(throttleTime(2000))
  .subscribe(x => console.log("click"));
`,
    },
  },
  {
    title: "Merge",
    editor: {
      html: ``,
      js: `// Merge 2 observables
const { interval, operators: { merge } } = rxjs;
const interval1$ = interval(1000);
const interval2$ = interval(2000);

interval1$
  .pipe(merge(interval2$))
  .subscribe(console.log);
`,
    },
  },
  {
    title: "Subjects",
    editor: {
      js: `const store = new rxjs.Subject();

store.subscribe(v => console.log(v));

store.next(1);
store.next(2);
store.next(3);
`,
    },
  },
];
