import { useState } from 'react'
import { classNames } from "./utils/classes"
import { statNames } from "./utils/stats"
import { questionNames } from "./utils/questionnaire"
import './App.css'


function App() {
  const [statRecIsVisible, setStatRecVisible] = useState(false);
  const statRecVisibleChange = (val) =>{setStatRecVisible(val)};

  const [questionnaireIsVisible, setQuestionnaireVisible] = useState(false);
  const questionnaireVisibleChange = (val) =>{setQuestionnaireVisible(val)};

  const questionnaireChange = () =>{
    questionnaireVisibleChange(true)
    statRecVisibleChange(false)
  };

  const statRecChange = () =>{
    questionnaireVisibleChange(false)
    statRecVisibleChange(true)
  };

  let extraSpace = "     "
  return (
    <>    
  <h1 className="h1">D&D Class Recommendation Tool</h1>

  <div className='header'>
    <p>Built by Joseph Kihn using JavaScript, ReactJS, HTML, and CSS. It is hosted used AWS Amplify with all source code saved on GitHub. </p>
  {<a target='_blank' href='https://linkedin.com/in/josephkihn' rel="noopener noreferrer">My LinkedIn</a>}{extraSpace}
  {<a target='_blank' href='https://github.com/J03Y-Kihn' rel="noopener noreferrer">My GitHub</a>}
  </div>
  <br></br>
  <button type="button" onClick= {(event) => questionnaireChange()}>Questionnaire</button>
  <button type="button" onClick= {(event) => statRecChange()}>Stat Rec</button>
  {questionnaireIsVisible && <QuestionnaireTab/>}  
  {statRecIsVisible && <StatTab/>}
  <br></br>
  <div>{extraSpace}</div>
  
</>

  )
}


function StatTab(){
  //variable that will be true when there are results to output
  const [isVisible, setVisible] = useState(false);
  const visibleChange = (val) =>{setVisible(val)};

  //variable that displays and holds all character stat information (Strength, Dexterity, etc.)
  const [Stats, setStatsValue] = useState(statNames);
  
  const StatsChange = (event, name) => {
    const stat = event.target.value;
    setStatsValue( prevStats =>
      prevStats.map(Stats => 
        Stats.name === name ? {...Stats, stat} : Stats
      )
    );
  };

  //variable that displays and holds all information regarding classes that the user may want to ignore for the recommendation
  const [ignoreClasses, setIgnoreClassesValue] = useState(classNames);

  const ignoreClassesChange = (event, name) => {
    setIgnoreClassesValue( prevIgnoring =>
      prevIgnoring.map(ignoreClasses =>
        ignoreClasses.name === name ? {...ignoreClasses,  ignore: !ignoreClasses.ignore} : ignoreClasses
      )
    );
  };

  //Variables that will be used to display the output
  const [firstPlace, setFirstPlace] = useState('');
  const FirstPlaceChange = (e) => {setFirstPlace(e);};
  const [secondPlace, setSecondPlace] = useState('');
  const SecondPlaceChange = (e) => {setSecondPlace(e);};
  const [thirdPlace, setThirdPlace] = useState('');
  const ThirdPlaceChange = (e) => {setThirdPlace(e);};
  const [remainingPlaces, setRemainingPlaces] = useState('');
  const RemainingPlacesChange = (e) => {setRemainingPlaces(e);};

  const [firstPlaceisVisible, setFirstPlaceVisible] = useState(false);
  const firstVisibleChange = (val) =>{setFirstPlaceVisible(val)};
  const [secondPlaceisVisible, setSecondPlaceVisible] = useState(false);
  const secondVisibleChange = (val) =>{setSecondPlaceVisible(val)};
  const [thirdPlaceisVisible, setThirdVisible] = useState(false);
  const thirdVisibleChange = (val) =>{setThirdVisible(val)};
  const [remainingPlacesisVisible, setRemainingVisible] = useState(false);
  const remainingVisibleChange = (val) =>{setRemainingVisible(val)};

  //function that calculates which class would be best with the input stats without factoring in any ignored classes
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

      //format the output
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

      //send the changes for the output to their display variables
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
    //outputs are not valid
    else{
      output += "Make sure your stats are between 1-20!"
    }
    if(!isVisible)
      visibleChange(true)
  };
  return(
  <>
  <p>
    Input your six stats (between 0-20 for each) and choose any classes you do not
    want factored into the calculation.
  </p>
  <div> {/*List of statistics with input boxes to type numbers into (must be between 1-20) */}
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
    {/*List of checkboxes with class names for the program to optionally remove from the calculation */}
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
    <button type="button" onClick= {(event) => calculateClass(Stats, ignoreClasses)} className="stat-submit">  Submit  </button>
  </div>
  {/* Outputs results after the submit button is Clicked */}
  {<div>
      {isVisible && <p>
      The range of scores is from 0-3.5. The Highest valued classes are the
      ones we recommend you build.
      <br />
    </p>}
    <div className='Podium'>
      <div className='place first'>
        <h2>First Place</h2>
        {firstPlaceisVisible && firstPlace}
      </div>
      <div className='place second'>
        <h2>Second Place</h2>
        {secondPlaceisVisible && secondPlace}
      </div>
      
      <div className='place third'>
        <h2>Third Place</h2>
        {thirdPlaceisVisible && thirdPlace}
      </div>
      <div className='place remaining'>
        <h2>Remaining Results</h2>
        {remainingPlacesisVisible && remainingPlaces}
      </div>
      <br></br>
    </div>
  </div>}
  </>
  )
}

function QuestionnaireTab(){
  //variable that displays and holds all question information
  const [Questions, setQuestionsValue] = useState(questionNames);

  //variable that holds the information of which buttons were most recently clicked
  const [result, setResultValue] = useState([0,0,0])
  const logResult = (event, questionChoice, questionIndex) => {

    const nextResult = result.map((choice, i) => {
      if(i === questionIndex){
        return questionChoice;
      }
      else{
        return choice;
      }
    });
    setResultValue(nextResult)
  };

  //variable that determines if the output should be visible
  const [outputIsVisible, setOutputIsVisible] = useState(false);
  const outputIsVisibleChange = (val) =>{setOutputIsVisible(val)};

  //variable that holds the output string
  const [outputResults, setOutputResults] = useState('');
  const OutputResultsChange = (e) => {setOutputResults(e);};


  //determine which class would be best based off the answers to the questions (data in the result variable)
  const calculateClass = () => {

    //Calculate the class
    if(!checkBestFit()){
      if(!checkAltFit()){
        let errorOutput = `Make sure you clicked on an answer for each question!`
        OutputResultsChange(errorOutput)
        outputIsVisibleChange(true)
      }
    }
    console.log(outputResults)
  };

  //check the best fit values first (the results that you would expect for the class)
  const checkBestFit = () => {
    let bestfit = []
    let tempOutput = ``

    //loop through the list of classes to find any matches
    for(let counter =0; counter < classNames.length; counter++){
      if(classNames[counter].bestfit[0] == result[0] && classNames[counter].bestfit[1] == result[1] && classNames[counter].bestfit[2] == result[2]){
        bestfit.push(classNames[counter].name)
      }
    }

    //if multiple classes fit the archetype, randomly choose one to output, otherwise output the singular match
    if(bestfit.length != 0){
      let outputClass = 0
      if(bestfit.length > 1){
        outputClass = Math.floor(Math.random() * (bestfit.length))
      }
      tempOutput += `${bestfit[outputClass]} is the best class for you!`
      OutputResultsChange(tempOutput)
      outputIsVisibleChange(true)
      return true
    }
    return false
  };

  //check the class alternatives (the results that can work for some of the classes)
  const checkAltFit = () => {
    let altfit = []
    let tempOutput = ``

    //loop through the list of classes to find any matches
    for(let counter =0; counter < classNames.length; counter++){
      
      if(classNames[counter].name != "Barbarian" && classNames[counter].name != "Fighter"){
        for(let subcounter =0; subcounter < classNames[counter].altfit.length; subcounter++){
          if(classNames[counter].altfit[subcounter][0] == result[0] && classNames[counter].altfit[subcounter][1] == result[1] && classNames[counter].altfit[subcounter][2] == result[2]){
            altfit.push(classNames[counter].name)
          }
        }
      }
    }
    
    //if multiple classes fit the archetype, randomly choose one to output, otherwise output the singular match
    if(altfit.length > 0){
      let outputClass = 0
      if(altfit.length > 1){
        outputClass = Math.floor(Math.random() * (altfit.length)) 
      }
      tempOutput += `${altfit[outputClass]} is a good class for you!`
      OutputResultsChange(tempOutput)
      outputIsVisibleChange(true)
      return true
    }
    return false
  };

  let extraSpace = "     "
  return(
  <>
    <p>Please press one button for each of the three questions to determine which class is the best for you!</p>

    {
    <div> {/*List of questions with buttons to answer the question */}
    <ul className= "stats-list">
      {Questions.map(({question, answers, qIndex}, index) =>{
        return (
          <li key={index}>
            <div>
            {question}
            <br></br>
            {answers[0] && <button type="button" onClick= {(event) => logResult(event, 1, qIndex)}> {answers[0]}</button>} {extraSpace}
            {answers[1] && <button type="button" onClick= {(event) => logResult(event, 2, qIndex)}> {answers[1]}</button>} {extraSpace}
            {answers[2] && <button type="button" onClick= {(event) => logResult(event, 3, qIndex)}> {answers[2]}</button>}
            </div>
          </li>
        );
      })}
    </ul>
    <button type="button" onClick= {(event) => calculateClass()}> Submit</button>
    </div>
    }
    {/* Outputs results after the submit button is Clicked */}
    {
      <div>
        {outputIsVisible && outputResults}
      </div>
    }

  </>
  )
}
export default App