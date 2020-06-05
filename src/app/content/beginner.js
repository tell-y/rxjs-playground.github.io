export default [
  {
    title : 'Getting Started with Rx.js',
    editor : {
      html : '',
      js : `// A simple illustration to count to 3.
rxjs.interval(1000).take(3).subscribe(v => console.log(v))
    `
    }
  },
  {
    title : "rxjs.Observable",
    editor : {
      js : `// rxjs.Observable

const base = new rxjs.Observable(function(observer){
  observer.next(1);
  observer.next(2);
  observer.next(42);
  observer.complete();
})


base
    .subscribe(
       v => console.log(v),
      err => console.log(err),
      done => console.log("completed")
    )`
    }
  },
  {
    title : 'Handling a click event',
    editor : {
      html : `<button id="myButton">Click me</button>`,
      js : `const button = document.getElementById("myButton");

rxjs.fromEvent(button, "click")
.subscribe(x => console.log("click"))`
    }
  },{
    title : "Filtering Even numbers",
    editor : {
      html : "",
      js : `//Filter even numbers out from a list

const evenStream
   = rxjs.of(15,1,2,3,4).filter(num => num % 2 == 0);

evenStream.subscribe(x => console.log(x, " is even")); `
    }
  }, {
    title : "Partitioning Even and Odd",
    editor : {
      html : "",
      js : `//Separate a list of numbers into odd and even

const [evenStream, oddStream]
   = rxjs.of(15,1,2,3,4).partition(num => num % 2 == 0);

//subscribed first => gets values first
oddStream.subscribe(x => console.log(x," is odd"));
//gets values after the one above
evenStream.subscribe(x => console.log(x, " is even")); `
    }
  }, {
    title : "Implementing a carousel",
    editor : {
      html : `<style>
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
</div>



`,
      js : `const slider = document.getElementById("slider");
const slides = slider.querySelectorAll(".slide");

function showSlide(show){
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
}

let currentSlide = 0 ;
showSlide(currentSlide);

// Define variables to access DOM
const nextButton = document.getElementById("next"),
prevButton = document.getElementById("prev");

//Create event streams
const keyDown = rxjs.fromEvent(document,"keydown");
const nextButtonClick = rxjs.fromEvent(nextButton,"click")
const prevButtonClick = rxjs.fromEvent(prevButton,"click")
const slideClick = rxjs.fromEvent(slides, "click");
const init = rxjs.of("startup")



//Merge event streams which do the same thing
const nextObs = rxjs.operators.merge(nextButtonClick, slideClick);
const prevObs = rxjs.operators.merge(prevButtonClick, keyDown);


// Add subscriptions to the next and previous buttons
nextObs.subscribe(() => showSlide(currentSlide + 1))
prevObs.subscribe(() => showSlide(currentSlide - 1))


// Add relationships between next, prev and startup streams
rxjs.operators.merge(nextObs,prevObs,init)
.map(()=> {
  const autoplay =   rxjs.interval(2000)
  .takeUntil( rxjs.operators.merge(nextObs,prevObs));

  // log autoplay behaviour to demonstrate the timer changes
  autoplay.subscribe( v => console.log("autoplaying"),
                     () => console.log(err),
                     () => console.log("restart autoplay"))

  return autoplay;
})
.mergeAll()
.subscribe(()=> showSlide(currentSlide + 1));

`
    }
  }
]
