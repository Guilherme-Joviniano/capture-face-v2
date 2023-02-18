const express = require('express')
const app = express()

const { proxy } = require('rtsp-relay')(app);
 
// disponibiliza o video via ws requisiton
app.ws('/api/stream/:cameraIP', (ws, req) => {
    proxy({
        url: `rtsp://${req.params.cameraIP}:8080/h264_ulaw.sdp`,
        additionalFlags: ['-vf', 'scale=533:400']
    })(ws)
});

app.listen(2000);

