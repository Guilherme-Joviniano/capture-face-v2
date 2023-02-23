import { useState, useEffect } from 'react'
import App from './App';

const Grid = () => {
    // State to store parsed data
    const [data, setData] = useState([]);

    useEffect(() => {
        let ips: any[] = []
        let connections: any[] = [];
        fetch('http://localhost:2000/ips')
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            });
    }, [])

    return (<div className='videos-wrapper'>
        {
            data.map((connection) => {
                const ip = connection['IPv4 Address']
                return (<App ip={ip}></App>)
            })
        }
    </div>)
}

export default Grid