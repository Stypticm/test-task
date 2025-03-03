import './Years.scss'
import gsap from 'gsap'
import data from '../../db/data.json'
import { useEffect, useRef, useState } from 'react'

const Years = ({ activeIndex }: { activeIndex: number }) => {
    const leftYearRef = useRef<HTMLSpanElement>(null);
    const rightYearRef = useRef<HTMLSpanElement>(null);

    const [leftYear, setLeftYear] = useState(0)
    const [rightYear, setRightYear] = useState(0)

    useEffect(() => {
        const years = data.historicalDates[activeIndex].events.map((item: any) => item.year);

        gsap.to({ value: leftYear }, {
            value: years[0],
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: function () {
                setLeftYear(Math.floor(this.targets()[0].value))
            },
        });

        gsap.to({ value: rightYear }, {
            value: years.at(-1),
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: function () {
                setRightYear(Math.floor(this.targets()[0].value))
            },
        });

    }, [activeIndex])

    return (
        <section className="years-container">
            <div className="years">
                <span ref={leftYearRef} className="left">{leftYear}</span>
                <span ref={rightYearRef} className="right">{rightYear}</span>
            </div>
        </section>
    )
}

export default Years