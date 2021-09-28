import axios from 'axios';
import { useState } from 'react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const getAddressInfo = async () => {
        setIsLoading(true);
        try {
            const res = await axios({
                method: 'get',
                url: "http://127.0.0.1:8000/get_address_info",
                params: {
                    destination: "200 University Ave W, Waterloo, ON",
                    addresses: [
                        "242 Albert St, Waterloo, ON",
                        "64 Balsam St, Waterloo, ON"
                    ]
                },
            });
            console.log(res.data);
        } catch ( ex ) {
            console.log("exception!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2>Home</h2>
            <button disabled={isLoading} onClick={() => getAddressInfo()}>Test API</button>
        </div>
    );
}