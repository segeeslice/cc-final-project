# CC Final Project - Agile Retrospective

We were successfully able to create a React web app that utilizes live facial recognition. In this 
project, we gave the user the ability to take a snapshot with their webcam and add that to the
reference images used for facial recognition. We also used Material UI which allowed us to create a
clean and intuitive interface.

At first, we tried to have the service set up using a Python facial recognition library. However, this
would require us to set up web sockets between the client and server. We realized that the video
element would lag due to the nature of streaming through web sockets. So, instead, we used a JavaScript
library so that the processing would occur client-side, which yields a much better user experience. We
also tried using a server to store images, but that was difficult to implement alongside the JavaScript
library while also being impractical for our purposes.

In the future, we would like to be able to have a better method for storing images than in-browser
storage. In the longterm, the primary goal would be to have this service integrated with a video
chat service for better accessibility.