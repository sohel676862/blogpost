const date=require("date-and-time")
const userViewSchema=require("../../modles/viewModal");

module.exports.view_count=async(req,res)=>{
    const {usercookies}=req.cookies;
    
try {
    const time=date.format(new Date(),'YYYY/MM/DD').split("/"); 
let year=time[0];
let month=parseInt(time[1])

let checkYear=await userViewSchema.findOne({year});

if(checkYear){
    const uniceviewer=checkYear.uniceviewer;
    const checkCookie=uniceviewer.find(c=>c===usercookies);
    if(checkCookie && checkCookie !==undefined){
        let montharry=checkYear.montharray;
        console.log(montharry)
        let checkviewer=montharry[month-1].unicceViewer.find(c=>c===usercookies);
        console.log(checkviewer)
        if(!checkviewer){
            montharray[month-1].viewer=  montharray[month-1].viewer+1;
            montharray[month-1].unicceViewer=[...montharry[month-1].unicceViewer,usercookies];
            await userViewSchema.updateOne({
                year
            },
            {
                montharry
            })
            res.status(200).json({
                messess:"success"
            })
        }
    }
    else{
        let makecokies=Math.floor(Math.random() * 50000+234243)+Date.now().toString();
        let montharray=checkYear.montharray;
        montharray[month-1].viewer=  montharray[month-1].viewer|+1;
          montharray[month-1].unicceViewer=  [...montharray[month-1].unicceViewer,makecokies];
         let updatreviewer=await userViewSchema.updateOne(
            {year},
            {
                viewer:checkYear.viewer+1,
                montharray,
                $push:{
                    unicceViewer:makecokies
                }
            }
         )
         console.log(updatreviewer,makecokies)

    }
}
else{
    let makecokies=Math.floor(Math.random() * 50000+234243)+Date.now().toString();
    let montharray=[];
    for(let i=0;i<12;i++){
        montharray.push({
            month:i+1,
            viewer:0, 
            unicceViewer:[]
        })
    }
    montharray[month-1].month=month;
    montharray[month-1].viewer=1;
    montharray[month -1].unicceViewer=[makecokies];
    console.log(montharray)
    let postview= await userViewSchema.create({
        viewer:1,
        year,
        uniceviewer:[makecokies],
        montharray
    })
    let option ={
        expires:new Date(Date.now() + 60*60*1000)
    }
    res.cookie("usercookies", makecokies, option);
    res.status(200).json({
        success:"viewcountsuccess"
    })

}


} catch (error) {
    console.log(error)
}
   
}