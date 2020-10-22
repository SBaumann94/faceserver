const handleSignin = (database, bcrypt) => (req, res,) => {
    const { email, password } = req.body
    if(!email ||!password){
        return res.status(400).json("Incorrect form submission")
    }
    database.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (bcrypt.compareSync(password, data[0].hash)) {
                return database.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    }).catch(err => {
                        res.status(400).json('Unable to get user');
                    })
            }
            else {
                res.status(400).json('Invalid email or password');
            }
        })
        .catch(err => {
            res.status(400).json(err);
        })
}


module.exports = {handleSignin}