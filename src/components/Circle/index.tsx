import { useEffect, useRef, useState } from 'react'
import './Circle.scss'
import gsap from 'gsap'
import data from '../../db/data.json'

type CircleProps = {
  pointCount: number,
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const Circle: React.FC<CircleProps> = ({ pointCount, activeIndex, setActiveIndex }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([])

  const radius = 264;
  const centerX = 264;
  const centerY = 264;

  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (index / pointCount) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle: (angle * 180) / Math.PI };
  })

  useEffect(() => {
    if (circleRef.current) {
      const targetAngle = 300 - points[activeIndex].angle;

      gsap.to(circleRef.current, {
        rotate: targetAngle,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(`.index-name`, {
            opacity: 1,
            duration: 0.8,
            delay: .4
          })
        }
      });

    }
  }, [activeIndex, points])

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const targetAngle = 300 - points[activeIndex].angle;

  return (
    <>
      <div className='circle-container'>
        <div className='circle' ref={circleRef}>
          {points.map((point, index) => (
            <div
              key={index}
              ref={(el) => { pointRefs.current[index] = el }}
              className={`point ${index === activeIndex ? 'active' : ''}`}
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(-50%, -50%) rotate(${-targetAngle}deg)`
              } as React.CSSProperties}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {
                (index === activeIndex || index === hoveredIndex) &&
                <span className="index-label">{index + 1}</span>
              }
              {
                index === activeIndex && (
                  <span
                    className='index-name active'
                    style={{
                      "left": `${data.historicalDates[index].theme.length > 6 ? "120" : "100"}px`,
                    }}>
                    {data.historicalDates[index].theme}</span>
                )
              }
            </div>
          ))}
        </div>
      </div>
      <div className="nameOfCategory">
        {data.historicalDates[activeIndex].theme}
      </div>
    </>
  )
}

export default Circle