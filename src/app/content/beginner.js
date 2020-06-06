export default [
  {
    title: "Getting Started with Rx.js",
    editor: {
      html: "",
      js: `// A simple illustration to count to 3.
const { interval, operators: { take } } = rxjs;
interval(1000).pipe(take(3)).subscribe(v => console.log(v));
    `,
    },
  },
  {
    title: "rxjs.Observable",
    editor: {
      js: `// rxjs.Observable
const { Observable } = rxjs;
const base$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(42);
  observer.complete();
})


base$
  .subscribe(
      v => console.log(v),
    err => console.log(err),
    done => console.log("completed")
  );`,
    },
  },
  {
    title: "Handling a click event",
    editor: {
      html: `<button id="myButton">Click me</button>`,
      js: `const button = document.getElementById("myButton");
const { fromEvent } = rxjs;

fromEvent(button, "click")
  .subscribe(x => console.log("click"));`,
    },
  },
  {
    title: "Filtering Even numbers",
    editor: {
      html: "",
      js: `//Filter even numbers out from a list
const { of, operators: { filter } } = rxjs;
const even$
    = of(15,1,2,3,4).pipe(filter(num => num % 2 == 0));

even$
  .subscribe(x => console.log(x, " is even")); `,
    },
  },
  {
    title: "Partitioning Even and Odd",
    editor: {
      html: "",
      js: `//Separate a list of numbers into odd and even
const { of, operators: { partition } } = rxjs;
const [even$, odd$] = of(15,1,2,3,4)
  .pipe(partition(num => num % 2 == 0));

//subscribed first => gets values first
odd$.subscribe(x => console.log(x," is odd"));
//gets values after the one above
even$.subscribe(x => console.log(x, " is even"));`,
    },
  },
  {
    title: "Implementing a carousel",
    editor: {
      html: `<style>
  #slider, .slides, .slide, .slide img{
    max-width : 100%;
  }
  .slide img{
    height : 280px;
    width : 100%;

  }
</style>

<div id="slider">
  <div class="slides">
    <div class="slide">
     <img
      src="http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_03_hd_picture_166205.jpg"/>
    </div>
    <div class="slide">
      <img
      src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTVTAUJDFwa6KVwUSx5aHJ4TtNhxRLtwwK_OYlCI2ZmUyJCeMzF"/>
    </div>
    <div class="slide">
      <img
      src="https://www.makemytrip.com/travel-guide/media/dg_image/goa/Nature-Walk.jpg"/>
    </div>
  </div>
  <div>
    <button id="next"> Next </button> <button id="prev"> Previous </button>
  </div>
</div>`,
      js: `const slider = document.getElementById("slider");
const slides = slider.querySelectorAll(".slide");

// Define variables to access DOM
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentSlide = 0;
const showSlide = (show) =>{
  if(show < 0 ){
    show = slides.length - 1;
  }
  if(show >= slides.length){
    show = 0;
  }
  currentSlide = show;
  slides.forEach((node, index) => {
    if(index !== show ) {
      node.setAttribute('style','display : none');
    }else{
      node.setAttribute('style','display : block');
    }
  });
};

showSlide(currentSlide);

//Create event streams
const {
  fromEvent,
  of,
  interval,
  operators: {
    map,
    merge,
    mergeAll,
    takeUntil,
  },
} = rxjs;
const keyDown$ = fromEvent(document,"keydown");
const nextButtonClick$ = fromEvent(nextButton,"click")
const prevButtonClick$ = fromEvent(prevButton,"click")
const slideClick$ = fromEvent(slides, "click");
const init$ = of("startup");

//Merge event streams which do the same thing
const nextObs$ = nextButtonClick$.pipe(merge(slideClick$));
const prevObs$ = prevButtonClick$.pipe(merge(keyDown$));

// Add subscriptions to the next and previous buttons
nextObs$.subscribe(() => showSlide(currentSlide + 1))
prevObs$.subscribe(() => showSlide(currentSlide - 1))

// Add relationships between next, prev and startup streams
nextObs$
  .pipe(
    merge(prevObs$, init$),
    map(()=> {
      const autoplay = interval(2000)
        .pipe(
          takeUntil(
            nextObs$.pipe(merge(prevObs$))
          )
        );
      // log autoplay behaviour to demonstrate the timer changes
      autoplay.subscribe(
        () => console.log("autoplaying"),
        () => console.log(err),
        () => console.log("restart autoplay")
      );

      return autoplay;
    }),
    mergeAll()
  )
  .subscribe(()=> showSlide(currentSlide + 1));
`,
    },
  },
];
