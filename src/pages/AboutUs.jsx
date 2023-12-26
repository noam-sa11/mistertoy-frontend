import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

const ShopMarker = ({ text, onClick }) => (
    <div style={{ fontSize: '20px', cursor: 'pointer' }} onClick={onClick}>
        {text}
    </div>
)
const shopBranches = [
    { id: 1, name: 'Ono', location: { lat: 32.059650, lng: 34.850430 } },
    { id: 2, name: 'Sarona', location: { lat: 32.072578, lng: 34.784779 } },
    { id: 3, name: 'Herzlia', location: { lat: 32.164860, lng: 34.844170 } },
    { id: 4, name: 'Petah Tikva', location: { lat: 32.089870, lng: 34.844170 } },
    // Add more branches as needed
]
export function AboutUs() {
    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleMarkerClick(branchLocation) {
        setCenter(branchLocation)
    }

    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>

            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDA5c3kAK2In6DzVYo8JLV8TIc2aGEDfSc" }}
                    center={center}
                    defaultZoom={zoom}
                >
                    {shopBranches.map(branch => (
                        <ShopMarker
                            key={branch.id}
                            lat={branch.location.lat}
                            lng={branch.location.lng}
                            text="📍"
                            onClick={() => handleMarkerClick(branch.location)}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </section>
    )
}

// import React, { useState } from 'react'
// import GoogleMapReact from 'google-map-react'

// const ShopMarker = ({ text, onClick, onMouseEnter, onMouseLeave }) => (
//     <div
//         style={{ fontSize: '20px', cursor: 'pointer', position: 'relative' }}
//         onClick={onClick}
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//     >
//         {text}
//     </div>
// )

// const ShopInfoModal = ({ branch }) => (
//     <div
//         style={{
//             position: 'absolute',
//             bottom: '0',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             backgroundColor: 'white',
//             padding: '5px',
//             borderRadius: '5px',
//             boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
//         }}
//     >
//         {branch.name}
//     </div>
// )

// const shopBranches = [
//     { id: 1, name: 'Ono', location: { lat: 32.059650, lng: 34.850430 } },
//     { id: 2, name: 'Sarona', location: { lat: 32.072578, lng: 34.784779 } },
//     { id: 3, name: 'Herzlia', location: { lat: 32.164860, lng: 34.844170 } },
//     { id: 4, name: 'Petah Tikva', location: { lat: 32.089870, lng: 34.880451 } },
//     // Add more branches as needed
// ]
// export function AboutUs() {
//     const [hoveredBranch, setHoveredBranch] = useState(null)
//     const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
//     const zoom = 11

//     function handleMarkerClick(branch) {
//         setCenter(branch.location)
//     }

//     return (
//         <section>
//             <h2>About Us</h2>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>

//             <div style={{ height: '50vh', width: '100%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key: "AIzaSyDA5c3kAK2In6DzVYo8JLV8TIc2aGEDfSc" }}
//                     center={center}
//                     defaultZoom={zoom}
//                 >
//                     {shopBranches.map(branch => (
//                         <React.Fragment key={branch.id}>
//                             <ShopMarker
//                                 key={branch.id}
//                                 lat={branch.location.lat}
//                                 lng={branch.location.lng}
//                                 text="📍"
//                                 onMouseEnter={() => setHoveredBranch(branch)}
//                                 onMouseLeave={() => setHoveredBranch(null)}
//                                 onClick={() => handleMarkerClick(branch)}
//                             />
//                             {hoveredBranch && hoveredBranch.id === branch.id && (
//                                 <ShopInfoModal branch={branch} />
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </GoogleMapReact>
//             </div>
//         </section>
//     )
// }