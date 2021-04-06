# CC Final Project - Design and Requirements

## Functional Stories

- **F1**: As a user, I want to record a video with live-action facial
  recognition, so that I can promote a more accessible video environment
    - **F1.1**: As a user, I want to choose which webcam to use for recording
    - **F1.2**: As a user, I want the service to delete any data upon my closing
      of the service, so that my personal privacy is respected
    - **F1.3** *(stretch)*: As a user, I want to export my video feed to a
      `.mp4` file, so that I can export this service for use in other contexts.
    - **F1.4** *(stretch)*: As a user, I want to export my video feed as a webcam
      device, so that I can easily use this service in other contexts
- **F2**: As a user, I want to access this service from a publicly-accessible
  website
- **F3**: As a developer, I want to utilize [Docker](https://www.docker.com/),
  so that development and deployment is as seamless as possible
- **F4**: As a developer, I want to deploy the service to
  [Azure](https://azure.microsoft.com/en-us/), so that the service can be
  efficient
    - **F4.1**: As a developer, I want to utilize distributed computing, so that
      the service can be as efficient as possible 

## Non-Functional Stories

- **NF1**: As a user, I want the service to be efficient, so that I can use it
  seamlessly as I would a normal webcam
- **NF2**: As a user, I want the UI to be nice, so that I can easily access all
  of the service's features
  
---

## Basic Timeline

1. Make proof-of-concept webcam recording with facial recognition
    - Locally hosted
    - Utilizing docker
1. Decide which webpage framework to use
    - Likely will need to be [Django](https://www.djangoproject.com/) or
      [Flask](https://flask.palletsprojects.com/en/1.1.x/)
1. Create basic webpage and test basic webcam capture
1. Integrate webcam recording with pre-loaded faces
1. Add feature for user to upload their own faces prior to facial recognition
   processing

