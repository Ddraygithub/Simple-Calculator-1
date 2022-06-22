import React from 'react';
import DrumsPad from './Components/DrumsPad';
import { useState } from 'react';



function DrumApp() {
    const [volume, setVolume] = useState(1)

    const [sounds, setSounds] = useState([
        {
            id: "A",
            name: "A",
            keyCode: 65,
            sound: require("./DRUMS/TOM5.wav"),
        },
        {
            id: "B",
            name: "B",
            keyCode: 66,
            sound: require("./DRUMS/kick.wav"),
        },
        {
            id: "C",
            name: "C",
            keyCode: 67,
            sound: require("./DRUMS/SNARE1.wav"),
        }
    ])



    return (
        <div className='container-fluid bg-info w-100 vh-100 pt-5'>
            <div className='container w-50 m-auto text-center h2'>
                <h1>Drum App</h1>
                {sounds.map((s) => (
                    <DrumsPad code={s.keyCode} sound={s.sound} key={s.id} letter={s.name} volume={volume} />
                ))}
                <br />
                <br />
                <h4>Volume</h4>
                <input className='w-50' type="range" max="1" min="0" value={volume} step="0.01" onChange={(e)=> setVolume(e.target.value)} />
            </div>
            <div className="btn-on-off text-center">
                <form action="#">
                    <input type="checkbox" name="checkbox" id="chk" />
                    <label className='on' for="">on</label>
                    <label className='off' for="">off</label>
                </form>
            </div>
        </div>
    )
}

export default DrumApp;