import toast from "react-hot-toast";

export const customToast = (msg: string, icon: any) => {
    return () => toast(msg, {
        position: 'top-right',
        icon,
        className: 'bg-greem-300',
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
}