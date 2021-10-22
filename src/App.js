
import React from 'react'

import TinderCard from 'react-tinder-card'

function App() {
  const [currentMeow, setCurrentMeow] = React.useState({})
  const [favs, setFavs] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const findMeow = React.useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('https://cataas.com/cat?json=true')
      const data = await response.json()

      setCurrentMeow(data)

    } catch (err) {

      console.log(err);

    } finally {
      setLoading(false)
    }
  }, [])

  const addToFav = (event) => {

    if (event === 'right') {

      setFavs([...favs, currentMeow])
    }
  }

  React.useEffect(() => {

    findMeow()

  }, [findMeow])

  return (
    <>
      <div className="container">
        <h1 className="title">CAT TINDER</h1>

        <div className="fav">
          {favs.map((fav) => <span className="fav-img" key={fav.id}><img src={`https://cataas.com${fav?.url}`} /></span>).reverse()}
        </div>
        <div className="wrapper">
          <img className="icons" src="/heart-dislike.svg" alt="Dislike" />
          <div className="skeleton">
            {!loading && <TinderCard className='tinder-card' onSwipe={(e) => addToFav(e)} onCardLeftScreen={() => findMeow()} key={currentMeow.id} flickOnSwipe>
              <img src={`https://cataas.com${currentMeow?.url}`} key={currentMeow.id} alt={currentMeow?.tags?.join(' ')} />
            </TinderCard>}

            {loading && 'Cat loading...'}

          </div>
          <img className="icons" src="/heart.svg" alt="Like" />
        </div>

        <p className="desc">Swipe right or left</p>
      </div >
    </>
  );
}

export default App;
