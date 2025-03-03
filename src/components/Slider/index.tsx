import './Slider.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import data from '../../db/data.json'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

interface SliderProps {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    points: number;
}

const Slider = ({ activeIndex, setActiveIndex, points }: SliderProps) => {

    const handleClick = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <section className="slider-container">
            <div className="switcher">
                <span>{`0${activeIndex + 1}/0${points}`}</span>
                <span className="switcher-buttons">
                    {
                        activeIndex === 0 ?
                            <button disabled className='btn disabled'>{`<`}</button>
                            :
                            <button onClick={() => handleClick(activeIndex - 1)} className='btn'>{`<`}</button>
                    }
                    {
                        activeIndex === points - 1 ?
                            <button disabled className='btn disabled'>{`>`}</button>
                            :
                            <button onClick={() => handleClick(activeIndex + 1)} className='btn'>{`>`}</button>
                    }
                </span>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    data.historicalDates[activeIndex].events.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="content">
                                <span className='year'>{item.year}</span>
                                <span className='description'>{item.description}</span>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper
                pagination={true}
                spaceBetween={30}
                slidesPerView={1.5}
                modules={[Pagination]}
                className="mobileSwiper"
            >
                {
                    data.historicalDates[activeIndex].events.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="mobileContent">
                                <span className='year'>{item.year}</span>
                                <span className='description'>{item.description}</span>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}
export default Slider