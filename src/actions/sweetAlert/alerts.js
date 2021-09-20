import swal from 'sweetalert'

export function alertOk (){
    swal({
        title: '¡God Job!',
        text: '¡ Your NFT was successfully added shopping cart !',
        icon: 'success',
        button: 'OK!',
        timer: 1500,
      })
}

export function alertError(){
    swal({
        title: '¡ Sorry =( !',
        text: '¡ This NFT already exists in your shopping cart !',
        icon: 'warning',
        button: 'OK!',
        timer: 1500,
      })
}
export function alertDeleted(){
    swal({
        title: ' Deleted!',
        text: ' This NFT has been deleted !',
        icon: 'warning',
        button: 'OK!',
        timer: 1500,
      })
}

