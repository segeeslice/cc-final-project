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
