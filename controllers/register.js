const handleRegister = (database, bcrypt) => (req, res,) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect form submission", name, "test123", email, password)
    }
    const hash = bcrypt.hashSync(password)
    database.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json({ err: err, test: "test123" }))
}
module.exports = { handleRegister }
