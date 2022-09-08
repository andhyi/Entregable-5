import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatPokemon from './Pokedex/StatPokemon'
import './styles/pokedexdetails.css'

const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()

  const {name} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
    axios.get(URL)
    .then(res => setPokeInfo(res.data))
    .catch(err => console.log(err))
  }, [])

  const navigat = useNavigate()

  const handleClick = () => navigat(`/pokedex/`)
  
  console.log(pokeInfo)
  

  return (

    <div className='cards1-container'>
      <article className={`card1 color-${pokeInfo?.types[0].type.name}`}>
      <header className={`card1__header bg-${pokeInfo?.types[0].type.name}`}>
        <img className='card1__avatar' src={pokeInfo?.sprites.other['official-artwork'].front_default} alt="" />
             </header>
      <div className='card1__espacio'>
        <div className='card1__height'>
            <h2 className={`card1__name__heigth color-text-${pokeInfo?.types[0].type.name}`}>{pokeInfo?.height}</h2>
            <h2 className={`card1__name__heigth color-text-${pokeInfo?.types[0].type.name}`}> Height </h2>
        </div>
        <div className='card1__weight'>
            <h2 className={`card1__name__weight color-text-${pokeInfo?.types[0].type.name}`}>{pokeInfo?.weight}</h2>
            <h2 className={`card1__name__weight color-text-${pokeInfo?.types[0].type.name}`}> Weight </h2>
        </div>
      </div>
       
      <h1 className={`card1__name color-text-${pokeInfo?.types[0].type.name}`}>{pokeInfo?.name}</h1>
      <h1 className={`card1__name color-text-${pokeInfo?.types[0].type.name}`}>Type:</h1>
      <ul className='card1__list-type'>
          {
            pokeInfo?.types.map(slot => (
              <ul className='card1__item-type' key={slot.type.url}>{slot.type.name}</ul>
            ))
          }
        </ul>

        <hr className='card1__hr' />
        <header className={`card1__header bg-${pokeInfo?.types[0].type.name}`}>
          <hr />
          <hr />
          <hr />
          <hr />
        <h1 className='card1__name__abilities' >Abilities:</h1>
        <div className='card1__list-abilities'>
          {
            pokeInfo?.abilities.map(slot => (
              <ul className='card1__item-abilities' key={slot.ability.url}>{slot.ability.name}</ul>
            ))
          }
        </div>
        </header>

      <footer className='card1__footer'>
      <h1 className={`card1__name color-text-${pokeInfo?.types[0].type.name}`}>Stats:</h1>
        <ul className='card1__list-stats'>
          {
            pokeInfo?.stats.map(stat => (
              <StatPokemon 
                key={stat.stat.url}
                infoStat={stat}
                color={pokeInfo?.types[0].type.name}
              />
            ))
          }
        </ul>
      </footer>

    </article>
          <div className='back'>
            <button className='button__back' onClick={handleClick}>Back</button>
          </div>
    </div>


  )
}

export default PokemonDetails