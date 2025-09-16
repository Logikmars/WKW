import './main.scss'

function App() {

  const imgs = [
    {
      link: '#',
      img: '/x.svg', 
    },
    {
      link: '#',
      img: '/dex.svg'
    },
    {
      link: '#',
      img: '/xz.svg'
    }
  ]

  return ( 
    <div className='App'>
      <div className='App_header'>
        {
          imgs.map((el, index) => (
            <div className='App_header_el' key={`App_a_key_${index}`}>
              <img src={el.img} alt="" />
            </div>
          ))
        }
      </div>
      <div className='App_text'>
        <div className='App_text_top App_text_el'>WON KEEPS</div>
        <div className='App_text_bottom App_text_el'>WONNIN`</div>
      </div>
      <div className='App_decor free_img'>
        <img src="/chelick.webp" alt="" />
      </div>
    </div>
  )
}

export default App
