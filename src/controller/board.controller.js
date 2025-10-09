import clint from "../../config/database.js";


export const createBoard = async (req, res) => {
    try {
        const { id, title, columns } = req.body
        if(!id || !title || !columns ) {
            res.status(400).json({
                message: `id, title, columns requinid`
            })  
        }
        if(id & title & columns ) {
            const body = [id, title, columns]
            const query = `insert into board (id, title, columns) values ($1, $2, $3) returning *`
            const newQuery = await clint.query(query, body)
            console.log(newQuery.rows[0]);
            res.status(200).json({
                message: `create board`,
                newQuery: newQuery.rows[0]

            })

            

        }
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server`
        })
        
    }
}


export const findAllBoard = async (req, res) => {
    try {
        const query = `select * from board`
        const allQuery = await clint.query(query)
        res.status(201).json({
            message: `All board`,
            board: allQuery.rows
        })

    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server`
        })
        
    }
}


export const findOneBoard = async (req, res) => {
    try {
        const { id } = req.params
        const query = `select * from board where id= $1`
        const OneQuery = await clint.query(query, [id])

        if( OneQuery.rows.length === 0) {
            res.status(404).json({
                message: `not found id`
            })
        }

        res.status(200).json({
            message: `Board found`,
            query: OneQuery.rows[0]

        })

    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server`
        })
        
    }
}




export const updateBoard = async (req, res) => {
    try {
        const { id } = req.params
        const { title, columns } = req.body

        const query = await clint.query(`update board set title= $1, columns= $2 returning *0`, [title, columns])

        if(query.rows.length == 0) {
            res.status(404).json({
                message: `not found board `
            })
        }

        res.status(200).json({
            message: `update board `,
            query: query.rows[0]
            
        })
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server`
        })
        
    }
}



export const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params
        const query = `delete from board where id=$1`
        const deleted = await clint.query(query, [id])

        if(deleted.rows.length == 0) {
            res.status(404).json({
                message: `not found id`
            })

        }
        res.status(200).json({
            message: `delete board `
        })
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: `Error in the server`
        })
        
    }
}

