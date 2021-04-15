# Cloud Computing Final Project

## Table of Contents

- [Overview](#overview)
- [Team Members](#team-members)
- [Dev Usage](#dev-usage)
- [Sources](#sources)

## Project Info

This contains the code for our Cloud Computing final project, Spring 2021.

This day and age, we are online more and more, and in many of those instances,
we are utilizing **video chat**. As the world moves more towards **increased
accessibility**, we are always finding more and more ways to ensure everyone can
use a service equally.

In most cases, you can easily tell who someone is by the name under their video.
However, consider a situation where **multiple people are on the same video**
within some video chat. It may not immediately be clear who matches the name
under the video, as well as who the remaining person / people are. Especially
for someone with a recognition disability like **prosopagnosia**, this can be a
difficult situation to overcome, which indicates a **gap in accessibility** for
video chats.

To solve this, this project aims to take the **Dev-Ops Engineer** and a bit of
the **AI Engineer** personas to create a proof-of-concept retail service that
allows for **live facial recognition**. By showing a user exactly who each face
is in real time, we can enable people with disabilities like prosopagnosia to
join the video chats of the expanding online world. By utilizing the power of
cloud and distributed computing via Azure, we can utilize online computing power
that may not be available on every retail computer, allowing for a more
streamlined user experience across a wider audience.

### Team Members

- Dustin Seger (segerde)
- Jake Steuver (steuvej)

### Agile Processes

To view our use of the [Agile](https://www.agilealliance.org/agile101/) mindset,
see the [separate documentation](docs/).

## Dev Usage

### Prerequisites

- [NodeJS](https://nodejs.org/en/)

### Installation

``` sh
git clone https://github.com/segeeslice/cc-final-project

cd cc-final-project/server
npm install

cd ../react-app
npm install
```

### Usage

To launch a **dev server** at `localhost:3002`:

``` sh
cd react-app
npm start
```

### Builds

To build:

``` sh
cd react-app
npm run build
```

To test the build at `localhost:3000`:

``` sh
cd server
npm start
```

### Deployment

Azure instance owner (Dustin) must deploy, but it is generally done as specified
in [this quickstart
guide](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux)
by interfacing via Visual Studio Code.

#### Azure Compability Notes

- `npm start` in `js-src` must correlate to running the app
    - Configured in `package.json` under the `scripts` key
    - Azure configured to run this command when running the server
- Invalid server hits must still reply (e.g. send `404` messages)
    - Used by Azure to make sure the server is running
    - i.e. without this, web app never properly deploys!!

## Sources

- Facial recognition logic retrieved from [this
  repository](https://github.com/justadudewhohacks/face-api.js/)
- Azure deployment and NodeJS environment quick-started via [this
  guide](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux)
- Pieces of the initial NodeJS scripts for server integrations with Azure (e.g.
  `/bin/www`) initially imported from output of [this generation
  utility](https://expressjs.com/en/starter/generator.html)

---

# Old Info

This part of the document contains our original implementation details,
utilizing a Python-based server instead within a Docker image. We were able to
get this working, but hosting it on the cloud with webcam access proved to be
difficult in different contexts, so we opted instead for HTML/JS which is hosted
locally.

As such, the remaining part of this README is deprecated, but left here for
posterity and historical purposes.

## Dev Usage

### Prerequisites

- `git`
- `python3`
- `docker`

### Installation

``` sh
git clone https://github.com/segeeslice/cc-final-project
git submodule init
git submodule update
```

### Usage

``` sh
# With cwd as the base directory:
docker build -t cc-final .
docker run -it cc-final
```

## Sources

- Facial recognition logic retrieved from [this
  repository](https://github.com/ageitgey/face_recognition)
