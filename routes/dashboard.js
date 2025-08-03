var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {

  const dashboardData = {
        listed_assets:13.2, 
        registerd_assets:730,
        trending_assets:[
          {id:18, asset_name:"Gold Pegged Coin", token_icon:"fsakdfsad-asad.png"},
          {id:19, asset_name:"PEPE Token", token_icon:"fsakdfsad-asad.png"},
          {id:20, asset_name:"Silver Pegged Coin", token_icon:"fweiruewr-asad.png"},
        ],
        user:{
          name:"user.name",
          username:"user.username",
          wallet:"user.wallet",
          joining_date:"userDetail.created_on"
        },
        promoted_assets:[
          {id:18, asset_name:"Gold Pegged Coin", token_icon:"fsakdfsad-asad.png"},
          {id:19, asset_name:"PEPE Token", token_icon:"fsakdfsad-asad.png"},
          {id:20, asset_name:"Silver Pegged Coin", token_icon:"fweiruewr-asad.png"},
        ],
    }
  res.json(dashboardData);
});




module.exports = router;