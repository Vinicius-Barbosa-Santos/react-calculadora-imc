import { useState } from 'react'
import styles from './App.module.css'
import powered from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc' 
import { GridItem } from './components/GridItem'
import leftArrow from './assets/leftarrow.png'

const App = () => {
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [show, setShow] = useState<Level | null>(null)

  const handleCalculateIMC = () => {
    if(height && weight) {
      setShow(calculateImc(height, weight))
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleBackButton = () => {
    setHeight(0)
    setWeight(0)
    setShow(null)
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powered} alt="" width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>

          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa</p>

          <input type="number"
            placeholder='Digite a sua altura. Ex 1.5 (em metros)' 
            value={height > 0 ? height : ''}
            onChange={e => setHeight(parseFloat(e.target.value))}
            disabled={show ? true : false}/>

          <input type="number"
            placeholder='Digite o seu peso. Ex 75.3 (em kg)' 
            value={weight > 0 ? weight : ''}
            onChange={e => setWeight(parseFloat(e.target.value))}
            disabled={show ? true : false}/>

          <button onClick={handleCalculateIMC}>Calcular</button>
        </div>  

        <div className={styles.rightSide}>
          {!show &&
            <div className={styles.grid}>
              {levels.map((item, index) => (
                <GridItem key={index} item={item}/>
              ))}
            </div>
          }

          {show &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrow} alt="" width={30}/>
              </div>
              <GridItem item={show}/>
            </div>
          } 
        </div>  
      </div>
    </div>
  )
}

export default App