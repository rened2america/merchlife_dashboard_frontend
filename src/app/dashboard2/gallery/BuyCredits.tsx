import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from '@/service/axiosInstance';
import { useState } from 'react';
import { FaCoins } from "react-icons/fa6";


const BuyCredits = () => {
    const [quantity, setQuantity] = useState(1);
    const onClickCheckout = async () => {
        const getPayment = await axios.post("product/buyCredits", { quantity: quantity });
        // const getPaymentParse = await getPayment.json();
        console.log("getPayment: ", getPayment)
        window.location.replace(getPayment.data.session.url);
    }

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-red-500'>You have 0 available credits.</h2>
            <div className='my-4'>
                <Label className='text-base'>
                    <span className="flex items-center justify-center ml-2">
                        Buy Packs of 20 credits
                        <FaCoins className="ml-1" />
                    </span>
                </Label>
                <div className='flex justify-center items-center gap-5 my-4'>
                    <Label className='text-base'>Quantity</Label>
                    <Input className="w-full" type="number" placeholder='1' id='quantity' onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
                <button
                    className='w-full text-center  p-2.5 text-sm font-medium text-black rounded-lg bg-green-600 hover:bg-green-700  focus:ring-4 focus:outline-none focus:ring-green-400'
                    onClick={() => onClickCheckout()}>
                    <span className="flex items-center justify-center ml-2">
                        Purchase
                    </span>
                </button>
            </div>
        </div >
    )
}

export default BuyCredits;