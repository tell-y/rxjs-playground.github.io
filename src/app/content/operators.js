export default [
  {
    title: ".interval()",
    editor: {
      js: `// An operator than is similar to setInterval
// Pushes data to an operator every 1sec
rxjs.interval(1000).subscribe(val => console.log(val));`,
    },
  },
  {
    title: ".of()",
    editor: {
      js: `
// An operator which takes values synchronously and emits them
// in the same order

rxjs.of(1,2,3).subscribe(val => console.log(val))
`,
    },
  },
  {
    title: ".from()",
    editor: {
      js: `// An observable which is similar to .of
// However it takes an array or an array like object as an argument

rxjs.from([1,2,3,4]).subscribe(val => console.log(val));

rxjs.from({length : 5}).subscribe(val => console.log(val));

rxjs.from(new Set([1,2,3])).subscribe(val => console.log(val));`,
    },
  },
  {
    title: `.take()`,
    editor: {
      js: `// An observable which takes the first N values
const { from, interval, operators: { take } } = rxjs;
from([1,2,3,4,5])
  .pipe(take(3))
  .subscribe(val => console.log(val));

interval(1000)
  .pipe(take(5))
  .subscribe(val => console.log(val));
`,
    },
  },
  {
    title: `.first() .last()`,
    editor: {
      js: `const { from, interval, operators: { first, last } } = rxjs;
//Since first and last values are common practises
from([1, 2, 3, 4, 5])
  .pipe(first())
  .subscribe(val => console.log(val));

from([1, 2, 3, 4, 5])
  .pipe(last())
  .subscribe(val => console.log(val));


//First and last functions also take predicate functions
// Let's print the first odd number in this series
from([2, 8, 3, 4, 5])
  .pipe(first(x => x % 2 == 1))
  .subscribe(val => console.log(val));

// Let's print the last odd number in this series
from([2, 8, 3, 4, 5, 900])
  .pipe(last(x => x % 2 == 1))
  .subscribe(val => console.log(val));

interval(1000)
  .pipe(first())
  .subscribe(val => console.log(val));
// Last does not apply to interval() as it never complets

// interval(1000).pipe(take(5)).subscribe(val => console.log(val));
`,
    },
  },
  {
    title: ".filter()",
    editor: {
      js: `const { of, operators: { filter } } = rxjs;
// filter operators helps to filter a stream of values using a predicate function

// All numbers greater than 5
console.log("printing  numbers > 3");
of(1,2,3,4,5,6,7)
  .pipe(filter(x => x > 3))
  .subscribe(x => console.log(x));

// odd numbers
console.log("printing odd numbers")
of(1,2,3,4,5,6,7)
  .pipe(filter(x => x % 2 === 1))
  .subscribe(x => console.log(x));


// odd numbers greater than 3
console.log("printing odd numbers greater than 3")
of(1,2,3,4,5,6,7)
  .pipe(filter(x => x % 2 === 1))
  .pipe(filter(x => x > 3))
  .subscribe(x => console.log(x));
`,
    },
  },
  {
    title: `.partition()`,
    editor: {
      js: `// partition operators helps to filter a stream of values using a predicate function
// however instead of only creating one stream which has values which pass
// the predicate function, it also creates a stream of values which don't pass the
// condition

// All numbers greater than 5
const { of, operators: { partition } } = rxjs;
const [greaterThan3$, lessThan3$] = of(1,2,3,4,5,6,7)
  .pipe(partition(x => x > 3));

console.log("printing  numbers > 3");
greaterThan3$.subscribe(x => console.log(x));
console.log("printing  numbers <= 3");
lessThan3$.subscribe(x => console.log(x));
`,
    },
  },
  {
    title: ".from() for Promise",
    editor: {
      js: `//Allows conversion from Promise to Observable
const p = new Promise(resolve => {
  setTimeout(() => resolve("done"),1000)
});

rxjs.from(p).subscribe(val => console.log(val));
    `,
    },
  },
  {
    title: `.concat()`,
    editor: {
      js: `//Concat plays the source observable first
// after the source completes, it plays the next
// observable which is the argument
const { interval, operators: { take, concat } } = rxjs;
const o1$ = interval(300).pipe(take(3));
const o2$ = interval(1000).pipe(take(5));

o1$.pipe(concat(o2$)).subscribe(console.log);
`,
    },
  },
  {
    title: `.concatAll()`,
    editor: {
      js: `// Concat All concats all inner observables in order
const {
  interval,
  operators: {
    take,
    map,
    concatAll,
    startWith,
  },
} = rxjs;
interval(1000)
  .pipe(take(5))
  .pipe(
    map(n => interval(1000)
        .pipe(startWith("start"))
        .pipe(take(n + 1))
    )
  )
  .pipe(concatAll())
  .subscribe(x => console.log(x))
`,
    },
  },
  {
    title: `.zip()`,
    editor: {
      js: `// Zip computes values of observables in parallel
// and emits them together
const {
  range,
  fromEvent,
  interval,
  operators: {
    map,
    merge,
    zip,
  },
} = rxjs;
const range$ = range(17, 30);

const click$ = fromEvent(document,"click")
  .pipe(map(e => "click"));

const initiate$ = interval(1000)
  .pipe(map(() => "timer"))
  .pipe(merge(click$));

range$
  .pipe(
    zip(initiate$, (num, event) => num + " --- " + event)
  )
  .subscribe(
    console.log,
    console.log.bind(null, "error") ,
    console.log.bind(null, "complete")
  );
`,
    },
  },
];
