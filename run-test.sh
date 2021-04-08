#!/bin/sh
docker run -v $(pwd)/test_images:/app/images \
    --device=/dev/video0:/dev/video0 \
    -e DISPLAY=$DISPLAY \
    -e QT_GRAPHICSSYSTEM="native" \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -it cc-final
