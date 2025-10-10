"use client";

import {PosterCarousel} from "./PosterCarousel";

// Mock Data for Posters
const mockPosters = [
    // {id: 1, title: "Poster 1", image: "/top/poster/poster-full-textless.webp"},
    // {id: 2, title: "Poster 2", image: "/poster2.png"},
    // {id: 3, title: "Poster 3", image: "/poster3.png"},
    // {id: 4, title: "Poster 4", image: "/poster4.png"},
    // {id: 5, title: "Poster 5", image: "/poster5.png"},
    // {id: 6, title: "Poster 6", image: "/poster6.png"},
    // {id: 7, title: "Poster 7", image: "/poster7.png"},
    // {id: 8, title: "Poster 8", image: "/poster8.png"},
    // {id: 9, title: "Poster 9", image: "/poster9.png"},
    // {id: 10, title: "Poster 10", image: "/poster10.png"},
    {id: 1, title: "01", image: "/img/posters/01.webp"},
    {id: 2, title: "02", image: "/img/posters/02.webp"},
    {id: 3, title: "03", image: "/img/posters/03.webp"},
    {id: 4, title: "04", image: "/img/posters/04.webp"},
    {id: 5, title: "05", image: "/img/posters/05.webp"},
    {id: 6, title: "06", image: "/img/posters/06.webp"},
    {id: 7, title: "07", image: "/img/posters/07.webp"},
    {id: 8, title: "08", image: "/img/posters/08.webp"},
    {id: 9, title: "09", image: "/img/posters/09.webp"},
    {id: 10, title: "10", image: "/img/posters/10.webp"},
    {id: 11, title: "11", image: "/img/posters/11.webp"},
    {id: 12, title: "12", image: "/img/posters/12.webp"},
    {id: 14, title: "14", image: "/img/posters/14.webp"},
    {id: 15, title: "15", image: "/img/posters/15.webp"},
    {id: 16, title: "16", image: "/img/posters/16.webp"},
    {id: 17, title: "17", image: "/img/posters/17.webp"},
    {id: 19, title: "19", image: "/img/posters/19.webp"},
    {id: 20, title: "20", image: "/img/posters/20.webp"},
    {id: 22, title: "22", image: "/img/posters/22.webp"},
    {id: 23, title: "23", image: "/img/posters/23.webp"},
    {id: 24, title: "24", image: "/img/posters/24.webp"},
    {id: 26, title: "26", image: "/img/posters/26.webp"},
    {id: 27, title: "27", image: "/img/posters/27.webp"},
    {id: 28, title: "28", image: "/img/posters/28.webp"},
    {id: 29, title: "29", image: "/img/posters/29.webp"},
    {id: 30, title: "30", image: "/img/posters/30.webp"},
    {id: 31, title: "31", image: "/img/posters/31.webp"},
    {id: 32, title: "32", image: "/img/posters/32.webp"},
    {id: 33, title: "33", image: "/img/posters/33.webp"},
    {id: 34, title: "34", image: "/img/posters/34.webp"},
    {id: 35, title: "35", image: "/img/posters/35.webp"},
    {id: 36, title: "36", image: "/img/posters/36.webp"},
    {id: 38, title: "38", image: "/img/posters/38.webp"},
    {id: 39, title: "39", image: "/img/posters/39.webp"},
    {id: 40, title: "40", image: "/img/posters/40.webp"},
    {id: 41, title: "41", image: "/img/posters/41.webp"},
    {id: 43, title: "43", image: "/img/posters/43.webp"},
    {id: 44, title: "44", image: "/img/posters/44.webp"},
    {id: 45, title: "45", image: "/img/posters/45.webp"},
    {id: 49, title: "49", image: "/img/posters/49.webp"},
    {id: 52, title: "52", image: "/img/posters/52.webp"},
    {id: 53, title: "53", image: "/img/posters/53.webp"},
    {id: 54, title: "54", image: "/img/posters/54.webp"},
    {id: 55, title: "55", image: "/img/posters/55.webp"},
    {id: 56, title: "56", image: "/img/posters/56.webp"},
];

export function Posters() {
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <PosterCarousel posters={mockPosters}/>
        </section>
    );
}
