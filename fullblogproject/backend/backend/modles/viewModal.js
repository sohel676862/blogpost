const {model,Schema}=require("mongoose")

let userViewSchema=new Schema({
    viewer:{
        type:Number,
        default:0
    },
    year:{
        type:Number,
        default:0
    },
    uniceviewer:{
        type:Array,
        default:[]
    },
    montharray:[
        {
            month:{
                type:Number,
                default:0,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:2,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:3,
    
            },
            viewer:{
                type:Number,
                default:2
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:4,
    
            },
            viewer:{
                type:Number,
                default:2
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:5,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:6,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:7,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:8,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:9,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:10,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:11,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          {
            month:{
                type:Number,
                default:12,
    
            },
            viewer:{
                type:Number,
                default:0
            },
            unicceViewer:[]
          },
          
    ]
     
    
},{timestamps:true});
module.exports=model("viewerModule",userViewSchema)
