import clint from "../../config/database.js";





export const createUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body
        
        if(!id || !name || !email || !password ) {
            res.status(404).json({
                message: `id, name, email, password requinid`
            })
        }

        
    }catch {
        console.log(err);
        
    }
}


export const findAllUser = async (req, res) => {
    try {

    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `error in the server`
        })
        
    }
}


export const findOneTask = async (req, res) => {
    try {

    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: `error in the server`
        });
        
    }
}