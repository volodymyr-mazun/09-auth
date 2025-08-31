
// --------- ToastContainer---------
// обгортка для бібліотеки react-hot-toast, відображення всіх повідомлень-тостів

import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
    return <Toaster position="top-right" reverseOrder={false} />;
}