export function removeLS(e) {
   let itemsLS = JSON.parse(window.localStorage.getItem("user"))
   let itemfilters = itemsLS?.filter(nft => nft != e )
   if(itemfilters){
      window.localStorage.setItem("user",JSON.stringify(itemfilters));
   }
    return {
       type: "CONECT_LS",
    };
 }
 
 