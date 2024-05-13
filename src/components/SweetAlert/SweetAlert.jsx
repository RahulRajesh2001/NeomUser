import React from 'react'
import Swal from 'sweetalert2'

const SweetAlert = (icon,title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon:{icon},
        title:{title}
      });
  return (
    <div></div>
  )
}

export default SweetAlert