const handleHighscoreGet = (database) => (req, res,) => {
    const { given } = "false";
    return database.select('*').from('users').where({ given })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('No such user');
            }
        })
        .catch(err => {
            res.status(400).json('Error getting highscore');
        })
}
module.exports = { handleHighscoreGet, handleHighscoreUpdate }
