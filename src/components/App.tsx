import { useState } from 'react'
import Circle from './Circle'
import './App.scss'
import Years from './Years';
import Slider from './Slider';

const App = () => {

  const [points, setPoints] = useState(6);
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <section className="main-section">
            <div className="countOfPoints">
              <h3>Выберите количество точек на окружности: </h3>
              {points !== 2 ? (
                <button onClick={() => setPoints(points - 1)} style={{ cursor: 'pointer' }}>{'<'}</button>
              ) : (
                <button disabled>{'<'}</button>
              )}
              {points}
              {points !== 6 ? (
                <button onClick={() => setPoints(points + 1)} style={{ cursor: 'pointer' }}>{'>'}</button>
              ) : (
                <button disabled>{'>'}</button>
              )}
            </div>

        <section className='main-border'>
          <Circle pointCount={points} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <div className="line horizontal" />
          <div className="line vertical" />
          <div className='color-vertical-line' />
          <section className='main-section-title'>
            <span>Исторические даты</span>
          </section>
          <Years activeIndex={activeIndex} />
          <Slider activeIndex={activeIndex} points={points} setActiveIndex={setActiveIndex} />
        </section>
      </section >
    </>
  )
}

export default App