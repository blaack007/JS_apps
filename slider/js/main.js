// grt slider items | Array.from [ES6 Feature]
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));


// get number of slides
var slidesCount = sliderImages.length;

// set current slide
var currentSlide = 5;

// slide number element
var slideNumberElement = document.getElementById('slider-number');

// previous and next buttons
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');

// handle click on previous and next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;


// create the main ul element
var paginationElement = document.createElement('ul');

// set id on created ul element
paginationElement.setAttribute('id', 'pagination-ul');

// create list items based on slides count
for(var i = 1; i <= slidesCount; i++)
{
    // create the li
    var paginationItem = document.createElement('li');

    // set custom attribute
    paginationItem.setAttribute('data-index', i);

    // set item content
    paginationItem.appendChild(document.createTextNode(i));

    // append items to the main ul list
    paginationElement.appendChild(paginationItem);
}

//add the created UL element to the page
document.getElementById('indicators').appendChild(paginationElement);

var paginationCreatedUl = document.getElementById('pagination-ul');

var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

paginationBullets.forEach(function(bullet)
{
    bullet.addEventListener('click', function()
    {
        currentSlide = parseInt(this.getAttribute('data-index'));
        thechecker();
    }) 
});


thechecker();

 function nextSlide()
    {
        if(currentSlide == slidesCount) return false;
        
        currentSlide++;
        thechecker();
    }


function prevSlide()
{
    if(currentSlide == 1) return false;

    currentSlide--;
    thechecker();
}


    //create the check function
    function thechecker()
    {
        // set the slide number
        slideNumberElement.textContent = 'Slide #' + (currentSlide) + ' of ' + (slidesCount);

        // remove all active classes from images and pagination bullets
        removeAllActive();

        // set active class on current slide
        sliderImages[currentSlide - 1].classList.add('active');

        // set active class on current pagination item
        paginationCreatedUl.children[currentSlide - 1].classList.add('active');

        switch (currentSlide) {
        case 1:
            // hide previous button
            prevButton.classList.add('disabled');
            break;
            case slidesCount:
            // hide next button
            nextButton.classList.add('disabled');
            break;
            default:
            // show previous and next buttons
            prevButton.classList.remove('disabled');
            nextButton.classList.remove('disabled');
        }
        //check if current slide is the first
        if(currentSlide == 1)
        {
            // add disabled class on previous button
            prevButton.classList.add('disabled');
        }
        else
        {
            // remove disabled class on previous button
            prevButton.classList.remove('disabled');
        }

    }

    // remove all active classes from images and pagination bullets
    function removeAllActive()
    {
        // loop through images
        sliderImages.forEach(function(img)
        {
            img.classList.remove('active');
        });

        //loop through pagination bullets
        paginationBullets.forEach(function(bullet)
        {
            bullet.classList.remove('active');
        });

        }
    