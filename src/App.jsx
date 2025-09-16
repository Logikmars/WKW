import { useEffect, useRef, useState } from 'react';
import './main.scss'

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

  const [showVideo, setshowVideo] = useState(false);

  const startVideo = () => {
    if (showVideo) return
    const video = videoRef.current
    if (!video) return
    // Play when loaded; otherwise wait for 'canplay'
    const playNow = () => {
      try { video.currentTime = 0 } catch { }
      video.play().catch(() => { })
      setshowVideo(true)
      setTimeout(() => setshowVideo(false), 4500)
    }
    if (video.readyState >= 3) {
      playNow()
      return
    } else {
      const onCanPlay = () => {
        video.removeEventListener('canplay', onCanPlay)
        playNow()
      }
      video.addEventListener('canplay', onCanPlay, { once: true })
      try { video.load() } catch { }
      return
    }
  }

  const videoRef = useRef(null)

  const appRef = useRef(null);
  const chelRef = useRef(null);

  useEffect(() => {
    const handleMove = e => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 5 - 5; // -5..5 vw
      const y = ((e.clientY / innerHeight - 0.5) * 5 - 5) * .5; // -5..5 vh
      if (appRef.current) {
        appRef.current.style.backgroundPosition = `${x}vw ${y}vh`;
      }
      if (chelRef.current) {
        chelRef.current.style.transform = `translate(${-x - 5}vw, ${-y - 2.5}vh)`;
      }

    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="App" ref={appRef}>
      <div className='App_decor free_img'>
        <div className='App_chelik_wrapper' onClick={startVideo}>
          <img src="/chelick.webp" ref={chelRef} alt="" />
        </div>
      </div>
      <div className='App_video' style={{
        opacity: showVideo ? 1 : 0
      }}>
        <video src="/video.mp4" ref={videoRef} preload="auto" playsInline muted />
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

    </div>
  )
}

export default App
