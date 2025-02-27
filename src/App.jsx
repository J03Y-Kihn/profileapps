import { useState } from 'react'
import { classNames } from "./utils/classes"
import { statNames } from "./utils/stats"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  //eventually turn this into an array of the stats rather than 6 copies of the same variables and functions
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

  const [Stats, setStatsValue] = useState(statNames);
  
  const StatsChange = (event, name) => {
    const stat = event.target.value;
    setStatsValue( prevStats =>
      prevStats.map(Stats => 
        Stats.name === name ? {...Stats, stat} : Stats
      )
    );
  };

  const [ignoreClasses, setIgnoreClassesValue] = useState(classNames);

  const ignoreClassesChange = (event, name) => {
    setIgnoreClassesValue( prevIgnoring =>
      prevIgnoring.map(ignoreClasses =>
        ignoreClasses.name === name ? {...ignoreClasses,  ignore: !ignoreClasses.ignore} : ignoreClasses
      )
    );
  };

  let numbs = 0;

  const numbCheck = (stat) => {
    if(stat > 0 && stat <=20 ){
      return true
    }
    else{
      return false
    }
  };

  const calculateClass = (currentStats, currentIgnoredClasses) => {
    let output = ""
    let valid = true

    //make sure all stats are valid
    for (let classIndex =0; classIndex< currentStats.length; classIndex++){
      if(parseInt(currentStats[classIndex].stat) > 20 || parseInt(currentStats[classIndex].stat) < 1){
        output += `${currentStats[classIndex].name} is invalid!!! \n`
        valid = false
      }
    }

    if(valid){
      //initialize array to hold values
      var outputRecommendation = []

      //loop through all classes to see which are being ignored, if any
      for (let classIndex =0; classIndex< currentIgnoredClasses.length; classIndex++){
        //if the class is not ignored determine it's value
        if(!currentIgnoredClasses[classIndex].ignore){
          let stat1 = 0
          let stat2 = 0
          for(let statIndex =0; statIndex< currentStats.length; statIndex++){
            if(currentIgnoredClasses[classIndex].stat1 === currentStats[statIndex].name){
              stat1 = currentStats[statIndex].stat
            }
            else if(currentIgnoredClasses[classIndex].stat2 === currentStats[statIndex].name){
              stat2 = currentStats[statIndex].stat
            }
          }

          //do the calculation here and then store the (value, class_name) pairing
          stat1 = stat1/10*2
          stat2 = stat2/10*1.5

          outputRecommendation.push( [(stat1+stat2)/2, currentIgnoredClasses[classIndex].name] )
        }
      }

      //sort the classes
      outputRecommendation.sort(function(a,b){return b[0] - a[0]})

      for(let i=0; i<outputRecommendation.length; i++){
        output += `${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
      }
      
      //show the output
      console.log(outputRecommendation)
    }
    else{
      output += "Make sure your stats are between 1-20!"
    }
    if(!isVisible)
      visibleChange(true)
    resultsChange(output)
  };



  return (
    <>    
  <title>Class Recommendation Tool</title>
  <h1 className="h1">D&D Class Recommendation Tool!!</h1>
  <p>
    All you have to do is input your six stats and choose any classes you do not
    want factored into the calculation. Then watch the magic unfold!
  </p>
  <br />
  <br />
  <div>
    <ul className= "stats-list">
      {Stats.map(({name, stat}, index) =>{
        return (
          <li key={index}>
            <div>
            {name}
            <input type="number" value={Stats[index].stat} onChange={(event) => StatsChange(event, Stats[index].name)} min="1" max="20"/>
            </div>
          </li>
        );
      })}
    </ul>
    <ul className= "ignore-list">
      {ignoreClasses.map(({name, ignore}, index) =>{
        return (
          <li key={index}>
            <input type="checkbox" checked={ignoreClasses[index].ignore} onChange={(event) => ignoreClassesChange(event, ignoreClasses[index].name)}/>
            {name}
          </li>
        );
      })}
      <button type="button" onClick= {(event) => calculateClass(Stats, ignoreClasses)}>
      Submit
      </button>
    </ul>
    
  </div>

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
</>

  )
}

export default App