// Get the DOM elements for the user list and cards container
let list = document.getElementById("user-list");

// Check if the "user-list" element exists in the DOM
if (!list) {
  console.error('Element with ID "user-list" not found in the DOM.');
  throw new Error('Required DOM element "user-list" is missing.');
}

// Fetch user data from the JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json()) // Parse the response as JSON
  .then((users) => {
    let index = 0;
    // Loop through each user and create a list item for them
    for (let user of users) {
      let li = document.createElement("li"); // Create a list item
      li.className = user.id; // Assign the user's ID as a class

      // Create and append a div for the user's name
      let name = document.createElement("div");
      name.className = "user-name";
      name.textContent = user.name;
      li.appendChild(name);

      // Create and append a div for the user's username
      let username = document.createElement("div");
      username.className = "user-username";
      username.textContent = user.username;
      li.appendChild(username);

      // Create and append a div for the user's email
      let email = document.createElement("div");
      email.className = "user-email";
      email.textContent = user.email;
      li.appendChild(email);

      // Add a transition delay for animation
      li.style.transitionDelay = `${index * 100}ms`;
      index++;

      // Append the list item to the user list
      list.appendChild(li);
    }

    // Reveal the list items with animation
    revealCards('#user-list li');

    // Add click event listeners to each user list item
    let usersLI = Array.from(document.querySelectorAll("#user-list li"));

    usersLI.forEach(e => {
      e.addEventListener("click", _ => {
        usersLI.forEach(e => {
          e.classList.remove("selected")
        })
    
        e.classList.add("selected")
        let cards = document.querySelector(".cards");
        cards.innerHTML = ""; // Clear the cards container

        // Fetch posts for the selected user
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.classList[0]}`)
          .then(res => res.json()) // Parse the response as JSON
          .then(posts => {
            // Loop through each post and create a card for it
            posts.forEach((post, index) => {
              cards.innerHTML += `<div class="card" style="transition-delay:${index * 50}ms;">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                </div>`;
            });

            
            // Reveal the cards with animation
            revealCards('.card');
          })
          .catch(error => {
            console.error('Failed to fetch posts:', error);
            cards.innerHTML = 'Error loading posts'; // Display error message
          });
      });
    });
  });

// Function to reveal elements with animation when they appear in the viewport
const revealCards = (claas) => {
  const cards = document.querySelectorAll(claas);

  // Create an IntersectionObserver to observe elements
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Add the "show" class when visible
        observer.unobserve(entry.target); // Stop observing the element
      }
    });
  }, { threshold: 0.1 });

  // Observe each card element
  cards.forEach(card => {
    observer.observe(card);
  });
};

// The following commented-out code snippets are unused or experimental code
// that fetches posts and displays them in different ways.
