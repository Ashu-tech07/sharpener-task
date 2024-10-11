import React from 'react';
import "./Home.css";

const tours = [
    {
        id: '1',
        date: "JUL16",
        place: "DETROIT, MI",
        specPlace: "DTE ENERGY MUSIC THEATRE",
    },
    {
        id: '2',
        date: "JUL19",
        place: "TORONTO, ON",
        specPlace: "BUDWEISER STAGE",
    },
    {
        id: '3',
        date: "JUL 22",
        place: "BRISTOW, VA",
        specPlace: "JIGGY LUBE LIVE",
    },
    {
        id: '4',
        date: "JUL 29",
        place: "PHOENIX, AZ",
        specPlace: "AK-CHIN PAVILION",
    },
    {
        id: '5',
        date: "AUG 2",
        place: "LAS VEGAS, NV",
        specPlace: "T-MOBILE ARENA",
    },
    {
        id: '6',
        date: "AUG 7",
        place: "CONCORD, CA",
        specPlace: "CONCORD PAVILION",
    },
];

const Home = () => {

    return (
        <section>
            <div className="album">
                <button className="latest-album">Get our Latest Album</button>
                <button className="play-btn">▶</button>
            </div>
            <div id="tours" className="container">
                <h2>TOURS</h2>
                <div>
                    {tours.map((tour) => (
                        <div className="tour-item" key={tour.id}>
                            <span className="tour-date">{tour.date}</span>
                            <span className="tour-place">{tour.place}</span>
                            <span className="tour-spec-place">{tour.specPlace}</span>
                            <button className="buy-btn">BUY TICKETS</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Home;