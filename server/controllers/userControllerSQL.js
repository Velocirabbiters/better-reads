const dbActions = require('../sql/dbActions');

const userControllerSQL = {};

userControllerSQL.createUser = async (req, res, next) => {
    console.log('entered createUser controller');
    // console.log(req.body)
    const { username, password } = req.body;
    console.log({ username, password })
    try {
        const result = await dbActions.createUser({username, password});
        res.locals.newUser = result;
        console.log(res.locals.newUser);
        return next();
    }
    catch(err){
        const error = 'error found at userControllerSQL createUser middleware'
        console.log('err: ', error);
        return next(err);
    }
}

userControllerSQL.userAuth = async (req, res, next) => {
    console.log('undergoing user authentication');
    const { username, password } = req.body;
    try {
        const result = await dbActions.verifyUser({username, password});
        if (!result){ // username not found or password invalid
            const err = ({
                log: 'Username/password not found',
                status: 404,
                message: { err: 'Username/password not found' },
            });
            return next(err);
        }
        res.locals.userID = result;
        console.log(res.locals.userID);
        return next();
    }
    catch(err){
        const error = 'error found at userControllerSQL createUser middleware'
        console.log('err: ', error);
        return next(err);
    }
}

module.exports = userControllerSQL;