import React, { useState, useEffect } from 'react'
import Roulette from './game/Roulette'
import Montecarlo from './algorithms/Montecarlo'
import Style from './game/Style'
import './App.css'
import Bet from './utils/Bet'
import BetType from './game/BetType'
import Color from './utils/Color'
import Chart from 'react-apexcharts'
import { Button, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Output from './utils/Output'

function App() {

  const [calculationReady, setCalculationReady] = useState(true);

  const [series, setSeries] = useState([{name: '', data: [0]}])
  const [options, setOptions] = useState({})

  const initialAmount = 50
  const betTimes = [1,2,3,4,5,10,15,20,25,30,35,40,45,50,75,100,250,500]
  const betAmounts = [1,5,10,15,20,25,50]

  const [betAmount, setBetAmount] = useState(1)
  const [finalAmount, setFinalAmount] = useState(0);
  const [numberOfBets, setNumberOfBets] = useState(5);
  const [numberOfSimulations, setNumberOfSimulations ] = useState(100);

  useEffect(() => {}, [calculationReady])

  const startSimulation = () => {

    setCalculationReady(false)

    //create a new Roulette Game!
    const rouletteGame = new Roulette(Style.AMERICAN, false)

    //create new bet!
    const bet = new Bet({
          type: BetType.BET_ON_COLOR, 
          color: Color.RED, 
          amount: betAmount
    })
    
    //define & run Montecarlo algorithm
    const algorithm = new Montecarlo(rouletteGame, bet, numberOfBets, numberOfSimulations, initialAmount)

    const results:Output = algorithm.sample()

    setFinalAmount(Math.floor(results.average));

    let scale = Array.from({length: numberOfBets}, (x, i) => i)

    setSeries(results.data)

    setOptions({
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: scale
      }
    })

    setCalculationReady(true)
  }

  const getBadgeColor = () => {
    if(finalAmount > initialAmount) return 'success'
    if(finalAmount === initialAmount) return 'Secondary'
    if(finalAmount < initialAmount){
      if(finalAmount >= initialAmount/2) return 'warning'
      else return 'danger'
    }
  }

  const showChart = () => {
    if(calculationReady) {
      return (
        <>
        <span>Initial Amount: ${initialAmount}</span>
        <br/>
        <h4>Final Amount: <Badge style={{verticalAlign: 'top'}} variant={getBadgeColor()}>${finalAmount}</Badge></h4>
        <Chart
          options={options}
          series={series}
          type="line"
          width="1200"
        />
        </>
      )
    } else {
      return <></>
    }
    
  }

  return (
    <div className="container-fluid">
      <div className="container mt-5"><h2 className="text-center">American Roulette Risk Model - Montecarlo Simulation</h2></div>
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">

        <div className="container d-flex flex-row justify-content-center align-items-center">

          <Form.Group>
              <Form.Label>Bet Amount ($)</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setBetAmount(e.target.value as unknown as number)}>
                {betAmounts.map(ba => <option key={`id-${ba}`} value={`${ba}`}>{ba}</option>)}
              </Form.Control>
          </Form.Group>

          <Form.Group className="ml-3">
              <Form.Label>Bets to Place</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setNumberOfBets(e.target.value as unknown as number)}>
                {betTimes.map(bt => <option key={`id-${bt}`} value={`${bt}`}>{bt}</option>)}
              </Form.Control>
          </Form.Group>

          <Button className="mt-3 ml-3" onClick={() => startSimulation()}>
            Start Simulation
          </Button>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="mt-5">
          {showChart()}      
        </div>
      </div>

    </div>
  )
}

export default App
