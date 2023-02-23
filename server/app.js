const express = require('express')
const app = express()
const csv = require('csvtojson')
const { proxy } = require('rtsp-relay')(app);
const cors = require('cors')

app.use(cors())
// disponibiliza o video via ws requisiton
app.ws('/api/stream/:cameraIP', (ws, req) => {
    proxy({
        url: `rtsp://${req.params.cameraIP}:8080/h264_ulaw.sdp`,
        additionalFlags: ['-vf', 'scale=533:400']
    })(ws)
});

app.get('/ips', async (_req, res) => {
    const jsonArray = await csv().fromFile('../CAMS.csv');
    
    res.send(jsonArray)
})

app.listen(2000);

