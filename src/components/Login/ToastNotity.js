import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const ToastDefault = (message) => {
    return (
        toast(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    )
}


export const ToastError = (message) => {
    return (
        toast.error(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    )
}

export const ToastSuccess = (message) => {
    return (
        toast.success(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    )
}

export const ToastWarning = (message) => {
    return (
        toast.warn(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    )
}