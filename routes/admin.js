var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers');
// const verifyLogin=(req,res,next)=>{
//   console.log(req.session.adminLoggedIn);
//   if(req.session.admin && req.session.admin.loggedIn){
//     next();
//   }else{
//     res.redirect('/alogin');
// }
// };
 router.get('/', function(req, res, next) {
   productHelpers.getAllProducts().then((products)=>{
     console.log(products);
     res.render('admin/view-products' ,{admin:true ,products});
 })
 });
// from here i am trying


// router.get('/', function(req, res, next) {
//   productHelpers.getAllProducts().then((products)=>{
//     console.log(products);
//     res.render('admin/signup' ,{admin:true ,products});
// })
// });


// router.get('/alogin' ,(req,res)=>{
//   console.log(req.session.admin);
//   if(req.session.admin){
//     res.redirect('/admin')
//   }else{
//     res.render('admin/login',{"loginErr":req.session.adminLoginErr})
//     req.session.adminLoginErr=false;
//     }
// });
// router.get('/asignup' ,(req,res)=>{
//   res.render('admin/signup')
// })
// router.post('/asignup',(req,res)=>{
//   productHelpers.doSignup(req.body).then((response)=>{
//     console.log(response);
//     req.session.admin=response
//     req.session.admin.loggedIn=true
    
//     res.redirect('/admin')
//   })
// })
// router.post('/alogin',(req,res)=>{
//   productHelpers.doLogin(req.body).then((response)=>{
//     if(response.status){
      
//       req.session.admin=response.admin
//       req.session.admin.loggedIn=true
//       res.redirect('/admin')
//     }else{
//       req.session.adminLoginErr='Invalid username or password'
//       res.redirect('/alogin')
//     }
// })
// });
// router.get('/alogout',(req,res)=>{
//   req.session.admin=null
//   req.session.adminLoggedIn=false
//   res.redirect('/admin')
// });

router.get('/add-product' , function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>
  {console.log(req.body);
  console.log(req.files.Image);
  
  productHelpers.addProduct(req.body , (id)=>{ let image=req.files.Image
    console.log(id);
    image.mv("./public/product-images/"+id+'.jpg', (err,done)=>{
      if(!err){
        res.render("admin/add-product")

      }else{
        console.log(err);
      }
    })
    
  })
  


})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product' , {product})
});
//  router.post('/edit-product/:id',(req,res)=>{
//    console.log(req.params.id);
//    productHelpers.updateProduct(req.params.id ,req.body).then(()=>{
//      let id=req.params.id
//      res.redirect('/admin')
//      if(req.files.Image){
//        let image =req.files.Image
//        image.mv("./public/product-images/"+id+'.jpg')
//      }
//    })
//  }),
router.post('/edit-product/:id', (req, res) => {
  console.log(req.params.id);
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    let id = req.params.id;
    res.redirect('/admin');
    
    // Check if files exist and handle the image upload
    if (req.files && req.files.Image) {
      let image = req.files.Image;
      image.mv("./public/product-images/" + id + '.jpg', (err) => {
        if (err) {
          console.error(err);
          // Optionally handle the error
        }
      });
    }
  });
});




module.exports = router;
