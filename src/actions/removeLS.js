export function removeLS(e) {
   let itemsLS = JSON.parse(window.localStorage.getItem("user"))
   let itemfilters = itemsLS?.filter(nft => nft._id !== e._id )
   if(itemfilters){
      window.localStorage.setItem("user",JSON.stringify(itemfilters));
   }
    return {
       type: "CONECT_LS",
    };
 }
 
 