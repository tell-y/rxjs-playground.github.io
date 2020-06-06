export default [
  {
    title: "Naive 1-way data binding",
    editor: {
      html: `<input data-bind="myText" type="text" placeholder="Enter something here"/>
<p data-observe="myText"></p>

<input data-bind="anotherText" type="text" placeholder="Enter something here"/>
<p data-observe="anotherText"></p>
<p data-observe="anotherText"></p>`,
      js: `//Naive one way data binding
const { from, fromEvent, operators: { map, mergeAll } } = rxjs;
const inputs = document.querySelectorAll("[data-bind]");
const createObservable = (observes, value) =>
  from(observes)
    .pipe(
      map(e => ({
        element : e,
        value,
      }))
    );
const inputs$ = fromEvent(inputs, 'input')
  .pipe(
    map(({ target }) => {
      const observes = document.querySelectorAll("[data-observe='"+target.getAttribute("data-bind")+"']");
      return createObservable(observes, target.value);
    }),
    mergeAll()
  );
inputs$.subscribe(({ element, value }) => {
  element.innerHTML = value; 
});
`,
    },
  },
];
