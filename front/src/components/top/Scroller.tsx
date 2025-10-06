"use client"
import {useEffect, useState} from "react";
import {animateScroll, Events} from "react-scroll";



const Scroller = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {

        const allSections = document.querySelectorAll('.scroll-section');
        // display: noneがあたっているものはスクロール対象に含めないことに
        const sections = Array.from(allSections).filter((section) => (section.computedStyleMap().get("display") as CSSKeywordValue).value !== "none");


        const observer = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    // もし他のコンポーネントからのスクロールだったなら何もしない
                    const scrolling = document.documentElement.style.getPropertyValue('--scrolling');
                    if (scrolling === 'true') {
                        return;
                    }

                    // セクションが画面内に入ったらそっちへスクロール
                    animateScroll.scrollTo(window.scrollY + e.target.getBoundingClientRect().top, {
                        duration: 750,
                        smooth: 'easeOutCubic',
                    });
                    
                }
            }
        }, {threshold: 0.01});

        // sectionsを全て監視対象にする
        sections.forEach((section) => {
            observer.observe(section,);
        });


        Events.scrollEvent.register('begin', () => {
            setIsScrolling(true);
            document.documentElement.style.setProperty('--scrolling', 'true');
            document.body.style.overflow = 'hidden';
        });
        Events.scrollEvent.register('end', () => {
            setIsScrolling(false);
            document.documentElement.style.removeProperty('--scrolling');
            document.body.style.overflow = 'visible';
        });

        return () => {
            observer.disconnect();
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }

    }, []);
    return null;

}
export default Scroller;
