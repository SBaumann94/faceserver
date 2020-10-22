const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: process.env.API_CLARIFAI })

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.status(400).json('Unable to work with API')
        })
}

const handleImageCount = (req, res, database) => {
    const { id } = req.body;
    return database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = { handleImageCount, handleApiCall }
