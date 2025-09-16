import { useEffect, useRef, useState } from 'react';
import './main.scss'
import Video from './Video';
import Fone from './Fone';

function App() {

  const imgs = [
    {
      link: 'https://x.com/usdwontron?s=21&t=8shy0WWt5b5TtmS5zHTzGg',
      img: '/x.svg',
    },
    {
      link: 'https://dexscreener.com/tron/TMfbLCZVW2PnvUJscRyLQ1V6LLQSZ4nAQH',
      img: '/dex.svg'
    },
    {
      link: 'https://www.dextools.io/app/en/token/usdwon',
      img: '/xz.svg'
    }
  ]

  const appRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = e => {
      const { innerWidth, innerHeight } = window;
      target.current.x = (e.clientX / innerWidth - 0.5) * 2; // -5..5 vw
      target.current.y = (e.clientY / innerHeight - 0.5) * 2 - 1; // -5..5 vh
    };

    if (window.innerWidth > 700) {
      window.addEventListener("mousemove", handleMove);
    }

    let raf;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;

      if (appRef.current) {
        appRef.current.style.backgroundPosition =
          `${current.current.x}vw ${current.current.y}vh`;
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const [playVideo, setplayVideo] = useState(0);

  const [noisePos, setnoisePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setnoisePos({
        x: Math.floor(Math.random() * 200 - 100),
        y: Math.floor(Math.random() * 200 - 100),
      });
    }, 1000 / 12);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className='App_fone' ref={appRef}>
      </div>
      <div className='App_decor free_img'>
        <div className='App_chelik_wrapper' onClick={() => { setplayVideo(Math.random()) }}>
          <img src="/chelick.webp" alt="" />
        </div>
      </div>

      <div className='App_header'>
        {
          imgs.map((el, index) => (
            <a href={el.link} target='_blank' className='App_header_el' key={`App_a_key_${index}`}>
              <img src={el.img} alt="" />
            </a>
          ))
        }
      </div>

      <div className='App_text_wrapper'>
        <div className='App_text'>
          <div className='App_text_top App_text_el'>WON KEEPS</div>
          <div className='App_text_bottom App_text_el'>WONNIN`</div>
        </div>
      </div>
      <div className='App_video'>
        <Video playSignal={playVideo} />
      </div>
      <div className='App_noise' style={{
        backgroundPosition: `${noisePos.x}px ${noisePos.y}px`
      }}></div>

    </>

  )
}

export default App
