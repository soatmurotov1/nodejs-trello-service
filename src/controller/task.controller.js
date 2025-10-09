import clint from "../config/database.js";


export const createTask = async (req, res) => {
    try {
        
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server `
        })
    }
}

export const findAllTask = async (req, res) => {
    try {
        const { id } = req.params
    }catch(err) {

    }
}