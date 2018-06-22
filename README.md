# Friend Finder

Welcome to Friend Finder! By answering a few basic questions, our advanced algorithm will match you with a new friend based on similar qualities.

### How it works

When a user fills out the form, their answers will be saved in the database. The list can be viewed at /api/friends.

Each user's score is saved as an array of numbers. When a new user fills out the form, that person's score will be compared to every user's score in the database.

The way it works is the system takes the difference of each question and adds it up to come up with the "total difference". The person with the least difference becomes your match.

Once the best match is found, their name and profile photo will be displayed in a modal.