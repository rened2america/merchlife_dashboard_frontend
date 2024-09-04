import axios from '@/service/axiosInstance';
import { FaCoins } from "react-icons/fa6";


const BuyCredits = () => {
    const onClickCheckout = async () => {
        const getPayment = await axios.post("product/buyCredits",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },               
            }
        );
        // const getPaymentParse = await getPayment.json();
        console.log(getPayment)
        window.location.replace(getPayment.data.session.url);
    }

    return (
        <div className='flex flex-col items-center'>
            <h2>You have 0 available credits.</h2>
            <button
                className='w-full text-center my-4 p-2.5 text-sm font-medium text-black rounded-lg bg-green-600 hover:bg-green-700  focus:ring-4 focus:outline-none focus:ring-green-400'
                onClick={() => onClickCheckout()}>
                <span className="flex items-center justify-center ml-2">
                    Buy 30 credits
                    <FaCoins className="ml-1" />
                </span>
            </button>
        </div>
    )
}

export default BuyCredits;