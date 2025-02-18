import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import Optimizer from './Optimizer.jsx'


function Optimizer(){

  console.log("test")
  return (
      <>
      </>
  )
}

function App() {
  const [inputStrength, setStrengthValue] = useState('');
  const [inputDexterity, setDexterityValue] = useState('');
  const [inputConstitution, setConstitutionValue] = useState('');
  const [inputIntelligence, setIntelligenceValue] = useState('');
  const [inputWisdom, setWisdomValue] = useState('');
  const [inputCharisma, setCharismaValue] = useState('');

  const [isVisible, setVisible] = useState(false);

  const strengthChange = (event) =>{
    setStrengthValue(event.target.value);
  };
  const dexterityChange = (event) =>{setDexterityValue(event.target.value);};
  const constitutionChange = (event) =>{setConstitutionValue(event.target.value);};
  const intelligenceChange = (event) =>{setIntelligenceValue(event.target.value);};
  const wisdomChange = (event) =>{setWisdomValue(event.target.value);};
  const charismaChange = (event) =>{setCharismaValue(event.target.value);};

  const visibleChange = (val) =>{setVisible(val)};
  const boolStr = false;

  const [results, setResultValue] = useState('');
  const resultsChange = (e) => {setResultValue(e);};

  let numbs = 0;

  const numbCheck = (stat) => {
    if(stat > 0 && stat <=20 ){
      return true
    }
    else{
      return false
    }
  };

  const shoot = (str, dex, con, int, wis, cha) => {
    numbs = parseInt(str) + parseInt(dex)
    //converting string to INT for calculations
    let STR = parseInt(str)
    let DEX = parseInt(dex)
    let CON = parseInt(con)
    let INT = parseInt(int)
    let WIS = parseInt(wis)
    let CHA = parseInt(cha)

    if(numbCheck(STR) && numbCheck(DEX) && numbCheck(CON) && numbCheck(INT) && numbCheck(WIS) && numbCheck(CHA)){
      //compute values for the classes
      let ARTIFICER = [(INT/10*2+DEX/10*1.5)/2 , "Artificer"]
      let BARBARIAN = [(STR/10*2+CON/10*1.5)/2, "Barbarian"]
      let BARD = [(CHA/10*2+DEX/10*1.5)/2, "Bard"]
      let BLOODHUNTER = [(DEX/10*2+CON/10*1.5)/2, "Blood Hunter"]
      let CLERIC = [(WIS/10*2+CON/10*1.5)/2, "Cleric"]
      let DRUID = [(WIS/10*2+CON/10*1.5)/2, "Druid"]
      let FIGHTER = [(STR/10*2+DEX/10*1.5)/2, "Fighter"]
      let MONK = [(DEX/10*2+WIS/10*1.5)/2, "Monk"]
      let PALADIN = [(CHA/10*2+CON/10*1.5)/2, "Paladin"]
      let RANGER = [(DEX/10*2+WIS/10*1.5)/2, "Ranger"]
      let ROGUE = [(DEX/10*2+CHA/10*1.5)/2, "Rogue"]
      let SORCERER = [(CHA/10*2+CON/10*1.5)/2, "Sorcerer"]
      let WARLOCK = [(CHA/10*2+CON/10*1.5)/2, "Warlock"]
      let WIZARD = [(INT/10*2+DEX/10*1.5)/2, "Wizard"]

      //add classes to the list if they are not ignored
      var v = []
          v.push(ARTIFICER)
          v.push(BARBARIAN)
          v.push(BARD)
          v.push(BLOODHUNTER)
          v.push(CLERIC)
          v.push(DRUID)
          v.push(FIGHTER)
          v.push(MONK)
          v.push(PALADIN)
          v.push(RANGER)
          v.push(ROGUE)
          v.push(SORCERER)
          v.push(WARLOCK)
          v.push(WIZARD)

      v.sort(function(a,b){return b[0] - a[0]})

      let output = ""
      for(var i=0; i<v.length;i++){
        output += v[i][1] + " with a score of " + v[i][0] + "\n\n"
      }
      
      visibleChange(true)
      resultsChange(output)
    }
    else{
      visibleChange(true)
      resultsChange("Only enter values between 0-20")
    }
  };
  return (
    <>
      {/*<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <input type="text" id="myInput" name="myInput"></input>

      <div className="Test">
        <p>
          test
        </p>
        <output value={myInput}/>
      </div>*/}
    
  <title>Class Recommendation Tool</title>
  <h1 className="h1">D&D Class Recommendation Tool!!</h1>
  <p>
    All you have to do is input your six stats and choose any classes you do not
    want factored into the calculation. Then watch the magic unfold!
  </p>
  <br />
  <br />

        {// need to add pattern detection later
        }
  <div>
    Strength:  <input type= "number" value={inputStrength} onChange={strengthChange} min="1" max="20"/><br></br>
    Dexterity:  <input type= "number" value={inputDexterity} onChange={dexterityChange} min="1" max="20"/><br></br>
    Constitution:  <input type= "number" value={inputConstitution} onChange={constitutionChange} min="1" max="20"/><br></br>
    Intelligence:  <input type= "number" value={inputIntelligence} onChange={intelligenceChange} min="1" max="20"/><br></br>
    Wisdom:  <input type= "number" value={inputWisdom} onChange={wisdomChange} min="1" max="20"/><br></br>
    Charisma:  <input type= "number" value={inputCharisma} onChange={charismaChange} min="1" max="20"/><br></br>

    {/* add the check boxes in later
    <input type="checkbox" value={boolStr} onChange={testing}/>*/}
  </div>

  {/*Button That begins the calculation */
  }
  <form>
    <button type="button" onClick= {(event) => shoot(inputStrength, inputDexterity, inputConstitution, inputIntelligence, inputWisdom, inputCharisma)}>
      Submit
    </button>
  </form>

  {/* Outputs results after the button is Clicked */}
  <div>
    {isVisible && <p>
    The range of scores is from 0-3.5. The Highest valued classes are the
    ones we recommend you build!
    <br />
    If you do not like the recommendation, try adjusting where you put stats or
    ignoring a class!
    <br />
    Happy Character Creation!
  </p>}
    {isVisible && results}
    <br></br>
    <img src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/DDmonstermanual_th_0.jpg" alt="D&D Image"/>
  </div>

  {/*
  <noscript>Sorry, your browser does not support Javascript!</noscript>
  {/*<a href="homepage.html"> Back to Home Page</a>*/}
</>

  )
}

export default App