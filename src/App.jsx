import { useState } from 'react'
import { classNames } from "./utils/classes"
import { statNames } from "./utils/stats"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [isVisible, setVisible] = useState(false);
  const visibleChange = (val) =>{setVisible(val)};

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

  const [firstPlace, setFirstPlace] = useState('');
  const FirstPlaceChange = (e) => {setFirstPlace(e);};
  const [secondPlace, setSecondPlace] = useState('');
  const SecondPlaceChange = (e) => {setSecondPlace(e);};
  const [thirdPlace, setThirdPlace] = useState('');
  const ThirdPlaceChange = (e) => {setThirdPlace(e);};
  const [remainingPlaces, setRemainingPlaces] = useState('');
  const RemainingPlacesChange = (e) => {setRemainingPlaces(e);};

  const [secondPlaceisVisible, setSecondPlaceVisible] = useState(false);
  const secondVisibleChange = (val) =>{setSecondPlaceVisible(val)};
  const [firstPlaceisVisible, setFirstPlaceVisible] = useState(false);
  const firstVisibleChange = (val) =>{setFirstPlaceVisible(val)};
  const [thirdPlaceisVisible, setThirdVisible] = useState(false);
  const thirdVisibleChange = (val) =>{setThirdVisible(val)};
  const [remainingPlacesisVisible, setRemainingVisible] = useState(false);
  const remainingVisibleChange = (val) =>{setRemainingVisible(val)};

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

          let tempResult = (stat1+stat2)/2
          outputRecommendation.push( [parseFloat(tempResult.toFixed(3)), currentIgnoredClasses[classIndex].name] )
        }
      }

      //sort the classes
      outputRecommendation.sort(function(a,b){return b[0] - a[0]})

      for(let i=0; i<outputRecommendation.length; i++){
        output += `${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
      }


      let first = 0;
      let second = 0;
      let third = 0;
      let firstOutput, secondOutput, thirdOutput, remainingOutput = "";
      let numbTied = 0;
      for(let i=0; i<outputRecommendation.length; i++){
        if(first === 0){
          firstOutput = `${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
          first = outputRecommendation[i][0]
        }
        else if(first === outputRecommendation[i][0]){
          firstOutput += ` tied with ${outputRecommendation[i][1]}`
          numbTied += 1;
        }
        else if (second === 0 && numbTied === 0){
          secondOutput = `${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
          second = outputRecommendation[i][0]
        }
        else if(second === outputRecommendation[i][0]){
          secondOutput += ` tied with ${outputRecommendation[i][1]}`
          numbTied += 1;
        }
        else if(third === 0 && numbTied < 2){
          thirdOutput = `${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
          third = outputRecommendation[i][0]
        }
        else if(third === outputRecommendation[i][0]){
          thirdOutput += ` tied with ${outputRecommendation[i][1]}`
          numbTied += 1;
        }
        else{
          let currValue = outputRecommendation[i][0];
          let position = i+1;
          do{
          remainingOutput += `${position}th place: ${outputRecommendation[i][1]} with a score of ${outputRecommendation[i][0]} \n`
          i++;
          }while(i < outputRecommendation.length && currValue == outputRecommendation[i][0])
          i--;
        }
      }

      
      FirstPlaceChange(firstOutput)
      SecondPlaceChange(secondOutput)
      ThirdPlaceChange(thirdOutput)
      RemainingPlacesChange(remainingOutput)
      
      secondVisibleChange(secondOutput === "" ? false: true)
      firstVisibleChange(firstOutput === "" ? false: true)
      thirdVisibleChange(thirdOutput === "" ? false: true)
      remainingVisibleChange(remainingOutput === "" ? false: true)

      //show the output
      console.log(outputRecommendation)
    }
    else{
      output += "Make sure your stats are between 1-20!"
    }
    if(!isVisible)
      visibleChange(true)
    console.log(output)
  };



  return (
    <>    
  <title>Class Recommendation Tool</title>
  <h1 className="h1">D&D Class Recommendation Tool</h1>
  <p>
    Input your six stats and choose any classes you do not
    want factored into the calculation. Then watch the magic unfold!
  </p>
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
            {name + "   "}
            <img src= {`./${ignoreClasses[index].name}.jpeg`} width={25} height={25}/>
          </li>
        );
      })}
    </ul>
    <button type="button" onClick= {(event) => calculateClass(Stats, ignoreClasses)}>
      Submit
      </button>
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
  <div className='Podium'>
    <div className='place second'>
      <h2>Second Place</h2>
      {secondPlaceisVisible && secondPlace}
    </div>
    <div className='place first'>
      <h2>First Place</h2>
      {firstPlaceisVisible && firstPlace}
    </div>
    <div className='place third'>
      <h2>Third Place</h2>
      {thirdPlaceisVisible && thirdPlace}
    </div>
    <br></br>
  </div>
  <br></br><br></br>
  <div className='remaining'>
      <h2>Remaining Results</h2>
      {remainingPlacesisVisible && remainingPlaces}
  </div>
    <br></br>
    {/*<img src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/DDmonstermanual_th_0.jpg" alt="D&D Image"/>*/}
  </div>
</>

  )
}

export default App