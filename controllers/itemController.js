const axios = require('axios')

const getItemController= async (req, res) => {
    try {

        axios.get("https://dummyjson.com/products?limit=10")
        .then((resp)=>{return res.status(200).json(resp.data.products)})
        .catch((err)=>{console.log(err);res.status(500).json({ error: "items not found" })})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "items not found" })
      
    }


}

module.exports={getItemController}