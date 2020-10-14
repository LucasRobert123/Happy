import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarker from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanages {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            console.log(response.data)
            setOrphanages(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Campos Gerais</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map center={[-21.2428861,-45.7559692]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => {
                    return (
                        <Marker position={[orphanage.latitude, orphanage.longitude]}
                                icon={mapIcon}
                                key={orphanage.id}
                        >
                            <Popup closeButton={false}
                                minWidth={240}
                                maxHeight={240}
                                className="map-popup"

                            >
                            {orphanage.name}
                            <Link to={`orphanages/${orphanage.id}`}>
                                <FiArrowRight size={32} color="white" />
                            </Link>
                            </Popup>
                        </Marker>
                    )
                })

                }
            </Map>

            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}