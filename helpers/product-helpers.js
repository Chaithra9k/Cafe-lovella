var db=require('../config/connection')
var collection=require('../config/collections')
var ObjectId=require('mongodb').ObjectId
const { response } = require('express')
module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
             callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })

    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:new ObjectId(prodId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id: new ObjectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:new ObjectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    },

    // updateProduct:(proId,proDetails)=>{
    //     return new Promise((resolve,reject)=>{
    //         db.get().collection(collection.PRODUCT_COLLECTION)
    //         .updateOne({_id: new ObjectId(proId)},{
    //             $set:{
    //                 Name:proDetails.Name,
    //                 Description:proDetails.Description,
    //                 Price:proDetails.Price,
    //                 Category:proDetails.Category
    //             }
    //         }).then((response)=>{
    //             resolve()
    //         })
    //     })
    // },


    // doLogin:(adminData)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let loginStatus=false
    //         let response={}
    //         let user =await db.get().collection(collection.ADMIN_COLLECTION).findOne({Email:adminData.Email})
    //         if(admin){
    //             bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
    //                 if(status){
    //                     console.log("login success");
    //                     response.admin=admin
    //                     response.status=true
    //                     resolve(response)
    //                 }else{
    //                     console.log('login failed');
    //                     resolve({status:false})
    //                 }

    //             })

    //         }else{
    //             console.log("login failed");
    //             resolve({status:false})
    //         }
    //     })
    // },
    // doSignup:(adminData)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         adminData.Password=await bcrypt.hash(adminData.Password,10)
    //         db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data)=>{
    //             resolve(data.insertedId)

    //         })
            
    //     })
    // },


}