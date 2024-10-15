import React from 'react'
import './loader.css'

export function Loader() {
    return <div className="loader"></div>
}


// usage example :
// export function SomeComponent() {
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         // Simulate a loading delay
//         setTimeout(() => setIsLoading(false), 2000)
//     }, [])

//     return (
//         <div>
//             {isLoading ? <Loader /> : <p>Data Loaded!</p>}
//         </div>
//     )
// }